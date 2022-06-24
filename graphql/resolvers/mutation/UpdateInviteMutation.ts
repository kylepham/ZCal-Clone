import { ApolloError } from "apollo-server-micro";
import { MutationResolvers } from "../../generated/types";

const UpdateInviteMutation: MutationResolvers["updateInvite"] = async (_, { input }, { prisma }) => {
  const { userId } = await prisma.invite
    .update({
      where: {
        id: input.id,
      },
      data: {
        location: input.location || undefined,
        displayedTimezone: input.displayedTimezone || undefined,
        timezone: input.timezone || undefined,
        name: input.name || undefined,
        description: input.description,
        duration: input.duration || undefined,
        slotIncrement: input.slotIncrement || undefined,
        minimumNotice: input.minimumNotice,
        dateRange: input.dateRange || undefined,
        intervals: input.intervals || undefined,
      },
      select: {
        userId: true,
      },
    })
    .catch((_) => {
      throw new ApolloError("Cannot update this invite. Please check one or more fields and try again.");
    });

  return await prisma.user.findUnique({ where: { id: userId } });
};

export default UpdateInviteMutation;
