const parse = require("date-fns/parse");
const addDays = require("date-fns/addDays");

module.exports = (value, format, base) => {
  if (/\d+/.test(value)) {
    return addDays(new Date(1900, 0, 1), value - 2);
  }
  return parse(value, format, base);
};
