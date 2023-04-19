import MarkdownParser from "@/components/reusable/MarkdownParser";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
import { getStrapiMedia } from "@/lib/media";
import { centerFlex } from "@/lib/theme/sxUtils";
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
import Image from "next/image";
import Link from "next/link";

interface IServiceCard {
  name: string;
  icon?: object;
  image?: object;
  description?: string;
  slug?: string;
  order?: number;
  sx?: SxProps<Theme>;
}
const ServiceCard: React.FC<IServiceCard> = ({
  name,
  description,
  icon,
  image,
  order,
  slug,
  sx,
}) => {
  const iconData = getStrapiFullImageData(icon);
  const imageUrl = getStrapiMedia(image);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
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
              height: 180,
              display: "flex",
              alignItems: "flex-end",
              p: 1.5,
            }}
            title={`${name} graphic`}
          >
            {iconData && (
              <Box
                sx={{
                  borderRadius: "100%",
                  boxShadow: `0px 0px 10px 3px rgba(0, 0, 0, 0.8)`,
                  ...centerFlex,
                }}
              >
                <Image
                  src={iconData.url}
                  alt={`${name} icon`}
                  height={iconData.height}
                  width={iconData.width}
                />
              </Box>
            )}
          </CardMedia>
        )}
        <CardHeader
          title={name}
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

export default ServiceCard;
