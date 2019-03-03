const convertCsvToObj = records => {
  const [properties, ...dataRows] = records;
  const objects = dataRows.map(row => {
    const convertedObj = row.reduce((obj, value, i) => {
      obj[properties[i]] = value;
      return obj;
    }, {});
    return convertedObj;
  });
  return objects;
};

const convertArrayToObjWithId = arr => {
  const result = arr.reduce((obj, item, i) => {
    if (item.id) {
      obj[item.id] = item;
    }
    return obj;
  }, {});
  if (Object.keys(result).length === 0) {
    return arr;
  } else {
    return result;
  }
};

module.exports = { convertCsvToObj, convertArrayToObjWithId };
