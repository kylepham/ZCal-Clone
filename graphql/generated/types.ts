import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Invite as InviteModel, Event as EventModel } from '@prisma/client';
import { GraphQLContext } from '../../pages/api/graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  IntervalsScalar: any;
};

export type CreateEventInput = {
  inviteId: Scalars['String'];
  inviteeEmail: Scalars['String'];
  inviteeName: Scalars['String'];
  startDate: Scalars['String'];
};

export type CreateInviteInput = {
  dateRange: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  displayedTimezone: DisplayedTimezone;
  duration: Scalars['Int'];
  intervals: Scalars['IntervalsScalar'];
  location: Location;
  minimumNotice?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  slotIncrement?: InputMaybe<Scalars['Int']>;
  timezone: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteEventInput = {
  id: Scalars['ID'];
};

export type DeleteInviteInput = {
  id: Scalars['ID'];
};

export enum DisplayedTimezone {
  Local = 'LOCAL',
  Locked = 'LOCKED'
}

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  inviteeEmail: Scalars['String'];
  inviteeName: Scalars['String'];
  startDate: Scalars['String'];
};

export type EventQueryInput = {
  id: Scalars['ID'];
};

export type Invite = {
  __typename?: 'Invite';
  dateRange: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  displayedTimezone: DisplayedTimezone;
  duration: Scalars['Int'];
  events: Array<Event>;
  id: Scalars['ID'];
  intervals: Scalars['IntervalsScalar'];
  location: Location;
  minimumNotice?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  slotIncrement?: Maybe<Scalars['Int']>;
  timezone: Scalars['String'];
  user?: Maybe<User>;
};

export type InviteQueryInput = {
  id: Scalars['ID'];
};

export enum Location {
  GoogleMeet = 'GOOGLE_MEET'
}

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
  createInvite?: Maybe<User>;
  deleteEvent?: Maybe<Event>;
  deleteInvite?: Maybe<User>;
  updateInvite?: Maybe<User>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


export type MutationDeleteInviteArgs = {
  input: DeleteInviteInput;
};


export type MutationUpdateInviteArgs = {
  input: UpdateInviteInput;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  invite?: Maybe<Invite>;
  user?: Maybe<User>;
};


export type QueryEventArgs = {
  input: EventQueryInput;
};


export type QueryInviteArgs = {
  input: InviteQueryInput;
};


export type QueryUserArgs = {
  input: UserQueryInput;
};

export type UpdateInviteInput = {
  dateRange?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  displayedTimezone?: InputMaybe<DisplayedTimezone>;
  duration?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  intervals?: InputMaybe<Scalars['IntervalsScalar']>;
  location?: InputMaybe<Location>;
  minimumNotice?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slotIncrement?: InputMaybe<Scalars['Int']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  invites: Array<Invite>;
  name: Scalars['String'];
};

export type UserQueryInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string } | null };

export type CreateInviteMutationVariables = Exact<{
  input: CreateInviteInput;
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite?: { __typename?: 'User', invites: Array<{ __typename?: 'Invite', id: string, name: string, description?: string | null, location: Location, timezone: string, displayedTimezone: DisplayedTimezone, duration: number, dateRange: number, intervals: any, slotIncrement?: number | null, minimumNotice?: number | null, events: Array<{ __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string }> }> } | null };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string } | null };

export type DeleteInviteMutationVariables = Exact<{
  input: DeleteInviteInput;
}>;


export type DeleteInviteMutation = { __typename?: 'Mutation', deleteInvite?: { __typename?: 'User', invites: Array<{ __typename?: 'Invite', id: string, name: string, description?: string | null, location: Location, timezone: string, displayedTimezone: DisplayedTimezone, duration: number, dateRange: number, intervals: any, slotIncrement?: number | null, minimumNotice?: number | null, events: Array<{ __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string }> }> } | null };

export type GetInviteQueryVariables = Exact<{
  input: InviteQueryInput;
}>;


export type GetInviteQuery = { __typename?: 'Query', invite?: { __typename?: 'Invite', id: string, name: string, description?: string | null, location: Location, timezone: string, displayedTimezone: DisplayedTimezone, duration: number, dateRange: number, intervals: any, slotIncrement?: number | null, minimumNotice?: number | null, user?: { __typename?: 'User', name: string, email: string } | null, events: Array<{ __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string }> } | null };

export type GetUserQueryVariables = Exact<{
  input: UserQueryInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, invites: Array<{ __typename?: 'Invite', id: string, name: string, description?: string | null, location: Location, timezone: string, displayedTimezone: DisplayedTimezone, duration: number, dateRange: number, intervals: any, slotIncrement?: number | null, minimumNotice?: number | null, events: Array<{ __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string }> }> } | null };

export type UpdateInviteMutationVariables = Exact<{
  input: UpdateInviteInput;
}>;


export type UpdateInviteMutation = { __typename?: 'Mutation', updateInvite?: { __typename?: 'User', invites: Array<{ __typename?: 'Invite', id: string, name: string, description?: string | null, location: Location, timezone: string, displayedTimezone: DisplayedTimezone, duration: number, dateRange: number, intervals: any, slotIncrement?: number | null, minimumNotice?: number | null, events: Array<{ __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string }> }> } | null };

export type EventFragment = { __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string };

export type InviteFragment = { __typename?: 'Invite', id: string, name: string, description?: string | null, location: Location, timezone: string, displayedTimezone: DisplayedTimezone, duration: number, dateRange: number, intervals: any, slotIncrement?: number | null, minimumNotice?: number | null, events: Array<{ __typename?: 'Event', id: string, inviteeName: string, inviteeEmail: string, startDate: string }> };

