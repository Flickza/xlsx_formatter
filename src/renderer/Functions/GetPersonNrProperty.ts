const GetPersonNrProperty = (a: { [index: string]: string }) => {
  let key;
  // Look through object keys and look for a key containing person|Person
  Object.keys(a).forEach((x) => {
    if (/^(person)|(Person)/g.test(x)) {
      key = x;
    }
  });
  // return key;
  return key;
};

export default GetPersonNrProperty;
