import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://hackaton-yakse.ru/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;