import ThemeDivider from "@/components/reusable/Layout/ThemeDivider";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { centerFlex } from "@/lib/theme/sxUtils";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface IHomeAdvantageBox {
  data: {
    title: string;
    description: string;
    image: Record<any, any>;
    textIconBox: {
      title: string;
      description: string;
      icon: Record<any, any>;
    }[];
  };
}
const HomeAdvantageBox: React.FC<IHomeAdvantageBox> = ({ data }) => {
  const { title, description, image, textIconBox } = data;

  const imageUrl = getStrapiFullImageData(image);

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#fff",
        color: "#000000",
      }}
    >
      <Box
        sx={{
          py: [7, 7, 15],
        }}
      >
        <Grid container justifyContent={"center"}>
          {imageUrl && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 1,
                }}
              >
                <Image
                  src={imageUrl.url}
                  height={imageUrl.height}
                  width={imageUrl.width}
                  alt="advantage grpahic"
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: [2, 2, 4],
              }}
            >
              {title && (
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: [24, 24, 40],
                  }}
                  component="div"
                >
                  <MarkdownParser>{title}</MarkdownParser>
                </Typography>
              )}
              <ThemeDivider />
              {description && (
                <Typography component="div" variant="body1" sx={{}}>
                  <MarkdownParser>{description}</MarkdownParser>
                </Typography>
              )}

              <Stack spacing={2} sx={{ mt: 4 }}>
                {textIconBox && textIconBox.length > 0
                  ? textIconBox.map((item) => {
                      const iconData = getStrapiFullImageData(item.icon);
                      const { title, description } = item;
                      return (
                        <Box
                          sx={{
                            display: "flex",
                          }}
                          key={title}
                        >
                          {iconData && (
                            <Box
                              sx={{
                                width: "70px",
                                mr: [3, 3, 4],
                              }}
                            >
                              <Image
                                src={iconData.url}
                                alt="icon"
                                height={iconData.height}
                                width={iconData.width}
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
                            {title && (
                              <Typography
                                variant="h3"
                                sx={{
                                  fontSize: [22, 22, 24],
                                  mb: 1,
                                  fontWeight: 600,
                                }}
                                component="div"
                              >
                                <MarkdownParser>{title}</MarkdownParser>
                              </Typography>
                            )}
                            {description && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#4F4F4F",
                                }}
                                component="div"
                              >
                                <MarkdownParser>{description}</MarkdownParser>
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      );
                    })
                  : null}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeAdvantageBox;
