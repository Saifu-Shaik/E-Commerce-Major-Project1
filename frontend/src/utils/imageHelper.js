export const getImageURL = (imagePath) => {
  if (!imagePath) return "/images/placeholder.png";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `https://e-commerce-major-project1-backend.onrender.com${imagePath}`;
};
