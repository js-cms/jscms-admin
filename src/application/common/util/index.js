let util = {}

/**
 * @description 为一个对象的已有属性的值进行填充。
 * @param {Object} target 对象
 * @param {Object} source 对象
 */
util.setData = function (target, source) {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const element = target[key];
      const sourceVal = source[key];
      if ( sourceVal ) {
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

export default util
