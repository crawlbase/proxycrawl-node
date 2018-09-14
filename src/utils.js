function snakeCase(text) {
  return text.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase());
}

module.exports = {
  snakeCase
};
