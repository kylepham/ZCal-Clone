import { Resolvers } from "../generated/types";
import IntervalsScalar from "./scalar/IntervalsScalar";
import UserQuery from "./query/UserQuery";
import InviteQuery from "./query/InviteQuery";
import CreateInviteMutation from "./mutation/CreateInviteMutation";
import UpdateInviteMutation from "./mutation/UpdateInviteMutation";
import DeleteInviteMutation from "./mutation/DeleteInviteMutation";
import CreateEventMutation from "./mutation/CreateEventMutation";
import DeleteEventMutation from "./mutation/DeleteEventMutation";
import UserResolver from "./model/UserResolver";
import InviteResolver from "./model/InviteResolver";

const resolvers: Resolvers = {
  IntervalsScalar: IntervalsScalar,
  Query: {
    user: UserQuery,
    invite: InviteQuery,
  },
  Mutation: {
    createInvite: CreateInviteMutation,
    updateInvite: UpdateInviteMutation,
    deleteInvite: DeleteInviteMutation,
    createEvent: CreateEventMutation,
    deleteEvent: DeleteEventMutation,
  },
  User: UserResolver,
  Invite: InviteResolver,
};

export default resolvers;
