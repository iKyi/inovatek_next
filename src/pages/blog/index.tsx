import BlogCard from "@/components/Blog/BlogCard";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import { NextPage } from "next";

const getBlogPageData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getBlogPageData {
          blogPage {
            data {
              attributes {
                seo {
                  metaTitle
                  metaDescription
                  shareImage {
                    data {
                      attributes {
                        url
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
          blogPosts {
            data {
              attributes {
                description
                title
                slug
                image {
                  data {
                    attributes {
                      url
                      width
                      height
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
      ...resp.data.blogPage?.data?.attributes,
      blogPosts: resp.data.blogPosts?.data ?? [],
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

interface IBlogPage {
  blogPageData: Record<any, any>;
}
const BlogPage: NextPage<IBlogPage> = ({ blogPageData }) => {
  const { seo, blogPosts } = blogPageData;

  const { metaTitle, metaDescription } = seo;

  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader title={metaTitle} description={metaDescription} />
        <Box
          sx={{
            mb: [4, 4, 6],
          }}
        >
          <Grid container spacing={[2, 2, 4]}>
            {blogPosts.map((blogPost: any) => {
              const { attributes } = blogPost;
              return (
                <Grid key={attributes.slug} item xs={12} sm={6} md={4}>
                  <BlogCard
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
  const blogPageData = await getBlogPageData();
  return {
    props: {
      blogPageData: blogPageData ?? null,
    },
    revalidate: 30,
  };
}

export default BlogPage;
