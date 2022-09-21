// App.tsx
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo";
import Main from "./components/Main";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
