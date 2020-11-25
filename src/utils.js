function snakeCase(text) {
  return text.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase());
}

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
