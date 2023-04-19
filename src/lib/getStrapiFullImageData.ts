import { getStrapiMedia } from "@/lib/media";

const getStrapiFullImageData = (data: any) => {
  if (!data?.data?.attributes?.width && !data.attributes.height) {
    return null;
  }
  return {
    width: data?.attributes?.width ?? data.data.attributes.width,
    height: data?.attributes?.height ?? data.data.attributes.height,
    url: getStrapiMedia(data),
  };
};
export default getStrapiFullImageData;
