import Footer from "@/components/reusable/Layout/Footer/Footer";
import Header from "@/components/reusable/Layout/Header/Header";
import SeoComp, { SeoPropsType } from "@/components/reusable/Seo";
import { Box, SxProps, Theme } from "@mui/material";

export type LayoutWrapperPropsType = {
  children?: any;
  seo: SeoPropsType["seo"];
  noSpacing?: boolean;
  sx?: SxProps<Theme>;
};

const LayoutWrapper: React.FC<LayoutWrapperPropsType> = ({
  children,
  seo,
  noSpacing,
  sx,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SeoComp seo={seo} />
      <Header />
      <Box sx={sx}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default LayoutWrapper;
