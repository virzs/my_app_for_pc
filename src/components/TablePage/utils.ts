import { format, isValid, parseISO } from "date-fns";

export const renderEmptyToBarre = (value: any) => {
  if (value instanceof Array) {
    if (value.length === 0) {
      return "-";
    }
    return value;
  } else if (["", null, undefined].includes(value)) {
    return "-";
  }
  return isValid(parseISO(value))
    ? format(value, "yyyy-MM-dd HH:mm:ss")
    : value;
};
