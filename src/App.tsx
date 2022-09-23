// App.tsx
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="center w85">
          <Header />
          <Main />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}
