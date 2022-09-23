// utils/apollo.ts
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./constants";

const uri = "http://localhost:13002/graphql";
const httpLink = createHttpLink({ uri });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = authLink.concat(httpLink);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
