import HeaderMenuItems from "@/components/reusable/Layout/Header/HeaderMenuItems";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { GlobalContext } from "@/pages/_app";
import { MenuOpenOutlined } from "@mui/icons-material";
import { Box, Drawer, IconButton } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";

interface IMobileMenu {}
const MobileMenu: React.FC<IMobileMenu> = () => {
  const { logoLight } = useContext(GlobalContext);
  const logoData = getStrapiFullImageData(logoLight);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            px: [3],
            py: 2,
            textAlign: "left",
          }}
        >
          <Box>
            {logoData && (
              <Image
                src={logoData?.url}
                height={logoData?.height * 0.7}
                width={logoData?.width * 0.7}
                alt="inovatek logo"
                priority
              />
            )}
          </Box>
          <HeaderMenuItems vertical />
        </Box>
      </Drawer>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          ml: 2,
        }}
      >
        <MenuOpenOutlined />
      </IconButton>
    </>
  );
};

export default MobileMenu;
