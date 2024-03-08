export const getMapPreview = (apiKey, lat, lng) => {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

  return imagePreviewURL;
};

export const getAddress = async (apiKey, lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }
  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
};
