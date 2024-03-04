export const getMapPreview = (apiKey, lat, lng) => {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

  return imagePreviewURL;
};
