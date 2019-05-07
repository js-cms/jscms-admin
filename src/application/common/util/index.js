let util = {}

/**
 * @description 为一个对象的已有属性的值进行填充。
 * @param {Object} target 对象
 * @param {Object} source 对象
 */
util.setData = function (target, source) {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const sourceVal = source[key];
      if (sourceVal) {
        target[key] = sourceVal;
      }
    }
  }
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  window.document.title = titleText;
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-menu-link'))
}

/**
 * 计算字符像素宽度
 */
util.textSize = function (fontSize, text) {
  let span = document.createElement("span");
  let result = {};
  span.innerText = text;
  result.width = span.offsetWidth;
  result.height = span.offsetHeight;
  span.style.visibility = "hidden";
  span.style.fontSize = fontSize;
  span.style.display = "inline-block";
  document.body.appendChild(span);
  result.width = span.offsetWidth;
  result.height =span.offsetHeight;
  span.parentNode.removeChild(span);
  return result;
}

export default util;

