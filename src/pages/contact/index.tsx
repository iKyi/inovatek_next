import CereOfertaForm from "@/components/Homepage/CereOfertaForm";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import { NextPage } from "next";

interface IContactPage {
  contactpageData: Record<any, any>;
}
const ContactPage: NextPage<IContactPage> = ({ contactpageData }) => {
  const { seo } = contactpageData;
  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader title={seo?.metaTitle ?? "Contact"} />
        <Box sx={{ my: 3 }}>
          <Grid container justifyContent={"center"}>
            <Grid item xs={12} md={6}>
              <CereOfertaForm hideTitle />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LayoutWrapper>
  );
};

const getContactPageData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getContactPageData {
          contactPage {
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
        }
      `,
    });
    const Data = {
      ...resp.data.contactPage?.data?.attributes,
    };
    return Data;
  } catch (err) {
    console.log(err);
  }
};

export async function getStaticProps(context: any) {
  const contactpageData = await getContactPageData();
  return {
    props: {
      contactpageData: contactpageData ?? null,
    },
    revalidate: 30,
  };
}

export default ContactPage;
