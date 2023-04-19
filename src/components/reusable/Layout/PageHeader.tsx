import MarkdownParser from "@/components/reusable/MarkdownParser";
import { centerFlex } from "@/lib/theme/sxUtils";
import { Box, Typography } from "@mui/material";

interface IPageHeader {
  title: string;
  description?: string;
}
const PageHeader: React.FC<IPageHeader> = ({ title, description }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: [2, 2, 4],
        mb: [3, 3, 6],
        ...centerFlex,
      }}
    >
      <Box
        sx={{
          width: "580px",
          maxWidth: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: [24, 24, 32],
            mb: description ? 2.5 : undefined,
          }}
        >
          <MarkdownParser>{title}</MarkdownParser>
        </Typography>
        {description && (
          <Typography
            variant="h3"
            sx={{
              fontSize: [17, 17, 18],
            }}
          >
            <MarkdownParser>{description}</MarkdownParser>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
