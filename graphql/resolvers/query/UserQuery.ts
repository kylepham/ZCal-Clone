import { QueryResolvers } from "../../generated/types";

const UserQuery: QueryResolvers["user"] = async (_, { input }, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user)
    return await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });

  return user;
};

export default UserQuery;
