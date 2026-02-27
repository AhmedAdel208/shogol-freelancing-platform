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
    Pending: "قيد الانتظار",
    Open: "مفتوح",
    Completed: "مكتمل",
    InProgress: "قيد التنفيذ",
    Cancelled: "ملغى",
  };
  return map[status] || status;
};

/**
 * Formats a deadline string for HTML date input (YYYY-MM-DD)
 * @param deadline - The deadline string to format
 * @returns Formatted date string for HTML input or empty string if invalid
 */
export const formatDeadlineForInput = (
  deadline: string | undefined,
): string => {
  if (!deadline) return "";

  // Try to parse different date formats
  try {
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
      return deadline;
    }

    // Try to parse as Date object
    const date = new Date(deadline);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
    }
  } catch (error) {
    console.error("Error parsing deadline:", error);
  }

  return "";
};
