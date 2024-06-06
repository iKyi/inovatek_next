import HomeAdvantageBox from "@/components/Homepage/HomeAdvantageBox";
// import HomeBlogBox from "@/components/Homepage/HomeBlogBox";
import HomeDespreNoiBox from "@/components/Homepage/HomeDespreNoiBox";
import HomeIntroBox from "@/components/Homepage/HomeIntroBox";
import HomeOfertaBox from "@/components/Homepage/HomeOfertaBox";
import HomeProduseBox from "@/components/Homepage/HomeProduseBox";
import HomeServiciiBox from "@/components/Homepage/HomeServiciiBox";
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
          produses {
            data {
              attributes {
                nume
                slug
                descriere
                pricePerElectricBox
                order
                images {
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
          services(sort: "createdAt:desc", pagination: { limit: 3 }) {
            data {
              attributes {
                name
                icon {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
                slug
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
              }
            }
          }
          blogPosts(sort: "createdAt:desc", pagination: { limit: 6 }) {
            data {
              attributes {
                slug
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
                title
              }
            }
          }
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

    const filteredProduse = resp?.data?.produses?.data
      .filter((produs: any) => produs.attributes.pricePerElectricBox === 200)
      .sort((a: any, b: any) => a.attributes.order - b.attributes.order);

    const Data = {
      blogPosts: resp?.data?.blogPosts?.data,
      servicii: resp?.data?.services?.data,
      produse: filteredProduse, //resp?.data?.produses?.data,
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
  const {
    seo,
    homeIntroBox,
    homeAdvantageBox,
    homeDespreBox,
    blogPosts,
    servicii,
    produse,
  } = homeData;

  return (
    <LayoutWrapper seo={seo}>
      <Container disableGutters>
        <HomeIntroBox data={homeIntroBox} />
        <HomeServiciiBox
          servicii={servicii.map((item: any) => item.attributes ?? null)}
        />
        <HomeAdvantageBox data={homeAdvantageBox} />
        <HomeProduseBox
          produseListing={produse.map((item: any) => item?.attributes ?? null)}
        />
        <HomeDespreNoiBox data={homeDespreBox} />
        {/* AG: Hiding for the moment the blog posts box - no content for it now */}
        {/* <HomeBlogBox
          blogPosts={blogPosts.map((item: any) => item.attributes ?? null)}
        /> */}
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
