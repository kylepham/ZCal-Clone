import { ApolloError } from "apollo-server-micro";
import { MutationResolvers } from "../../generated/types";

const CreateInviteMutation: MutationResolvers["createInvite"] = async (_, { input }, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { id: input.userId } }).catch((_) => {
    throw new ApolloError("User doesn't exist.");
  });

  await prisma.invite
    .create({
      data: {
        userId: input.userId,
        location: input.location,
        displayedTimezone: input.displayedTimezone,
        timezone: input.timezone,
        name: input.name,
        description: input.description,
        duration: input.duration,
        slotIncrement: input.slotIncrement,
        minimumNotice: input.minimumNotice,
        dateRange: input.dateRange,
        intervals: input.intervals,
      },
    })
    .catch((_) => {
      throw new ApolloError("Cannot create this invite. Please check one or more fields and try again.");
    });

  return user;
};

export default CreateInviteMutation;
