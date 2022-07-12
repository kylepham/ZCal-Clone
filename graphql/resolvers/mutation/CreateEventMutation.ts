import { ApolloError } from "apollo-server-micro";
import { MutationResolvers } from "../../generated/types";
import { google } from "googleapis";
import moment from "moment-timezone";

const scheduleGoogleCalendarEvent = async (
  refreshToken: string,
  inviterName: string,
  inviteeName: string,
  inviteeEmail: string,
  inviteDescription: string,
  startDateTime: string,
  endDateTime: string
) => {
  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  try {
    auth.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar("v3");
    await calendar.events.insert({
      auth,
      calendarId: "primary",
      requestBody: {
        summary: `${inviteeName} and ${inviterName}`,
        description: `${inviteDescription}\n\nPowered by zcal.vercel.app`,
        start: {
          dateTime: startDateTime,
        },
        end: {
          dateTime: endDateTime,
        },
        attendees: [
          {
            email: inviteeEmail,
          },
        ],
      },
    });
  } catch (e) {
    throw new ApolloError("Cannot add the event to Google Calendar at the moment.");
  }
};

const CreateEventMutation: MutationResolvers["createEvent"] = async (_, { input }, { prisma }) => {
  const {
    user: { name, email },
    description,
    duration,
  } = (await prisma.invite
    .findUnique({
      where: { id: input.inviteId },
      select: { user: { select: { name: true, email: true } }, description: true, duration: true },
    })
    .catch((_) => {
      throw new ApolloError("Invite doesn't exist.");
    })) || { user: {} };

  const { refreshToken } =
    (await prisma.refreshToken.findUnique({
      where: {
        email: email,
      },
      select: {
        refreshToken: true,
      },
    })) || {};

  await scheduleGoogleCalendarEvent(
    refreshToken!,
    name!,
    input.inviteeName,
    input.inviteeEmail,
    description!,
    moment(input.startDate).utc().format(),
    moment(input.startDate).add(duration, "minutes").utc().format()
  );

  const event = await prisma.event
    .create({
      data: {
        inviteId: input.inviteId,
        inviteeEmail: input.inviteeEmail,
        inviteeName: input.inviteeName,
        startDate: input.startDate,
      },
    })
    .catch((_) => {
      throw new ApolloError("Cannot create this event. Please check one or more fields and try again.");
    });

  return event;
};

export default CreateEventMutation;
