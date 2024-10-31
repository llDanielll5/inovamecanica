import React, { ComponentType } from "react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@/globals/configs/theme";
import { useNProgress } from "@/globals/hooks/useNProgress";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BaseContext, NextPageContext } from "next/dist/shared/lib/utils";
import createEmotionCache from "@/globals/configs/mui/createEmotionCache";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
// import "leaflet/dist/leaflet.css";

const clientSideEmotionCache = createEmotionCache();

export type CustomNextComponentType<
  Context extends BaseContext = NextPageContext,
  InitialProps = {},
  Props = {}
> = ComponentType<Props> & {
  getInitialProps?(context: Context): InitialProps | Promise<InitialProps>;
  getLayout: (c: React.JSX.Element) => React.JSX.Element;
};

interface CustomAppProps extends Omit<AppProps, "Component"> {
  emotionCache: EmotionCache;
  Component: CustomNextComponentType<NextPageContext, any, any>;
}

export default function App(props: CustomAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const theme = createTheme();
  const getLayout = Component.getLayout ?? ((page: React.JSX.Element) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}
