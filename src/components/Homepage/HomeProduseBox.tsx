import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "@/components/Products/ProductCard";

interface IHomeProduseBox {
  produseListing: {
    nume: string;
    slug: string;
    descriere: string;
    images?: { data?: Record<any, any>[] };
  }[];
}
const HomeProduseBox: React.FC<IHomeProduseBox> = ({ produseListing }) => {
  if (!produseListing || produseListing.length === 0) {
    return null;
  }

  return (
    <Box
      component={"section"}
      sx={{
        px: [2, 2, 3],
        py: [4, 4, 6],
        bgcolor: "secondary.main",
      }}
    >
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {produseListing.map((productEntry) => {
          return (
            <SwiperSlide key={productEntry.slug}>
              <ProductCard {...productEntry} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default HomeProduseBox;
