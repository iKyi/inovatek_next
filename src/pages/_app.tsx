import { getStrapiMedia } from "@/lib/media";
import createEmotionCache from "@/lib/theme/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { createContext } from "react";
import Head from "next/head";
import { InovatekThemeProvider } from "@/lib/theme";
import App from "next/app";
import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import SeoComp from "@/components/reusable/Seo";

const getGlobalData = async () => {
  try {
    const resp = await client.query({
      query: gql`
        query getGlobalData {
          global {
            data {
              attributes {
                siteName
                favicon {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
                logoLight {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                logoDark {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                seo {
                  metaTitle
                  metaDescription
                  shareImage {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                }
                footerText
                contactBoxImage {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                socialEntries {
                  type
                  url
                  id
                }
                contactEntries {
                  type
                  url
                  id
                }
              }
            }
          }
        }
      `,
    });
    return {
      ...resp?.data?.global?.data?.attributes,
    };
  } catch (err) {
    console.log(err);
  }
};

export type ExtendedAppProps = AppProps & {
  emotionCache: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Store Strapi Global object in context
export const GlobalContext = createContext<Record<any, any>>({});

const MyApp = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { global } = pageProps;

  return (
    <GlobalContext.Provider value={{ ...global }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <link rel="shortcut icon" href={getStrapiMedia(global?.favicon)} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SeoComp seo={global?.seo ?? {}} />
        <InovatekThemeProvider>
          <Component {...pageProps} />
        </InovatekThemeProvider>
      </CacheProvider>
    </GlobalContext.Provider>
  );
};

MyApp.getInitialProps = async (ctx: any) => {
  const [appProps, global] = await Promise.all([
    App.getInitialProps(ctx),
    getGlobalData(),
  ]);

  return {
    ...appProps,
    pageProps: {
      global: global,
    },
  };
};

export default MyApp;
