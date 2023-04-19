import CereOfertaForm from "@/components/Homepage/CereOfertaForm";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { centerFlex } from "@/lib/theme/sxUtils";
import { GlobalContext } from "@/pages/_app";
import { Box, Grid } from "@mui/material";
import Image from "next/dist/client/image";
import { useContext } from "react";

interface IHomeOfertaBox {}
const HomeOfertaBox: React.FC<IHomeOfertaBox> = () => {
  const { contactBoxImage } = useContext(GlobalContext);
  const boxImageData = getStrapiFullImageData(contactBoxImage);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#fff",
        py: [3, 3, 6],
      }}
    >
      <Grid container spacing={[2, 2, 4]}>
        <Grid item xs={12} md={6}>
          <CereOfertaForm inverted />
        </Grid>
        {boxImageData && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              ...centerFlex,
              p: 1,
            }}
          >
            <Image
              src={boxImageData?.url}
              height={boxImageData?.height * 0.8}
              width={boxImageData?.width * 0.8}
              alt="inovatek logo"
              priority
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomeOfertaBox;
