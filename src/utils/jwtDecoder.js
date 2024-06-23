export function decodeJWT(jwtToken) {
  const base64Url = jwtToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decodedPayload = JSON.parse(atob(base64));
  return decodedPayload;
}
