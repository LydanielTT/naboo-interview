import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// TODO use process.env.GRAPHQL_URI
export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
    credentials: "include",
  }),
  ssrMode: typeof window === "undefined",
});
