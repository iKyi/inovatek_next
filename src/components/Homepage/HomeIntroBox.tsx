import MarkdownParser from "@/components/reusable/MarkdownParser";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import useIsMobile from "@/lib/hooks/useIsMobile";
import { getStrapiMedia } from "@/lib/media";
import { centerFlex } from "@/lib/theme/sxUtils";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";

interface IHomeIntroBox {
  data: Record<any, any>;
}
const HomeIntroBox: React.FC<IHomeIntroBox> = ({ data }) => {
  const isMobile = useIsMobile();
  const { image, title, description, buttonText, rightImage } = data;

  const imageUrl = getStrapiMedia(image);

  const rightImageData = getStrapiFullImageData(rightImage);

  return (
    <Box
      component="section"
      sx={{
        background: imageUrl ? `url('${imageUrl}')` : undefined,
        backgroundSize: "cover",
        minHeight: !isMobile ? "80vh" : "auto",
        ...centerFlex,
      }}
    >
      <Grid
        container
        justifyContent={["center", "center", "initial"]}
        alignItems="center"
      >
        <Grid item xs={10} md={6}>
          <Box
            sx={{
              p: [1.5, 1.5, 7],
            }}
          >
            <Stack spacing={[2, 2, 3]} alignItems="flex-start">
              {title && (
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: ["26px", "26px", "40px"],
                    lineHeight: [1.4],
                  }}
                >
                  <MarkdownParser>{title}</MarkdownParser>
                </Typography>
              )}
              {description && (
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                  }}
                >
                  <MarkdownParser>{description}</MarkdownParser>
                </Typography>
              )}
              {buttonText && (
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  component={Link}
                  href="/servicii"
                  endIcon={<ArrowRightAltOutlined />}
                >
                  {buttonText}
                </Button>
              )}
            </Stack>
          </Box>
        </Grid>
        {rightImageData && !isMobile && (
          <Grid item xs={10} md={6}>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Image
                src={rightImageData.url}
                height={rightImageData.height}
                width={rightImageData.width}
                alt="right graphic"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "inline-block",
                }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomeIntroBox;
