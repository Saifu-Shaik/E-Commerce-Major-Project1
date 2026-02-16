export const getImageURL = (image) => {
  // If empty image
  if (!image || image === "null") {
    return "https://dummyimage.com/500x500/eeeeee/000000&text=No+Image";
  }

  // If already full URL (Cloudinary, Imgur, etc.)
  if (typeof image === "string" && image.startsWith("http")) {
    return image;
  }

  // Otherwise just return as is
  return image;
};
