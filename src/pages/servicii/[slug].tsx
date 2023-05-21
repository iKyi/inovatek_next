import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Box, Breadcrumbs, Container, Typography, styled } from "@mui/material";
import { NextPage } from "next/types";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import Image from "next/image";
import MarkdownParser from "@/components/reusable/MarkdownParser";

const getServiceEntryData = async (slug: string) => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      variables: {
        slug: slug,
      },
      query: gql`
        query getAllServicesSlugs($slug: String) {
          services(filters: { slug: { eq: $slug } }) {
            data {
              attributes {
                slug
                name
                description
                slug
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
      ...(resp.data.services?.data?.[0]?.attributes ?? {}),
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

interface IServiciuPage {
  serviceData: Record<string, string>;
}
const ServiciuPage: NextPage<IServiciuPage> = ({ serviceData }) => {
  const { slug, name, description, icon, image } = serviceData;

  const mainImageData = getStrapiFullImageData(image);

  const breadCrumbs = [
    <StyledLink key="homeLink" href="/">
      Acasa
    </StyledLink>,
    <StyledLink key="parentLink" href="/servicii">
      Servicii
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
        metaDescription: description,
        metaTitle: name,
        shareImage: mainImageData?.url ?? "",
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
          {name}
        </Typography>
        {mainImageData && (
          <Box
            sx={{
              textAlign: "center",
              my: [2, 2, 3],
            }}
          >
            <Image
              src={mainImageData.url}
              height={mainImageData.height}
              width={mainImageData.width}
              alt={`main graphic for ${name}`}
              style={{
                maxWidth: "80%",
                height: "auto",
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            mt: [2, 2, 3],
          }}
        >
          <MarkdownParser>{description}</MarkdownParser>
        </Box>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticPaths() {
  const resp = await client.query({
    query: gql`
      query getAllServicesSlugs {
        services {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const servicii = resp?.data?.services?.data ?? [];

  return {
    paths: servicii.map((category: any) => {
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
  const resp = await getServiceEntryData(slug);
  if (Object.keys(resp).length === 0 && resp.constructor === Object) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serviceData: resp,
    },
    revalidate: 60,
  };
}

export default ServiciuPage;
