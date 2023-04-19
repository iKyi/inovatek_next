import { Box, Divider } from "@mui/material";

interface IThemeDivider {
  smaller?: boolean;
}
const ThemeDivider: React.FC<IThemeDivider> = ({ smaller = false }) => {
  return (
    <Box
      sx={{
        py: smaller ? [1, 1, 2] : [3, 3, 4.5],
      }}
    >
      <Divider
        sx={{
          borderColor: "#DEDEDE",
          width: "170px",
          maxWidth: "100%",
        }}
      />
    </Box>
  );
};

export default ThemeDivider;
