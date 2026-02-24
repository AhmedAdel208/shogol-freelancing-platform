/**
 * Date utility functions
 */

/**
 * Formats a date string in Arabic relative time
 * @param dateStr - The date string to format
 * @returns Arabic relative time string
 */
export const formatTimeAgo = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffInMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `منذ ${days} يوم`;
  if (hours > 0) return `منذ ${hours} ساعات`;
  if (minutes > 0) return `منذ ${minutes} دقيقة`;
  return "الآن";
};

/**
 * Maps status values to Arabic labels
 * @param status - The status string to map
 * @returns Arabic status label
 */
export const mapStatus = (status: string): string => {
  const map: Record<string, string> = {
    Pending: "مفتوح",
    Open: "مفتوح",
    Completed: "مكتمل",
    InProgress: "قيد التنفيذ",
    Cancelled: "ملغى",
  };
  return map[status] || status;
};
