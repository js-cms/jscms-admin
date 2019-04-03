import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Article',
  displayName: '文章'
});

model.assign({
  topType: { n: '置顶方式', type: 'Number', f: true, t: true, r: true, d: 0, extra: {comType: 'select', options: '0:无置顶,1:主要置顶,2:次要置顶'}}, //置顶方式 0、无置顶 1、主要置顶 2、次要置顶
  categoryId: { n: '所属分类', type: 'ObjectId', f: true, t: true, r: true, ref: 'Category', extra: {displayField: 'name', comType: 'select', options: 'categories'}}, //所属分类对象
  title: { n: '文章标题', type: 'String', f: true, t: true, r: true, p: '文章的标题。' }, //文章标题
  createTime: { n: '创建时间', type: 'Timestamp', f: true, t: true, r: true }, //创建时间
  updateTime: { n: '更新时间', type: 'Timestamp', f: true, t: true, r: true } //更新时间
});

export default model;
