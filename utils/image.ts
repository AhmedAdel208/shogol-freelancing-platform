export const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

export const getImageUrl = (url: string | null | undefined, fallback = DEFAULT_AVATAR): string => {
  if (!url || url.trim() === "") {
    return fallback;
  }

  const backLink = "https://shogol.runasp.net";
  
  let finalUrl = url;

  // 1. If it's localhost, swap to production
  if (url.includes("localhost")) {
    finalUrl = url.replace(/https?:\/\/localhost:\d+/, backLink);
  }
  // 2. Relative URLs
  else if (!url.startsWith("http")) {
    finalUrl = url.startsWith("/") ? `${backLink}${url}` : `${backLink}/${url}`;
  }

  // 3. Proxy to avoid CORS/Mixed Content
  if (finalUrl.includes("runasp.net")) {
    return `/api/image-proxy?url=${encodeURIComponent(finalUrl)}`;
  }

  return finalUrl;
};
