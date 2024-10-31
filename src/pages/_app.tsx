import React, { ComponentType, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@/globals/configs/theme";
import { useNProgress } from "@/globals/hooks/useNProgress";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BaseContext, NextPageContext } from "next/dist/shared/lib/utils";
import createEmotionCache from "@/globals/configs/mui/createEmotionCache";
import type { AppProps } from "next/app";
import * as fbq from "../lib/fpixel";
import Script from "next/script";
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
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const theme = createTheme();
  const getLayout = Component.getLayout ?? ((page: React.JSX.Element) => page);

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();
    const handleRouteChange = () => fbq.pageview();

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(
            <>
              <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', ${fbq.FB_PIXEL_ID});
                `,
                }}
              />
              <Component {...pageProps} />
            </>
          )}
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}
