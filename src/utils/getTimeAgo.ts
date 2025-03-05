import dayjs from "dayjs";
import "dayjs/locale/bn"; // Ensure the locale is properly imported
dayjs.locale("bn");

const getTimeAgo = (date) => {
  const currentDate = dayjs();
  const diffInSeconds = currentDate.diff(date, "second");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = currentDate.diff(date, "minute");
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = currentDate.diff(date, "hour");
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = currentDate.diff(date, "day");
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  // Use dayjs for formatting the date
  return dayjs(date).format("YYYY-MM-DD");
};

export default getTimeAgo;