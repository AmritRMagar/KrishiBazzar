const IP_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;
const PORT = 3000;

export const BASE_URL = `http://${IP_ADDRESS}:${PORT}`;
export const BASE_API_URL = `${BASE_URL}/api`;
export const IMAGE_URL = `${BASE_URL}/uploads/`;