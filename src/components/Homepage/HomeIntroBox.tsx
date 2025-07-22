import MarkdownParser from "@/components/reusable/MarkdownParser";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import useIsMobile from "@/lib/hooks/useIsMobile";
import { getStrapiMedia } from "@/lib/media";
import { centerFlex } from "@/lib/theme/sxUtils";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IHomeIntroBox {
  data: Record<any, any>;
}
const HomeIntroBox: React.FC<IHomeIntroBox> = ({ data }) => {
  const isMobile = useIsMobile();
  const theme = useTheme();
  const { image, title, description, buttonText, rightImage } = data;
  const imageUrl = getStrapiMedia(image);
  const rightImageData = getStrapiFullImageData(rightImage);

  // Create multiple content slides - for now duplicating the content
  // In the future, this will come from the CMS
  const contentSlides = [
    {
      title: title,
      description: description,
      buttonText: buttonText,
      buttonLink: "/portofoliu",
    },
    {
      title: "<span class='bg-primary'>Devino partner Inovatek!</span>",
      description: `Căutăm parteneri profesioniști la nivel național pentru comercializarea și montajul foliei inteligente, tăiată la comandă și ușor de integrat în proiecte moderne.<br /><br />Colaborăm cu firme din domeniul tâmplăriei PVC, construcțiilor și arhitecturii.<br /><br />Contactează-ne telefonic, pe email sau prin formularul de contact de pe site! Suntem gata să construim împreună un parteneriat de succes.
      `,
      buttonText: "Aplică pentru parteneriat",
      buttonLink: "/contact",
    },
  ];

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
              "& .swiper": {
                height: "100%",
                "&:hover .swiper-button-prev, &:hover .swiper-button-next": {
                  opacity: 1,
                },
                "& .swiper-button-prev, & .swiper-button-next": {
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:after": {
                    fontSize: "20px",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                },
                "& .swiper-button-prev": {
                  left: "-50px",
                  [theme.breakpoints.down("md")]: {
                    left: "10px",
                  },
                },
                "& .swiper-button-next": {
                  right: "-50px",
                  [theme.breakpoints.down("md")]: {
                    right: "10px",
                  },
                },
                "& .swiper-pagination": {
                  bottom: "-30px",
                },
                "& .swiper-pagination-bullet": {
                  backgroundColor: "white",
                  opacity: 0.5,
                  width: "10px",
                  height: "10px",
                  "&-active": {
                    opacity: 1,
                    backgroundColor: theme.palette.secondary.main,
                  },
                },
              },
            }}
          >
            <Swiper
              spaceBetween={30}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Pagination, Autoplay]}
              className="homeIntroSwiper"
            >
              {contentSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Stack spacing={[2, 2, 3]} alignItems="flex-start">
                    {slide.title && (
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          fontWeight: 500,
                          fontSize: ["26px", "26px", "40px"],
                          lineHeight: [1.4],
                        }}
                      >
                        <MarkdownParser>{slide.title}</MarkdownParser>
                      </Typography>
                    )}
                    {slide.description && (
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontWeight: "normal",
                          fontSize: "18px",
                        }}
                      >
                        <MarkdownParser>{slide.description}</MarkdownParser>
                      </Typography>
                    )}
                    {slide.buttonText && (
                      <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        component={Link}
                        href={slide.buttonLink}
                        endIcon={<ArrowRightAltOutlined />}
                      >
                        {slide.buttonText}
                      </Button>
                    )}
                  </Stack>
                </SwiperSlide>
              ))}
            </Swiper>
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
