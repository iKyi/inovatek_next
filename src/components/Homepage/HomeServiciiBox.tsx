import ServiceCard from "@/components/Services/ServicesPage/ServiceCard";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";

interface IHomeServiciiBox {
  servicii: {
    name: string;
    icon: object;
    slug: string;
    description: string;
    image: object;
  }[];
}
const HomeServiciiBox: React.FC<IHomeServiciiBox> = ({ servicii }) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  if (!servicii || servicii.length === 0) return null;
  return (
    <Box
      component={"section"}
      sx={{
        backgroundColor: "#fff",
        p: [2, 2, 3],
      }}
    >
      <Box
        sx={{
          mt: [0, 0, -26],
        }}
      >
        <Swiper
          onSwiper={setSwiperRef}
          navigation={true}
          spaceBetween={30}
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
          {servicii.map((service) => {
            return (
              <SwiperSlide key={service.slug}>
                <ServiceCard {...service} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HomeServiciiBox;
