import { ApolloError } from "apollo-server-micro";
import { MutationResolvers } from "../../generated/types";

const DeleteEventMutation: MutationResolvers["deleteEvent"] = async (_, { input }, { prisma }) => {
  const event = await prisma.event.delete({ where: { id: input.id } }).catch((_) => {
    throw new ApolloError("Invite doesn't exist.");
  });

  return event;
};

export default DeleteEventMutation;
