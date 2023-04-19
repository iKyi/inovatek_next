import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import client from "@/lib/apolloClient";
import { getStrapiMedia } from "@/lib/media";
import { gql } from "@apollo/client";
import { Box, Breadcrumbs, Container, Typography, styled } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import ImagesSliderWithThumbnail from "@/components/Products/ImagesSliderWithThumbnail";

const getProductEntryData = async (slug: string) => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      variables: {
        slug: slug,
      },
      query: gql`
        query getProductEntryData($slug: String) {
          produses(filters: { slug: { eq: $slug } }) {
            data {
              attributes {
                nume
                descriere
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
      ...(resp.data.produses?.data?.[0]?.attributes ?? {}),
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

interface IProdusPage {
  productData: Record<any, any>;
}
const ProdusPage: NextPage<IProdusPage> = ({ productData }) => {
  const { nume, descriere, images } = productData;

  const firstImageUrl = getStrapiMedia(images?.data?.[0]);

  const imageUrls = images?.data?.map((image: any) => getStrapiMedia(image));

  const breadCrumbs = [
    <StyledLink key="homeLink" href="/">
      Acasa
    </StyledLink>,
    <StyledLink key="parentLink" href="/produse">
      Produse
    </StyledLink>,
    <Box
      key="currentLink"
      aria-disabled="true"
      sx={{
        textDecoration: "underline",
      }}
    >
      {nume}
    </Box>,
  ];

  return (
    <LayoutWrapper
      seo={{
        article: true,
        metaDescription: descriere,
        metaTitle: nume,
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
      <Container
        sx={{
          py: [4, 4, 6],
        }}
      >
        <Typography
          variant="h1"
          sx={{
            my: [3, 3, 4],
            textAlign: "center",
            fontSize: [26, 26, 32],
          }}
        >
          {nume}
        </Typography>
        <ImagesSliderWithThumbnail images={imageUrls} />
        <Box
          sx={{
            mt: [2, 2, 3],
          }}
        >
          <MarkdownParser>{descriere}</MarkdownParser>
        </Box>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticPaths() {
  const resp = await client.query({
    query: gql`
      query getAllProductSlugs {
        produses {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const produse = resp?.data?.produses?.data ?? [];

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
  const resp = await getProductEntryData(slug);
  if (Object.keys(resp).length === 0 && resp.constructor === Object) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productData: resp,
    },
    revalidate: 60,
  };
}

export default ProdusPage;
