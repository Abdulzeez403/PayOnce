import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://192.168.43.233:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
