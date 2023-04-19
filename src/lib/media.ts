import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
  if (typeof media === "string") {
    return media;
  }

  let imageUrl = null;
  if (media && media.data && media.data.attributes) {
    if (media?.data?.attributes?.url?.startsWith("/")) {
      imageUrl = getStrapiURL(media.data.attributes.url).replace("/api/", "/");
    } else if (media?.data?.attributes?.url) {
      imageUrl = media?.data?.attributes?.url;
    } else {
      imageUrl = media.url;
    }
  }
  if (media?.attributes?.url) {
    imageUrl = getStrapiURL(media.attributes.url).replace("/api/", "/");
  }
  return imageUrl;
}
