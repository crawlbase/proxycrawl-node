/**
 * Contains a set of generic functions used in different places.
 * @module utils
 */

/**
 * Turns a text into snake case.
 * @param {string} text The text to convert.
 * @returns {string} The text converted.
 */
function snakeCase(text) {
  return text.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase());
}

/**
 * Converts an object of headers to lower case.
 * @param {object} headers The headers to convert.
 * @returns {object} The converted object.
 */
function lowerHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers)) {
    result[key.toLowerCase()] = value;
  }
  return result;
}

module.exports = {
  snakeCase,
  lowerHeaders,
};
