import _ from 'lodash';
import crud from '@/application/common/curd/index.js';

/**
  * @description GeneralEdit 通用表单弹窗。
  */
export default class GeneralEdit {

  /**
   * @description 构造函数
   */
  constructor(vueComponentInstance, opts = {}) {
    this.parent = vueComponentInstance;
    this.isShow = false;
    this.me = this;

    this.title = opts.title || '编辑';
    this.form = opts.form || '';
    this.width = opts.width || 700;
    if (typeof opts.create === 'function') {
      this._create = opts.create;
      this._create.isExternal = true;
    }
    if (typeof opts.update === 'function') {
      this._update = opts.update;
      this._update.isExternal = true;
    }
  }

  /**
   * @description 显示Dialog
   */
  _show(data = {}, type = 'create') {
    //合并对象
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];
        this[key] = value;
      }
    }
    this._type = type;
    this.isShow = true;
  }

  /**
   * @description 显示Dialog
   */
  create(data = {}) {
    this._show(data, 'create');
    this.form.reset({formField: true});
  }

  /**
   * @description 显示Dialog
   */
  update(data = {}) {
    if (data.formData) {
      this.form.setData(data.formData);
    }
    if (data.index) {
      this.index = data.index || 0;
    }
    this._show(data, 'update');
  }

  /**
   * @description 关闭事件
   */
  onClose() {
    this.isShow = false;
  }

  /**
   * @description 取消事件
   */
  onCancel() {
    this.isShow = false;
  }

  /**
   * 默认新建方法
   */
  _create(formData, form) {
    let json = form.to.json({formField: true});
    crud(form.model.name, 'create', {
      data: json
    }).then((res) => {
      if ( res.result.length ) {
        this.$Message({
          type: 'success',
          text: form.model.displayName + '创建成功'
        });
        this.reload();
      } else {
        this.$Message({
          type: 'error',
          text: form.model.displayName + '创建失败'
        });
      }
    });
  }

  /**
   * 默认更新方法
   */
  _update(formData, form, index) {
    let json = form.to.json({formField: true});
    let id = this.formData._id;
    crud(form.model.name, 'update', {
      query: {
        _id: id
      },
      data: json
    }).then((res) => {
      if ( res.result.length || res.result.ok === 1) {
        this.parent.$Message({
          type: 'success',
          text: form.model.displayName + '修改成功'
        });
        this.parent.reload();
      } else {
        this.parent.$Message({
          type: 'error',
          text: form.model.displayName + '修改失败'
        });
      }
    });
  }

  /**
   * @description 确认事件
   */
  onConfirm(form, index) {
    let res = form.validator.all();
    if (res.length > 0) {
      this.parent.$Message({
        type: 'error',
        text: res[0].displayName + '的格式不正确且不能为空'
      });
      return;
    }
    if (this._type === 'create') {
      if (typeof this._create === 'function') {
        if ( this._update.isExternal === true ) {
          this._update.call(this.parent, this.formData, form);
        } else {
          this._update.call(this, this.formData, form);
        }
        this.onClose();
      }
    } else if (this._type === 'update') {
      if (typeof this._update === 'function') {
        if ( this._update.isExternal === true ) {
          this._update.call(this.parent, this.formData, form, index);
        } else {
          this._update.call(this, this.formData, form, index);
        }
        this.onClose();
      }
    }
  }
}
