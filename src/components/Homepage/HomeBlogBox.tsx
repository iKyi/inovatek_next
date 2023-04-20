import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BlogCard from "@/components/Blog/BlogCard";

interface IHomeBlogBox {
  blogPosts: {
    slug: string;
    description: string;
    image: object;
    title: string;
  }[];
}
const HomeBlogBox: React.FC<IHomeBlogBox> = ({ blogPosts }) => {
  if (!blogPosts || blogPosts.length === 0) return null;
  return (
    <Box
      component={"section"}
      sx={{
        px: [2, 2, 3],
        py: [4, 4, 6],
        bgcolor: "secondary.light",
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
        {blogPosts.map((blogPost) => {
          return (
            <SwiperSlide key={blogPost.slug}>
              <BlogCard {...blogPost} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default HomeBlogBox;
