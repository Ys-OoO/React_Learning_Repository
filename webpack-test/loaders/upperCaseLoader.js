const loaderUtils = require('loader-utils')
/**
 * 
 * @param {string} content 
 * @returns 
 */
module.exports = function (content) {
  this.cacheable();
  const op = loaderUtils.getOptions(this);
  if (!op.key) {
    const obj = JSON.parse(content, (k, v) => {
      if (k) {
        return String(v).toLocaleUpperCase()
      } else {
        return v;
      }
    });
    return JSON.stringify(obj);
  }
  return content.toLocaleUpperCase();
}