import { ApolloError } from "apollo-server-micro";
import { InviteResolvers } from "../../generated/types";

const InviteResolver: InviteResolvers = {
  events: async (invite, _, { prisma }) => {
    return await prisma.event.findMany({ where: { inviteId: invite.id } });
  },
  user: async (invite, _, { prisma }) => {
    return await prisma.user.findUnique({ where: { id: invite.userId } });
  },
};

export default InviteResolver;
