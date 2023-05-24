import { setConsentCookie } from "@/utils/consentCookie";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

interface ICookieConsentBar {}
const CookieConsentBar: React.FC<ICookieConsentBar> = () => {
  const setConsentCookieValue = (value: boolean) => {
    setConsentCookie(value);
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.modal,
        borderTop: (theme) => `1px solid ${theme.palette.primary.light}`,
      }}
    >
      <Box
        sx={{
          width: "500px",
          maxWidth: "100%",
          m: "auto",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            Acest site utilizeaza 'cookies', pentru a vedea felul in care le
            utilizam puteti vizita{" "}
            <Link
              href={`/blog/termeni-si-conditii `}
              style={{ color: "inherit" }}
              target="_blank"
            >
              Termenii si conditiile
            </Link>
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 10,
              mt: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setConsentCookieValue(false)}
              size="large"
            >
              Refuz
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setConsentCookieValue(true)}
              size="large"
            >
              Accept
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CookieConsentBar;
