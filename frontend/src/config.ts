export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API = (path: string) => `${API_BASE_URL}${path}`;

const isAbsoluteURL = (url: string) => /^(?:https?:)?\/\//i.test(url);

export const normalizeImageUrl = (url: string) => {
  if (!url) return url;
  if (isAbsoluteURL(url)) return url;
  if (url.startsWith('/uploads/')) {
    return `${API_BASE_URL}${url}`;
  }
  if (url.startsWith('uploads/')) {
    return `${API_BASE_URL}/${url}`;
  }
  return url;
};
