import HomeAdvantageBox from "@/components/Homepage/HomeAdvantageBox";
import HomeDespreNoiBox from "@/components/Homepage/HomeDespreNoiBox";
import HomeIntroBox from "@/components/Homepage/HomeIntroBox";
import HomeOfertaBox from "@/components/Homepage/HomeOfertaBox";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Container } from "@mui/material";
import { NextPage } from "next/types";

const getHomepageData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getHomepageData {
          homeAdvantageBox {
            data {
              attributes {
                title
                description
                image {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                textIconBox {
                  title
                  description
                  icon {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
          }
          homeGeneralData {
            data {
              attributes {
                seo {
                  metaTitle
                  metaDescription
                  shareImage {
                    data {
                      attributes {
                        width
                        height
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          homeDespreBox {
            data {
              attributes {
                topTitle
                topDescription
                bottomTitle
                bottomDescription
                image {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                numberBoxes {
                  sum
                  name
                }
                buttonUrl
              }
            }
          }
          homeIntroBox {
            data {
              attributes {
                rightImage {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                image {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                title
                description
                buttonText
              }
            }
          }
        }
      `,
    });
    const Data = {
      homeDespreBox: resp.data.homeDespreBox.data.attributes,
      homeAdvantageBox: resp.data.homeAdvantageBox.data.attributes,
      homeIntroBox: resp.data.homeIntroBox.data.attributes,
      ...resp.data.homeGeneralData.data.attributes,
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

const HomeIndexPage: NextPage<{ homeData: Record<any, any> }> = ({
  homeData,
}) => {
  const { seo, homeIntroBox, homeAdvantageBox, homeDespreBox } = homeData;

  return (
    <LayoutWrapper seo={seo}>
      <Container disableGutters>
        <HomeIntroBox data={homeIntroBox} />
        <HomeAdvantageBox data={homeAdvantageBox} />
        <HomeDespreNoiBox data={homeDespreBox} />
        <HomeOfertaBox />
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps(context: any) {
  const homeData = await getHomepageData();
  return {
    props: {
      homeData: homeData ?? null,
    },
    revalidate: 30,
  };
}

export default HomeIndexPage;
