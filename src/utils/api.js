export const convertToCamelCase = (str) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1
      .toUpperCase()
      .replace(`-`, ``)
      .replace(`_`, ``);
  });
};

export const checkIsObject = (obj) => {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== `function`;
};

export const convertObjectKeys = (obj) => {
  if (checkIsObject(obj)) {
    const newObj = {};

    Object.keys(obj).forEach((item) => {
      newObj[convertToCamelCase(item)] = convertObjectKeys(obj[item]);
    });

    return newObj;
  } else if (Array.isArray(obj)) {
    return obj.map((item) => {
      return convertObjectKeys(item);
    });
  }

  return obj;
};
