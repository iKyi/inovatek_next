import { centerFlex } from "@/lib/theme/sxUtils";
import { Box, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";

interface INuExistaRezultate { }
const NuExistaRezultate: React.FC<INuExistaRezultate> = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        ...centerFlex,
      }}
    >
      <Box
        sx={{
          width: "500px",
          maxWidth: "100%",
          p: 1,
        }}
      >
        <Stack>
          <Typography
            variant="h1"
            sx={{
              fontSize: "24px",
              textAlign: 'center'
            }}
          >
            Nu exista rezultate pentru cautarea ta.
          </Typography>
          <Button
            component={Link}
            href="/"
            color="secondary"
            variant="contained"
            sx={{ mt: [4, 4, 6] }}
          >
            Inapoi
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NuExistaRezultate;
