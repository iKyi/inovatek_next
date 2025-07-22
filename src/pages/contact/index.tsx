import CereOfertaForm from "@/components/Homepage/CereOfertaForm";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
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
          <Grid container justifyContent={"center"} spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    color: "text.secondary",
                  }}
                >
                  Indiferent dacă ești interesat de o colaborare sau ai nevoie
                  de folie pentru un proiect punctual, suntem aici pentru tine:
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mt: 3, mb: 2, color: "primary.main" }}
                >
                  Vrei să montezi și să oferi folie Smart în portofoliul tău?
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ lineHeight: 1.8, color: "text.secondary" }}
                >
                  Căutăm colaboratori la nivel național – firme specializate în
                  tâmplărie, construcții sau arhitectură – care vor să comande
                  direct de la noi folie PDLC tăiată la dimensiuni, gata de
                  montaj. Te ajutăm să fii cu un pas înaintea concurenței, cu un
                  produs premium și suport tehnic dedicat.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  Ai un proiect în București sau în zonele apropiate?
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ lineHeight: 1.8, color: "text.secondary" }}
                >
                  Ne ocupăm noi direct de furnizarea și montajul foliei.
                  Trimite-ne detaliile și revenim cu o ofertă personalizată.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    mt: 3,
                    fontSize: "1.1rem",
                    color: "text.secondary",
                  }}
                >
                  Completează formularul de contact și menționează dacă este
                  vorba despre o colaborare sau o comandă directă.
                </Typography>
              </Box>
            </Grid>
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
