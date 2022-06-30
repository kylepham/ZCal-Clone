import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { request } from "graphql-request";
import { Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment-timezone";
import { BsCalendarEvent } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineTimelapse } from "react-icons/md";
import { GetInviteQuery, InviteFragment, useCreateEventMutation } from "../../graphql/generated/types";

const protocol = `${process.env.NODE_ENV === "development" ? "http" : "https"}://`;

const host =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    : // Use host on the client since using VERCEL_URL can lead to CORS errors due to aliases
      window.location.host;

const origin = `${protocol}${host}`;

interface InvitePageProps {
  invite: GetInviteQuery["invite"];
}

const InvitePage = ({ invite }: InvitePageProps) => {
  const [createEvent, { loading: isCreatingEvent }] = useCreateEventMutation();

  const [datePickerValue, setDatePickerValue] = useState<moment.Moment | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<moment.Moment | null>(null);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({ name: "", email: "" });
  const [isDone, setIsDone] = useState(false);

  const dateTimeSelections: moment.Moment[] = useMemo(() => {
    if (!!!invite) return [];

    const result: moment.Moment[] = [];
    const now = moment();

    invite.intervals.map((interval: { at: string; duration: number }) => {
      const currentDateTime = moment.tz(interval.at, invite.timezone);
      for (let i = 0; i < Math.floor(interval.duration / invite.duration); i++) {
        const newDateTime = currentDateTime.clone().add(invite.duration * i, "minutes");
        if (now.diff(newDateTime) < 0) result.push(newDateTime);
      }
    });

    return result;
  }, [invite]);

  const shouldDisableDate = useCallback(
    (date: moment.Moment) => {
      return !dateTimeSelections.map((dateTime) => dateTime.format("YYYY-MM-DD")).includes(date.format("YYYY-MM-DD"));
    },
    [dateTimeSelections]
  );

  const timeSelections: moment.Moment[] = useMemo(() => {
    if (!!!datePickerValue) return [];
    const result: moment.Moment[] = dateTimeSelections.filter(
      (dateTime) => dateTime.format("YYYY-MM-DD") === datePickerValue.format("YYYY-MM-DD")
    );

    return result;
  }, [datePickerValue, dateTimeSelections]);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    },
    [userInfo]
  );

  if (!!!invite || Object.keys(invite).length === 0) return <p>Invite doesn&apos;t exist</p>;

  if (isDone) return <p>Event has been created 💅</p>;

  return (
    <div className="m-auto flex flex-col items-center justify-center px-8 pb-8 lg:flex-row lg:items-start">
      <Head>
        <title>{invite.name} - ZCal Clone</title>
      </Head>

      <div className="flex flex-col items-center space-y-4 lg:items-start">
        <Typography className="text-lg font-bold">{invite.name}</Typography>
        <Typography className="text-sm text-gray-400">by {invite.user!.name}</Typography>
      </div>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StaticDatePicker
          onChange={(newValue) => setDatePickerValue(newValue)}
          value={datePickerValue}
          renderInput={(params) => {
            return <TextField {...params} className="w-20" />;
          }}
          displayStaticWrapperAs="desktop"
          views={["day"]}
          shouldDisableDate={shouldDisableDate}
          reduceAnimations
        />
      </LocalizationProvider>

      {timeSelections.length > 0 && (
        <div className="scrollbar h-auto w-full max-w-sm space-y-4 overflow-auto rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <IconButton onClick={() => setSelectedDateTime(null)}>
              <IoMdArrowBack size={20} />
            </IconButton>

            <Typography>{!selectedDateTime ? "Select a time" : "Your information"}</Typography>
          </div>

          {selectedDateTime && (
            <div>
              <div className="flex items-center space-x-4">
                <BsCalendarEvent className="fill-green-400" size={15} />

                <Typography className="font-bold text-green-400">
                  {selectedDateTime.format("ddd, MMM DD - h:mm a z")}
                </Typography>
              </div>

              <div className="flex items-center space-x-4">
                <MdOutlineTimelapse className="fill-green-400" size={15} />

                <Typography className="text-green-400">{invite.duration} min</Typography>
              </div>
            </div>
          )}

          {!selectedDateTime ? (
            <div className="scrollbar grid grid-cols-1 gap-4 overflow-auto lg:max-h-80">
              {timeSelections.map((time) => (
                <Button
                  key={time.format()}
                  variant="outlined"
                  className="p-4"
                  onClick={() => setSelectedDateTime(time)}
                >
                  {time.format("h:mm a")}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Typography>Full Name *</Typography>

                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={userInfo.name}
                  onChange={handleTextFieldChange}
                  autoComplete="off"
                  variant="outlined"
                  name="name"
                  placeholder="John Smith"
                  className="w-full"
                />
              </div>

              <div>
                <Typography>Email *</Typography>

                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={userInfo.email}
                  onChange={handleTextFieldChange}
                  autoComplete="off"
                  variant="outlined"
                  name="email"
                  placeholder="johnsmith@gmail.com"
                  className="w-full"
                />
              </div>

              <Button
                disabled={isCreatingEvent || userInfo.name.length === 0 || userInfo.email.length === 0}
                onClick={async () => {
                  await createEvent({
                    variables: {
                      input: {
                        inviteId: invite?.id!,
                        inviteeName: userInfo.name,
                        inviteeEmail: userInfo.email,
                        startDate: selectedDateTime.clone().utc().format(),
                      },
                    },
                  }).then(() => setIsDone(true));
                }}
                variant="contained"
                className="bg-gray-800 hover:bg-gray-700"
              >
                Schedule Meeting
                {isCreatingEvent && <CircularProgress size={20} className="mx-2" />}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<InvitePageProps> = async (context) => {
  const { invite } = await request(
    `${origin}/api/graphql`,
    `
      query GetInvite($input: InviteQueryInput!) {
        invite(input: $input) {
          id
          name
          description
          location
          timezone
          displayedTimezone
          duration
          dateRange
        intervals
          slotIncrement
          minimumNotice
          user {
            name
            email
          }
          events {
            id
            inviteeName
            inviteeEmail
            startDate
          }
        }
      }
    `,
    { input: { id: context.query.id } }
  );

  return {
    props: {
      invite,
    },
  };
};

export default InvitePage;
