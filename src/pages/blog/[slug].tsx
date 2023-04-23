import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import client from "@/lib/apolloClient";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { gql } from "@apollo/client";
import { Box, Breadcrumbs, Container, styled } from "@mui/material";
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
        query getBlogPostData($slug: String) {
          blogPosts(filters: { slug: { eq: $slug } }) {
            data {
              attributes {
                title
                description
                slug
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
      ...(resp.data.blogPosts?.data?.[0]?.attributes ?? {}),
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

interface IBlogPage {
  blogPostData: {
    title: string;
    description: string;
    slug: string;
    image?: Record<any, any>;
  };
}
const BlogPage: NextPage<IBlogPage> = ({ blogPostData }) => {
  const { description, slug, title, image } = blogPostData;

  const imageData = getStrapiFullImageData(image);

  const breadCrumbs = [
    <StyledLink key="homeLink" href="/">
      Acasa
    </StyledLink>,
    <StyledLink key="parentLink" href="/blog">
      Blog
    </StyledLink>,
    <Box
      key="currentLink"
      aria-disabled="true"
      sx={{
        textDecoration: "underline",
      }}
    >
      {title}
    </Box>,
  ];

  return (
    <LayoutWrapper
      seo={{
        article: true,
        metaTitle: title,
        metaDescription: description,
        shareImage: imageData?.url ?? "",
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
        <PageHeader title={title} />
        {imageData && (
          <Box
            sx={{
              textAlign: "center",
              my: [2, 2, 3],
            }}
          >
            <Image
              src={imageData.url}
              height={imageData.height}
              width={imageData.width}
              alt={`main graphic for ${title}`}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            my: 4,
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
      query getAllProductSlugs {
        blogPosts {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const blogPoststs = resp?.data?.blogPosts?.data ?? [];

  return {
    paths: blogPoststs.map((category: any) => {
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
      blogPostData: resp,
    },
    revalidate: 60,
  };
}

export default BlogPage;
