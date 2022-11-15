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

export const convertSimpleDate = (date) => {
  const dates = new Date(date);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dates);
  return formattedDate;
};

export const convertDateObj = (date) => {
  // const dates = new Date(date);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
  return formattedDate;
};
