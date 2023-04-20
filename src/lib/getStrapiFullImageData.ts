import { getStrapiMedia } from "@/lib/media";

const getStrapiFullImageData = (data: any) => {
  const widthValue = data?.data?.attributes?.width ?? data?.attributes?.width;

  if (!widthValue) {
    return null;
  }
  return {
    width: data?.attributes?.width ?? data?.data?.attributes?.width,
    height: data?.attributes?.height ?? data?.data?.attributes?.height,
    url: getStrapiMedia(data),
  };
};
export default getStrapiFullImageData;
