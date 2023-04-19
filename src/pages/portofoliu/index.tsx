import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import client from "@/lib/apolloClient";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { centerFlex } from "@/lib/theme/sxUtils";
import { gql } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import MarkdownParser from "@/components/reusable/MarkdownParser";

const getPortofoliuPage = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getPortofoliuPage {
          portofoliuPage {
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
          portofoliuEntries {
            data {
              attributes {
                name
                description
                images {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
                slug
              }
            }
          }
        }
      `,
    });
    const Data = {
      ...resp.data.portofoliuPage?.data?.attributes,
      portofoliuEntries: resp.data.portofoliuEntries?.data ?? [],
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

const NoContentBox: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: 400,
        ...centerFlex,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        component="div"
        sx={{
          fontSize: [22, 22, 24],
        }}
      >
        Nu exista intrari pentru aceasta sectiune.
      </Typography>
    </Box>
  );
};

interface IPortofoliuPage {
  PortofoliuPage: Record<any, any>;
}
const PortofoliuPage: NextPage<IPortofoliuPage> = ({ PortofoliuPage }) => {
  const { seo, portofoliuEntries } = PortofoliuPage;

  const { metaTitle, metaDescription } = seo;

  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader title={metaTitle} description={metaDescription} />
        <Stack spacing={2}>
          {!portofoliuEntries || portofoliuEntries.length === 0 ? (
            <NoContentBox />
          ) : (
            <Grid container spacing={[2, 2, 3]}>
              {portofoliuEntries.map((item: any) => {
                const { name, description, images, slug } = item.attributes;

                const firstImageData = getStrapiFullImageData(
                  images?.data?.[0]
                );

                return (
                  <Grid item xs={12} md={6} key={slug}>
                    <Card>
                      <CardActionArea
                        component={Link}
                        href={`/portofoliu/${slug}`}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                          }}
                        >
                          {firstImageData && (
                            <Box
                              sx={{
                                width: 100,
                                mr: 2,
                              }}
                            >
                              <Image
                                src={firstImageData.url}
                                width={firstImageData.width}
                                height={firstImageData.height}
                                alt={name}
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                }}
                              />
                            </Box>
                          )}
                          <Box
                            sx={{
                              flex: 1,
                            }}
                          >
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                fontSize: [18, 18, 20],
                                fontWeight: 500,
                                mb: 2,
                              }}
                            >
                              {name}
                            </Typography>
                            <MarkdownParser trimContent={100}>
                              {description}
                            </MarkdownParser>
                          </Box>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Stack>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps(context: any) {
  const PortofoliuPage = await getPortofoliuPage();
  return {
    props: {
      PortofoliuPage: PortofoliuPage ?? null,
    },
    revalidate: 30,
  };
}

export default PortofoliuPage;
