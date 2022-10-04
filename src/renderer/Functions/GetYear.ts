const GetYear = (fdato?: string, pnr?: string, def?: string) => {
  if (pnr === undefined || fdato === undefined || fdato === '' || pnr === '') {
    return def;
  }
  let year;
  // 1900 - 1999
  if (/^([0-4]\d\d)/g.test(pnr.toString().substring(0, 3))) {
    year = 19;
  }
  // 2000 - 2099
  if (/^([5-9]\d\d)/g.test(pnr.toString().substring(0, 3))) {
    year = 20;
  }
  return year;
};

export default GetYear;
