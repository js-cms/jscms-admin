/**
  * @description Jscms Table 类型
  */
export default class Table {

  /**
   * @description 构造函数
   */
  constructor(opts = {}) {
    this.model = opts.model || {};
    this.list = opts.list || [];
    this.pagination = opts.pagination || {
      page: 1,
      size: 20,
      total: 0
    }
  }
}
