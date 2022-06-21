import { ApolloError } from "apollo-server-micro";
import { MutationResolvers } from "../../generated/types";

const CreateEventMutation: MutationResolvers["createEvent"] = async (_, { input }, { prisma }) => {
  await prisma.invite.findUnique({ where: { id: input.inviteId } }).catch((_) => {
    throw new ApolloError("Invite doesn't exist.");
  });

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
