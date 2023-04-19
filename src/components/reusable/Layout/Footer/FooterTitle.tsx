import { Box, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IFooterTitle {
  sx?: SxProps<Theme>;
  children: ReactNode;
}
const FooterTitle: React.FC<IFooterTitle> = ({ children, sx }) => {
  return (
    <Typography
      variant={"h5"}
      component="div"
      sx={{
        fontSize: [16],
        mb: [2, 2, 3],
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default FooterTitle;
