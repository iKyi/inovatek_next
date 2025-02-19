import { getStrapiMedia } from "@/lib/media";
import createEmotionCache from "@/lib/theme/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { InovatekThemeProvider } from "@/lib/theme";
import App from "next/app";
import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import SeoComp from "@/components/reusable/Seo";
import { getConsentCookie } from "@/utils/consentCookie";
import CookieConsentBar from "@/components/reusable/CookieConsentBar";

const getGlobalData = async () => {
  try {
    const resp = await client.query({
      query: gql`
        # Write your query or mutation here
        query getGlobalData {
          global {
            data {
              attributes {
                companyDetails
                footerLinks {
                  url
                  id
                  text
                }
                footerLegalLinks {
                  url
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                  id
                }
                siteName
                googleTagCode
                messageSentText
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
  const { googleTagCode } = global ?? {};
  const [showCookieBar, setShowCookieBar] = useState(false);
  const [wasConsented, setWaSConsented] = useState(false);

  useEffect(() => {
    const cookieStorageStatus = getConsentCookie();
    if (cookieStorageStatus === null) {
      setShowCookieBar(true);
    } else if (cookieStorageStatus === "true") {
      setWaSConsented(true);
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ ...global }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <link rel="shortcut icon" href={getStrapiMedia(global?.favicon)} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta
            name="google-site-verification"
            content="sS53B9Nf1JqKsCdInvBum5kPFzgvi_YOYmI1S_yzx8U"
          />
        </Head>
        {googleTagCode && wasConsented ? (
          <>
            <Script
              id="googleTagManager"
              dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i)
                {w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K7LD98NS');
                `,
              }}
            />
            <Script
              id="tagmngrParent"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagCode}`}
            ></Script>
            <Script
              id="tagMengrInner"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTagCode}');
            `,
              }}
            />
            <Script
              id="facebookPixel"
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
                fbq('init', '252672817364107');
                fbq('track', 'PageView');
            `,
              }}
            />
            <Script
              id="gtagReportConversion"
              dangerouslySetInnerHTML={{
                __html: `
                  function gtag_SubmitContactForm(url) {
                    var callback = function () {
                      if (typeof(url) != 'undefined') {
                        window.location = url;
                      }
                    };
                    gtag('event', 'conversion', {
                        'send_to': 'AW-11475582340/DjQrCLij8IkZEIT7_d8q',
                        'value': 200.0,
                        'currency': 'RON',
                        'event_callback': callback
                    });
                    return false;
                  }
                  function gtag_WhatsApp(url) {
                    var callback = function () {
                      if (typeof(url) != 'undefined') {
                        window.location = url;
                      }
                    };
                    gtag('event', 'conversion', {
                        'send_to': 'AW-11475582340/HBO0CJnL0cYZEIT7_d8q',
                        'value': 100.0,
                        'currency': 'RON',
                        'event_callback': callback
                    });
                    return false;  
                  }
                `,
              }}
            />
          </>
        ) : null}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K7LD98NS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=252672817364107&ev=PageView&noscript=1"
          />
        </noscript>

        <SeoComp seo={global?.seo ?? {}} />
        <InovatekThemeProvider>
          <Component {...pageProps} />
          {showCookieBar && <CookieConsentBar />}
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
