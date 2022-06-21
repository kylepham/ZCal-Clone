import { UserResolvers } from "../../generated/types";

const UserResolver: UserResolvers = {
  invites: async (user, _, { prisma }) => {
    return prisma.invite.findMany({ where: { userId: user.id } });
  },
};

export default UserResolver;
