import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const Popup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 6000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [closed]);

  const handleClose = () => {
    setVisible(false);
    setClosed(true);
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 600,
        bgcolor: "white",
        boxShadow: 3,
        p: 0,
        zIndex: 1000,
        "@media (max-width: 600px)": {
          maxWidth: 400,
        },
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8, color: "black" }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <Link href="https://wa.me/40729055245" passHref legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image
            src="https://cms.inovatek.ro/uploads/promo_banner_big_02baae4171.png"
            alt="Popup Image"
            layout="responsive"
            width={600}
            height={400}
            sizes="(max-width: 600px) 400px, 600px"
            style={{ width: "100%", height: "auto" }}
          />
        </a>
      </Link>
    </Box>
  );
};

export default Popup;
