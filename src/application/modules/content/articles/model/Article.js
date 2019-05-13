import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Article',
  displayName: '文章'
});

model.assign({
  status: { n: '文章状态', type: 'Number', f: true, t: true, r: true, d: 1, extra: {comType: 'select', options: '1:上线,2:下线'} }, // 文章状态 1:上线、2:下线
  topType: { n: '置顶方式', type: 'Number', f: true, t: true, r: true, d: 1, extra: {comType: 'select', options: '1:无置顶,2:主要置顶,3:次要置顶'} }, // 置顶方式 1、无置顶 2、主要置顶 3、次要置顶
  categoryId: { n: '所属分类', type: 'ObjectId', f: true, t: true, r: true, ref: 'Category', extra: {displayField: 'name', comType: 'select', options: 'categories'}}, //所属分类对象
  title: { n: '文章标题', type: 'String', f: true, t: true, r: true, p: '文章的标题。' }, //文章标题
  createTime: { n: '创建时间', type: 'Timestamp', f: true, t: true, r: true }, //创建时间
  updateTime: { n: '更新时间', type: 'Timestamp', f: true, t: true, r: true } //更新时间
});

export default model;
