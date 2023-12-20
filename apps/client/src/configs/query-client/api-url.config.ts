export const API_URL = import.meta.env.VITE_APP_API_URL as string;
if (!API_URL) {
    throw new Error('Base URL cannot be null.');
}
