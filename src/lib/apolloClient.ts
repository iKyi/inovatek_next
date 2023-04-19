import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getStrapiURL } from "./api";

const client = new ApolloClient({
  uri: `${getStrapiURL()}/graphql/`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});

export default client;
