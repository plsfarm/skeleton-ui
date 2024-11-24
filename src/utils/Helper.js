import numeral from "numeral";


export const formatSmall = (val, format) => {
  if (val * 1 === 0) {
    return numeral(0).format(format);
  }
  if (val * 1 < 1e-6) {
    return "~0";
  }
  return numeral(val).format(format);
};

