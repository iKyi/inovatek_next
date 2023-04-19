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

interface IProductCard {
  nume: string;
  descriere?: string;
  images?: { data?: Record<any, any>[] };
  order?: number;
  slug: string;
  sx?: SxProps<Theme>;
}
const ProductCard: React.FC<IProductCard> = ({
  nume,
  slug,
  descriere,
  images,
  order,
  sx,
}) => {
  const imageUrl = getStrapiMedia(images?.data?.[0]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      variant="outlined"
    >
      <CardActionArea
        component={Link}
        href={`/produse/${slug}`}
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
            title={`${nume} graphic`}
          ></CardMedia>
        )}
        <CardHeader
          title={nume}
          titleTypographyProps={{
            fontSize: [18, 18, 22],
          }}
        />
        {descriere && (
          <CardContent>
            <Box
              sx={{
                fontSize: "90%",
              }}
            >
              <MarkdownParser trimContent={100}>{descriere}</MarkdownParser>
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

export default ProductCard;
