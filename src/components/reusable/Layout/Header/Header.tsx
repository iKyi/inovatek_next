import useIsMobile from "@/lib/hooks/useIsMobile";
import { getStrapiMedia } from "@/lib/media";
import { GlobalContext } from "@/pages/_app";
import { Box, Container } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { motion } from "framer-motion";
import { centerFlex } from "@/lib/theme/sxUtils";
import Link from "next/link";
import Image from "next/image";
import HeaderMenuItems from "@/components/reusable/Layout/Header/HeaderMenuItems";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import Button from "@mui/material/Button";
import MobileMenu from "@/components/reusable/Layout/Header/MobileMenu";

interface IHeader {}
const Header: React.FC<IHeader> = () => {
  const isMobile = useIsMobile();
  const { logoLight } = useContext(GlobalContext);
  const logoData = getStrapiFullImageData(logoLight);

  const [isVisible, setIsVisible] = useState(true);
  const [shadowed, isShadowed] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    const value = currPos.y > prevPos.y || currPos.y > -101;
    setIsVisible(value);
    isShadowed(currPos.y === 0 ? false : true);
  });

  const logoMultiplicator = useMemo(() => {
    let multiplicator = 1;

    if (!logoData) {
      return multiplicator;
    }
    if (shadowed || isMobile) {
      multiplicator = 0.6;
    } else {
      multiplicator = 0.8;
    }
    return multiplicator;
  }, [shadowed, isMobile, logoData]);

  return (
    <Box
      component={motion.header}
      sx={{
        position: "sticky",
        width: "100%",
        top: 0,
        right: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.speedDial,
        backgroundColor: shadowed ? "secondary.light" : undefined,
        boxShadow: shadowed
          ? `0px 0px 15px 0px rgba(43, 37, 37, 0.07)`
          : undefined,
        transition: "box-shadow .3s ease, padding .3s ease",
        py: shadowed ? [0.8, 0.8, 1] : [1.7, 1.7, 2],
      }}
      animate={{ translateY: isVisible ? "0%" : "-100%" }}
      transition={{ type: "keyframes" }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [2, 2, 6],
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={logoData?.url}
              height={logoData?.height * logoMultiplicator}
              width={logoData?.width * logoMultiplicator}
              alt="inovatek logo"
              priority
            />
          </Link>
          {!isMobile && <HeaderMenuItems />}
          <Box>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/contact"
              sx={{
                textTransform: "none",
              }}
            >
              Vreau si eu!
            </Button>
            {isMobile && <MobileMenu />}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
