import { ApolloError } from "apollo-server-micro";
import { MutationResolvers } from "../../generated/types";

const DeleteInviteMutation: MutationResolvers["deleteInvite"] = async (_, { input }, { prisma }) => {
  const invite = await prisma.invite.delete({ where: { id: input.id } }).catch((_) => {
    throw new ApolloError("Invite doesn't exist.");
  });

  return await prisma.user.findUnique({ where: { id: invite.userId } });
};

export default DeleteInviteMutation;
