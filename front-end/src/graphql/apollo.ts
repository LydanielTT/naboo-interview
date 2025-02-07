import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_URL_GRAPHQL,
    credentials: "include",
  }),
  ssrMode: typeof window === "undefined",
});
