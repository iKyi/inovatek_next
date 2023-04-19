import ServiceCard from "@/components/Services/ServicesPage/ServiceCard";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import { NextPage } from "next";

const getServicesData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getServicesData {
          servicesPage {
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
          services {
            data {
              attributes {
                name
                description
                slug
                order
                icon {
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
              }
            }
          }
        }
      `,
    });
    const Data = {
      ...resp.data.servicesPage?.data?.attributes,
      serviceEntries: resp.data.services?.data ?? [],
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

interface IServiciiPage {
  servicePageData: Record<any, any>;
}
const ServiciiPage: NextPage<IServiciiPage> = ({ servicePageData }) => {
  const { serviceEntries, seo } = servicePageData;

  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader title={seo?.metaTitle} description={seo.metaDescription} />
        <Box
          sx={{
            mb: [4, 4, 6],
          }}
        >
          <Grid container spacing={[2, 2, 4]}>
            {serviceEntries.map((service: any) => {
              const { attributes } = service;
              return (
                <Grid key={attributes.slug} item xs={12} sm={6} md={4}>
                  <ServiceCard
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
  const servicePageData = await getServicesData();
  return {
    props: {
      servicePageData: servicePageData ?? null,
    },
    revalidate: 30,
  };
}

export default ServiciiPage;
