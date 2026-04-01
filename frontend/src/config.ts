// ใช้ relative path เพื่อให้ทุก request ผ่าน Vite proxy → Go backend
// ในโหมด production ให้ตั้ง VITE_API_BASE_URL ใน .env.production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const API = (path: string) => `${API_BASE_URL}${path}`;

const isAbsoluteURL = (url: string) => /^(?:https?:)?\/\//i.test(url);

export const normalizeImageUrl = (url: string) => {
  if (!url) return url;
  if (isAbsoluteURL(url)) return url;
  // ใน dev mode ใช้ relative path ผ่าน Vite proxy
  if (url.startsWith('/uploads/')) {
    return url; // Vite proxy จะส่งต่อไป backend เอง
  }
  if (url.startsWith('uploads/')) {
    return `/${url}`;
  }
  return url;
};