export type UserFragment = { __typename?: 'User', id: string, name: string, email: string };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateEventInput: CreateEventInput;
  CreateInviteInput: CreateInviteInput;
  DeleteEventInput: DeleteEventInput;
  DeleteInviteInput: DeleteInviteInput;
  DisplayedTimezone: DisplayedTimezone;
  Event: ResolverTypeWrapper<EventModel>;
  EventQueryInput: EventQueryInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalsScalar: ResolverTypeWrapper<Scalars['IntervalsScalar']>;
  Invite: ResolverTypeWrapper<InviteModel>;
  InviteQueryInput: InviteQueryInput;
  Location: Location;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateInviteInput: UpdateInviteInput;
  User: ResolverTypeWrapper<UserModel>;
  UserQueryInput: UserQueryInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateEventInput: CreateEventInput;
  CreateInviteInput: CreateInviteInput;
  DeleteEventInput: DeleteEventInput;
  DeleteInviteInput: DeleteInviteInput;
  Event: EventModel;
  EventQueryInput: EventQueryInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntervalsScalar: Scalars['IntervalsScalar'];
  Invite: InviteModel;
  InviteQueryInput: InviteQueryInput;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  UpdateInviteInput: UpdateInviteInput;
  User: UserModel;
  UserQueryInput: UserQueryInput;
};

export type EventResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inviteeEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inviteeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IntervalsScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IntervalsScalar'], any> {
  name: 'IntervalsScalar';
}

export type InviteResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Invite'] = ResolversParentTypes['Invite']> = {
  dateRange?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayedTimezone?: Resolver<ResolversTypes['DisplayedTimezone'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  intervals?: Resolver<ResolversTypes['IntervalsScalar'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  minimumNotice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slotIncrement?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createInvite?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateInviteArgs, 'input'>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'input'>>;
  deleteInvite?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteInviteArgs, 'input'>>;
  updateInvite?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateInviteArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'input'>>;
  invite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<QueryInviteArgs, 'input'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invites?: Resolver<Array<ResolversTypes['Invite']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Event?: EventResolvers<ContextType>;
  IntervalsScalar?: GraphQLScalarType;
  Invite?: InviteResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export const EventFragmentDoc = gql`
    fragment Event on Event {
  id
  inviteeName
  inviteeEmail
  startDate
}
    `;
export const InviteFragmentDoc = gql`
    fragment Invite on Invite {
  id
  name
  description
  location
  timezone
  displayedTimezone
  duration
  dateRange
  intervals
  slotIncrement
  minimumNotice
  events {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
}
    `;
export const CreateEventDocument = gql`
    mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($input: CreateInviteInput!) {
  createInvite(input: $input) {
    invites {
      ...Invite
    }
  }
}
    ${InviteFragmentDoc}`;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const DeleteInviteDocument = gql`
    mutation DeleteInvite($input: DeleteInviteInput!) {
  deleteInvite(input: $input) {
    invites {
      ...Invite
    }
  }
}
    ${InviteFragmentDoc}`;
export type DeleteInviteMutationFn = Apollo.MutationFunction<DeleteInviteMutation, DeleteInviteMutationVariables>;

/**
 * __useDeleteInviteMutation__
 *
 * To run a mutation, you first call `useDeleteInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInviteMutation, { data, loading, error }] = useDeleteInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteInviteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInviteMutation, DeleteInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInviteMutation, DeleteInviteMutationVariables>(DeleteInviteDocument, options);
      }
export type DeleteInviteMutationHookResult = ReturnType<typeof useDeleteInviteMutation>;
export type DeleteInviteMutationResult = Apollo.MutationResult<DeleteInviteMutation>;
export type DeleteInviteMutationOptions = Apollo.BaseMutationOptions<DeleteInviteMutation, DeleteInviteMutationVariables>;
export const GetInviteDocument = gql`
    query GetInvite($input: InviteQueryInput!) {
  invite(input: $input) {
    ...Invite
    user {
      name
      email
    }
  }
}
    ${InviteFragmentDoc}`;

/**
 * __useGetInviteQuery__
 *
 * To run a query within a React component, call `useGetInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInviteQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetInviteQuery(baseOptions: Apollo.QueryHookOptions<GetInviteQuery, GetInviteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
      }
export function useGetInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
        }
export type GetInviteQueryHookResult = ReturnType<typeof useGetInviteQuery>;
export type GetInviteLazyQueryHookResult = ReturnType<typeof useGetInviteLazyQuery>;
export type GetInviteQueryResult = Apollo.QueryResult<GetInviteQuery, GetInviteQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($input: UserQueryInput!) {
  user(input: $input) {
    ...User
    invites {
      ...Invite
    }
  }
}
    ${UserFragmentDoc}
${InviteFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateInviteDocument = gql`
    mutation UpdateInvite($input: UpdateInviteInput!) {
  updateInvite(input: $input) {
    invites {
      ...Invite
    }
  }
}
    ${InviteFragmentDoc}`;
export type UpdateInviteMutationFn = Apollo.MutationFunction<UpdateInviteMutation, UpdateInviteMutationVariables>;

/**
 * __useUpdateInviteMutation__
 *
 * To run a mutation, you first call `useUpdateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInviteMutation, { data, loading, error }] = useUpdateInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInviteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInviteMutation, UpdateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInviteMutation, UpdateInviteMutationVariables>(UpdateInviteDocument, options);
      }
export type UpdateInviteMutationHookResult = ReturnType<typeof useUpdateInviteMutation>;
export type UpdateInviteMutationResult = Apollo.MutationResult<UpdateInviteMutation>;
export type UpdateInviteMutationOptions = Apollo.BaseMutationOptions<UpdateInviteMutation, UpdateInviteMutationVariables>;