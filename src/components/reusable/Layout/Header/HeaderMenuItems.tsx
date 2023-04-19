import headerMenu from "@/constants/headerMenu";
import useIsMobile from "@/lib/hooks/useIsMobile";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

interface IHeaderMenuItems {
  vertical?: boolean;
}
const HeaderMenuItems: React.FC<IHeaderMenuItems> = ({ vertical = false }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: isMobile || vertical ? "column" : undefined,
      }}
    >
      {headerMenu.map(({ url, name }) => {
        let active = false;
        if (url === "/") {
          active = currentRoute === "/" ? true : false;
        } else {
          active = currentRoute.includes(url);
        }

        return (
          <Button
            role="navigation"
            aria-label={name}
            component={Link}
            key={name}
            href={url}
            sx={{
              textDecoration: active ? "underline!important" : "none!important",
              textTransform: "none",
              fontWeight: 400,
            }}
          >
            {name}
          </Button>
        );
      })}
    </Box>
  );
};

export default HeaderMenuItems;
