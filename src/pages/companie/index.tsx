import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import client from "@/lib/apolloClient";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { centerFlex } from "@/lib/theme/sxUtils";
import { gql } from "@apollo/client";
import { AirlineSeatLegroomNormalOutlined } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";

const getCompaniePageData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getCompaniePageData {
          companiePage {
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
                contentBox {
                  title
                  description
                  id
                  rightImage
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
        }
      `,
    });
    const Data = {
      ...resp.data.companiePage?.data?.attributes,
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

interface ICompaniePage {
  companiePageData: Record<any, any>;
}
const CompaniePage: NextPage<ICompaniePage> = ({ companiePageData }) => {
  const { seo, contentBox } = companiePageData;

  const { metaTitle, metaDescription } = seo;

  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader title={metaTitle} description={metaDescription} />
        <Stack
          sx={{
            my: [4, 4, 6],
          }}
          spacing={3}
        >
          {contentBox.map((item: any) => {
            const { title, description, image, rightImage, id } = item;
            const imageFullData = getStrapiFullImageData(image);
            return (
              <Box key={id}>
                <Grid container spacing={[2, 2, 4]}>
                  {imageFullData && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        ...centerFlex,
                      }}
                      order={rightImage ? [1, 1, 4] : [1, 1, 1]}
                    >
                      <Image
                        src={imageFullData.url}
                        width={imageFullData.width}
                        height={imageFullData.height}
                        alt={`graphic for ${title ?? ""} section ${id}`}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                      ...centerFlex,
                    }}
                    order={2}
                  >
                    <Box>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          fontSize: [22, 22, 26],
                          fontWeight: 600,
                          mb: [2, 2, 4],
                        }}
                      >
                        {title}
                      </Typography>
                      {description && (
                        <MarkdownParser>{description}</MarkdownParser>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps(context: any) {
  const companiePageData = await getCompaniePageData();
  return {
    props: {
      companiePageData: companiePageData ?? null,
    },
    revalidate: 30,
  };
}

export default CompaniePage;
