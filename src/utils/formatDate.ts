/* eslint-disable no-console */
 import { format, parseISO } from "date-fns";

export const formatDate = (date: string) => {
  if (!date) return "";

  try {
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, "yyyy-MM-dd");
    return formattedDate;
  } catch (error) {
    console.error("Invalid date format:", date, error);
    return "";
  }
};

export const formatMonthYear = (date: string) => {
  if (!date) return "";

  try {
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, "MMMM yyyy");
    return formattedDate;
  } catch (error) {
    console.error("Invalid date format:", date, error);
    return "";
  }
};

export const formatFullDate = (date: string) => {
  if (!date) return "";

  try {
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, "d, MMM yyyy");
    return formattedDate;
  } catch (error) {
    console.error("Invalid date format:", date, error);
    return "";
  }
};

export const formattedTime = (date: string) => {
  if (!date) return "";

  try {
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, "h:mm a");
    return formattedDate;
  } catch (error) {
    console.error("Invalid date format:", date, error);
    return "";
  }
};

// export const newsDates = (event: EventData) => {
//   const formattedDates =
//     format(new Date(event?.eventDate), "dd MMMM, yyyy") || "N/A";
//   return formattedDates;
// };
