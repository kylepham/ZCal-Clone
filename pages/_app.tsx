import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Nav from "../components/Nav";
import { useMemo } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      uri: `${process.env.VERCEL_URL || "http://localhost:3000"}/api/graphql`,
    });
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Nav />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
