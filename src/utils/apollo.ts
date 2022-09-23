// utils/apollo.ts
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { AUTH_TOKEN } from "./constants";

const uri = "http://localhost:13002/graphql";
const httpLink = createHttpLink({ uri });

const url = "ws://localhost:13002/graphql";
const wsLink = new GraphQLWsLink(
  createClient({
    url,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  })
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
