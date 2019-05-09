import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Category',
  displayName: '分类'
});

model.assign({
  order: { n: '排序权重', type: 'Number', f: true, t: true, r: false, d: 0 }, //排序权重。
  name: { n: '中文分类名称', type: 'String',  f: true, t: true, r: true, p: '中文分类名称，用于在页面中展示。'}, //中文分类名称，用于在页面中展示。
  alias: { n: '英文分类别名', type: 'String', f: true, t: true, r: true, p: '英文分类别名，用于通过url访问分类列表。'}, //英文分类别名，用于通过url访问分类列表。
});

export default model;
