import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import client from "@/lib/apolloClient";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { getStrapiMedia } from "@/lib/media";
import { centerFlex } from "@/lib/theme/sxUtils";
import { gql } from "@apollo/client";
import { ZoomIn } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  Link as MUILink,
} from "@mui/material";
import { styled } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const getPortfolioEntryData = async (slug: string) => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      variables: {
        slug: slug,
      },
      query: gql`
        query getPortfolioEntryData($slug: String) {
          portofoliuEntries(filters: { slug: { eq: $slug } }) {
            data {
              attributes {
                name
                description
                slug
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
      ...(resp.data.portofoliuEntries?.data?.[0]?.attributes ?? {}),
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

interface IPortofoliuPage {
  portofoliuData: Record<any, any>;
}
const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

const PortofoliuPage: NextPage<IPortofoliuPage> = ({ portofoliuData }) => {
  const { name, description, images } = portofoliuData;

  const { data: imagesData } = images ?? {};
  const firstImageUrl = getStrapiMedia(images?.data?.[0]);

  const breadCrumbs = [
    <StyledLink key="homeLink" href="/">
      Acasa
    </StyledLink>,
    <StyledLink key="parentLink" href="/portofoliu">
      Portofoliu
    </StyledLink>,
    <Box
      key="currentLink"
      aria-disabled="true"
      sx={{
        textDecoration: "underline",
      }}
    >
      {name}
    </Box>,
  ];

  return (
    <LayoutWrapper
      seo={{
        article: true,
        metaTitle: name,
        metaDescription: description,
        shareImage: firstImageUrl ?? "",
      }}
    >
      <Container>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadCrumbs}
        </Breadcrumbs>
      </Container>
      <Container>
        <PageHeader title={name} />
        <Box
          sx={{
            my: 2,
          }}
        >
          <MarkdownParser>{description}</MarkdownParser>
        </Box>
        {imagesData && imagesData.length > 0 ? (
          <Box
            sx={{
              py: [3],
            }}
          >
            <Grid container spacing={[2, 2, 4]}>
              {imagesData.map((image: any, index: number) => {
                const imageFullData = getStrapiFullImageData(image);
                if (!imageFullData) {
                  return null;
                }
                return (
                  <Grid item xs={12} sm={6} key={imageFullData.url}>
                    <Box
                      sx={{
                        ...centerFlex,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={imageFullData.url}
                        alt={`graphic no. ${index} for ${name}`}
                        style={{ width: "100%", height: "auto" }}
                        width={imageFullData.width}
                        height={imageFullData.height}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          zIndex: 3,
                        }}
                      >
                        <IconButton
                          component={MUILink}
                          href={`${imageFullData.url}`}
                          target="_blank"
                          rel="noreferrer"
                          sx={{
                            boxShadow: `0px 0px 10px 3px rgba(0, 0, 0, 0.8)`,
                            bgcolor: "primary.main",
                            color: "#000",
                            "&:active,&:hover": {
                              bgcolor: "primary.main",
                            },
                          }}
                        >
                          <ZoomIn color="inherit" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : null}
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticPaths() {
  const resp = await client.query({
    query: gql`
      query getAllProductSlugs {
        portofoliuEntries {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const produse = resp?.data?.portofoliuEntries?.data ?? [];

  return {
    paths: produse.map((category: any) => {
      const { attributes } = category;
      const { slug } = attributes;
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const { slug } = params;
  const resp = await getPortfolioEntryData(slug);

  if (Object.keys(resp).length === 0 && resp.constructor === Object) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      portofoliuData: resp,
    },
    revalidate: 60,
  };
}

export default PortofoliuPage;
