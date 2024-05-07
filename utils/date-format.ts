import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const formatUTC = (date: Date | undefined) => {
  try {
    if (!dayjs(date ? date : "").isValid()) return undefined;

    return dayjs(date).utc().format();
  } catch {
    return undefined;
  }
};

export const formatKST = (date: Date | undefined, format?: string) => {
  try {
    let formatDate = dayjs(date ? date : "");
    if (!formatDate.isValid()) return undefined;

    return formatDate.tz().format(format ? format : "YYYY.MM.DD HH:mm:ss");
  } catch {
    return undefined;
  }
};

// "YYYYMMDD" => Date
export function formatStringToDate(dateString: string) {
  const year = parseInt(dateString?.slice(0, 4));
  const month = parseInt(dateString?.slice(4, 6));
  const day = parseInt(dateString?.slice(6, 8));

  const convertedDate = new Date(year, month - 1, day);
  return convertedDate;
}
