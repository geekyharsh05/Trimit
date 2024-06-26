export default function generateShortUrl() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const length = 6; // Length of the generated short URL
  let result = "";

  for (let i = 0; i < length; i++) {
    // Generate a random index within the range of the characters string
    const randomIndex = Math.floor(Math.random() * chars.length);

    // Append the character at the randomly generated index to the result
    result += chars.charAt(randomIndex);
  }
  return result;
}
