import FooterTitle from "@/components/reusable/Layout/Footer/FooterTitle";
import CommonIcon from "@/components/reusable/Layout/SocialIcon";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { GlobalContext } from "@/pages/_app";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link as MUILink,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface IFooter {}
const Footer: React.FC<IFooter> = () => {
  const { logoLight, footerText, socialEntries, contactEntries } =
    useContext(GlobalContext);

  const logoData = getStrapiFullImageData(logoLight);

  return (
    <Box
      component={"footer"}
      sx={{
        py: [5, 5, 8],
        bgcolor: "secondary.dark",
        mt: "auto",
      }}
    >
      <Container>
        <Grid container spacing={[2, 2, 4]}>
          <Grid xs={12} md={3} item>
            <Box>
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src={logoData?.url}
                  height={logoData?.height * 0.8}
                  width={logoData?.width * 0.8}
                  alt="inovatek logo"
                  priority
                />
              </Link>
            </Box>
          </Grid>

          {contactEntries && (
            <Grid xs={12} md={3} item>
              <Box>
                <FooterTitle>
                  <strong>Contactează-ne</strong>
                </FooterTitle>
                <Stack spacing={2} alignItems="flex-start">
                  {contactEntries.map((item: any) => {
                    let urlPreThing = "";
                    if (item.type === "email") {
                      urlPreThing = "mailto:";
                    } else {
                      urlPreThing = "tel:";
                    }

                    return (
                      <Button
                        component={MUILink}
                        key={`${item.type}-${item.url}`}
                        startIcon={<CommonIcon icon={item.type} />}
                        rel="noreferrer"
                        target="_blank"
                        href={`${urlPreThing}${item.url}`}
                        sx={{
                          color: "#fff",
                          textDecoration: "underline",
                          textTransform: "none",
                        }}
                      >
                        {item.url}
                      </Button>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
          )}

          <Grid xs={12} md={3} item>
            <Box>
              <FooterTitle>
                <strong>Social media</strong>
              </FooterTitle>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {socialEntries?.map((item: any) => {
                  return (
                    <IconButton
                      component={MUILink}
                      key={`${item.type}-${item.url}`}
                      rel="noreferrer"
                      target="_blank"
                      href={`${item.url}`}
                      sx={{
                        color: "#fff",
                        textDecoration: "underline",
                      }}
                    >
                      <CommonIcon icon={item.type} />
                    </IconButton>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          <Grid xs={12} md={3} item>
            <Box>
              <FooterTitle>
                <strong>Misiunea noastră</strong>
              </FooterTitle>
              {footerText && (
                <Box
                  sx={{
                    fontSize: "90%",
                    mt: 2,
                  }}
                >
                  <MarkdownParser>{footerText}</MarkdownParser>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
