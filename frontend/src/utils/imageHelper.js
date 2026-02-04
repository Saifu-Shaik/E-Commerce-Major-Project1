export const getImageURL = (imagePath) => {
  // If no image, return placeholder
  if (!imagePath) return "/images/placeholder.png";

  // If backend already sends a full URL, use it directly
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Otherwise, prefix with your backend URL
  const BACKEND_URL = "https://e-commerce-major-project1-backend.onrender.com";

  // Ensure no double slashes
  return `${BACKEND_URL}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
};
