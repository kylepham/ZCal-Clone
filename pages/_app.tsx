import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Nav from "../components/Nav";
import { useMemo } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserContextProvider } from "../contexts/UserContext";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../utility/createEmotionCache";
import darkTheme from "../styles/theme/dark";
import Head from "next/head";

const protocol = `${process.env.NODE_ENV === "development" ? "http" : "https"}://`;

const host =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    : // Use host on the client since using VERCEL_URL can lead to CORS errors due to aliases
      window.location.host;

const origin = `${protocol}${host}`;

const emotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      uri: `${origin}/api/graphql`,
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <SessionProvider session={pageProps.session}>
          <ApolloProvider client={client}>
            <UserContextProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Nav />
              <Component {...pageProps} />
            </UserContextProvider>
          </ApolloProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
