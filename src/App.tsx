import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import RoutesComponent from "./features/routes/Routes";

const graphqlApi = "http://localhost/frontend_test/src/index.php/graphqlapi";

const client = new ApolloClient({
  uri: graphqlApi,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RoutesComponent />
    </ApolloProvider>
  );
}

export default App;
