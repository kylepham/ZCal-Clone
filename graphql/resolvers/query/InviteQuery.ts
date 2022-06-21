import { ApolloError } from "apollo-server-micro";
import { QueryResolvers } from "../../generated/types";

const InviteQuery: QueryResolvers["invite"] = async (_, { input }, { prisma }) => {
  const invite = await prisma.invite.findUnique({ where: { id: input.id } }).catch((_) => {
    throw new ApolloError("Invite doesn't exist.");
  });

  return invite;
};

export default InviteQuery;
