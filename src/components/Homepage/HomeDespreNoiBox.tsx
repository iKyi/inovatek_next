import ThemeDivider from "@/components/reusable/Layout/ThemeDivider";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { centerFlex } from "@/lib/theme/sxUtils";

interface IHomeDespreNoiBox {
  data: {
    topTitle: string;
    topDescription: string;
    bottomTitle: string;
    bottomDescription: string;
    image: object;
    numberBoxes: {
      sum: number;
      name: string;
    }[];
    buttonUrl: string;
  };
}
const HomeDespreNoiBox: React.FC<IHomeDespreNoiBox> = ({ data }) => {
  const {
    bottomDescription,
    bottomTitle,
    numberBoxes,
    topDescription,
    topTitle,
    buttonUrl,
    image,
  } = data;

  const bigImageData = getStrapiFullImageData(image);

  return (
    <Box
      component="section"
      sx={{
        py: [10, 10, 15],
      }}
    >
      <Box>
        <Grid container justifyContent={"center"}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              ...centerFlex,
              p: [2, 2, 1],
            }}
          >
            <Stack spacing={3}>
              {topTitle && (
                <Box>
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: [22, 22, 28],
                      fontWeight: 600,
                    }}
                    component="div"
                  >
                    <MarkdownParser>{topTitle}</MarkdownParser>
                  </Typography>
                  <ThemeDivider smaller />
                  {topDescription && (
                    <Typography component="div">
                      <MarkdownParser>{topDescription}</MarkdownParser>
                    </Typography>
                  )}
                </Box>
              )}

              <Box>
                {bottomTitle && (
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: [22, 22, 28],
                      fontWeight: 600,
                    }}
                    component="div"
                  >
                    <MarkdownParser>{bottomTitle}</MarkdownParser>
                  </Typography>
                )}
                <ThemeDivider smaller />
                {bottomDescription && (
                  <Typography component="div">
                    <MarkdownParser>{bottomDescription}</MarkdownParser>
                  </Typography>
                )}
              </Box>

              {numberBoxes && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    justifyContent: "space-between",
                  }}
                >
                  {numberBoxes.map((box) => {
                    return (
                      <Stack
                        key={box.name}
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            fontSize: [30, 30, 40],
                            fontWeight: 600,
                          }}
                        >
                          {box.sum}
                        </Typography>
                        <Typography component="div">{box.name}</Typography>
                      </Stack>
                    );
                  })}
                </Box>
              )}
              <Box>
                {buttonUrl && (
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    component={Link}
                    href={buttonUrl}
                    endIcon={<ArrowRightAltOutlined />}
                  >
                    Afla mai multe
                  </Button>
                )}
              </Box>
            </Stack>
          </Grid>
          {bigImageData && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Image
                  src={bigImageData?.url}
                  width={bigImageData?.width}
                  height={bigImageData?.height}
                  alt="despre noi big graphic"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeDespreNoiBox;
