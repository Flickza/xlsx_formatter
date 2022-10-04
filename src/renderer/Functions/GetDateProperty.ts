const GetDateProperty = (a: { [index: string]: string }) => {
  let property;
  if (Object.prototype.hasOwnProperty.call(a, 'ddmmyy')) {
    property = 'ddmmyy';
  }
  if (Object.prototype.hasOwnProperty.call(a, 'Fødselsdato (ddmmyyyy)')) {
    property = 'Fødselsdato (ddmmyyyy)';
  }
  return property;
};

export default GetDateProperty;
