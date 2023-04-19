import ProductCard from "@/components/Products/ProductCard";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import { SeoPropsType } from "@/components/reusable/Seo";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import { NextPage } from "next";

const getProdusePageData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getProductsPageData {
          produsePage {
            data {
              attributes {
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
              }
            }
          }
          produses {
            data {
              attributes {
                nume
                slug
                descriere
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
        }
      `,
    });
    const Data = {
      ...resp.data.produsePage?.data?.attributes,
      productEntries: resp.data.produses?.data ?? [],
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

interface IProdusePage {
  produsePageData: Record<string, any>;
}
const ProdusePage: NextPage<IProdusePage> = ({ produsePageData }) => {
  const { seo, productEntries } = produsePageData;

  const { metaTitle, metaDescription } = seo as SeoPropsType["seo"];

  return (
    <LayoutWrapper seo={seo as SeoPropsType["seo"]}>
      <Container>
        <PageHeader title={metaTitle ?? ""} description={metaDescription} />
        <Box
          sx={{
            mb: [4, 4, 6],
          }}
        >
          <Grid container spacing={[2, 2, 4]}>
            {productEntries.map((service: any) => {
              const { attributes } = service;
              return (
                <Grid key={attributes.slug} item xs={12} sm={6} md={4}>
                  <ProductCard
                    {...attributes}
                    sx={{
                      minHeight: "100%",
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps(context: any) {
  const produsePageData = await getProdusePageData();
  return {
    props: {
      produsePageData: produsePageData ?? null,
    },
    revalidate: 30,
  };
}

export default ProdusePage;
