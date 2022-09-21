// utils/apollo.ts
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri = "http://localhost:13002/graphql";
const link = createHttpLink({ uri });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
