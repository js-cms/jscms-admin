import _ from 'lodash';

/**
  * @description Jscms Table 类型
  */
export default class Table {

  /**
   * @description 构造函数
   */
  constructor(opts = {
    operation: {}
  }) {
    this.model = opts.model || {};
    this.list = opts.list || [];
    this.pagination = opts.pagination || {
      page: 1,
      size: 20,
      total: 0
    }
    let _operation = {
      edit: {
        btnClass: 'h-btn h-btn-s h-btn-primary',
        iClass: 'h-icon-edit',
        name: '编辑',
        click: function (data, index) {
          this.dialog.generalEdit.update({
            title: '编辑' + this.page.name,
            index: index,
            formData: data
          });
        }
      },
      delete: {
        btnClass: 'h-btn h-btn-s h-btn-red',
        iClass: 'h-icon-trash',
        name: '删除',
        click: function () {
          this.deleteData(data, index);
        }
      }
    }
    this.operation = _.merge(_operation, opts.operation);
    let editObj = this.operation.edit;
    let deleteObj = this.operation.delete;
    delete this.operation.edit;
    delete this.operation.delete;
    this.operation.edit = editObj;
    this.operation.delete = deleteObj;
  }
}
