import MarkdownParser from "@/components/reusable/MarkdownParser";
import { getStrapiMedia } from "@/lib/media";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  SxProps,
  Theme,
} from "@mui/material";
import Link from "next/link";

interface IBlogCard {
  title: string;
  image?: object;
  description?: string;
  slug?: string;
  sx?: SxProps<Theme>;
}
const BlogCard: React.FC<IBlogCard> = ({
  title,
  description,
  image,
  sx,
  slug,
}) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      color="primary.main"
      elevation={2}
    >
      <CardActionArea
        component={Link}
        href={`/servicii/${slug}`}
        sx={{
          minHeight: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "inherit",
        }}
      >
        {imageUrl && (
          <CardMedia
            image={imageUrl}
            sx={{
              height: 220,
              display: "flex",
              alignItems: "flex-end",
              p: 1.5,
            }}
            title={`${title} graphic`}
          ></CardMedia>
        )}
        <CardHeader
          title={title}
          titleTypographyProps={{
            fontSize: [18, 18, 22],
          }}
        />
        {description && (
          <CardContent>
            <Box
              sx={{
                fontSize: "90%",
              }}
            >
              <MarkdownParser trimContent={100}>{description}</MarkdownParser>
            </Box>
          </CardContent>
        )}

        <CardActions
          sx={{
            mt: "auto",
          }}
        >
          <Button
            size="small"
            endIcon={<ArrowRightAltOutlined />}
            sx={{ ml: "auto" }}
          >
            Citeste mai mult
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
