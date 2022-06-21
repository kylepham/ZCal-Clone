import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Invite as InviteModel, Event as EventModel } from '@prisma/client';
import { GraphQLContext } from '../../pages/api/graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

