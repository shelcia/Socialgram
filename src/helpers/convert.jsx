export const convertDate = (date) => {
  const dates = new Date(date);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(dates);
  return formattedDate;
};
