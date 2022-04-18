const { DateTime } = require("luxon");

const fromJSTimeToLocale = function (jsTime) {
  if (!jsTime) return null;
  return DateTime.fromJSDate(jsTime).toLocaleString({
    Date: DateTime.DATE_FULL,
  });
};

module.exports = {
  // Convert time
  fromJSTimeToLocale,
};
