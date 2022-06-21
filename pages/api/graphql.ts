import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import Cors from "micro-cors";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { prisma } from "../../prisma";
import resolvers from "../../graphql/resolvers";

const cors = Cors();
export type GraphQLContext = {
  prisma: PrismaClient;
};

export const createContext = () => {
  return {
    prisma,
  };
};

const typeDefs = readFileSync(join(process.cwd(), "graphql", "schema.graphql"), "utf-8");
const apolloServer = new ApolloServer({ typeDefs, resolvers, context: createContext() });
const serverStart = apolloServer.start();

export default cors(async (request: MicroRequest, response: ServerResponse) => {
  // Read more: https://github.com/apollographql/apollo-server/issues/2473
  if (request.method === "OPTIONS") {
    response.end();
    return;
  }

  await serverStart; // Apollo Server 3 Syntax
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(request, response);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
