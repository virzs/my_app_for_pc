export const renderEmptyToBarre = (value: any) => {
  if (value instanceof Array) {
    if (value.length === 0) {
      return "-";
    }
    return value;
  } else if (["", null, undefined].includes(value)) {
    return "-";
  }
  return value;
};
