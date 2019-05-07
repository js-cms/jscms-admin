import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configNotice',
  displayName: '公告'
});

model.assign({
  id: { n: 'id', type: 'String', f: false, t: true, r: false },
  isShow: { n: '是否广告', type: 'Boolean', f: true, t: true, r: true, d: false , extra: {comType: 'radio', options: 'true:是,false:否'} },
  title: { n: '公告标题', type: 'String', f: true, t: true, r: true }, //菜单顺序
  content: { n: '公告内容', type: 'String', f: true, t: true, r: true, extra: { comType: 'textarea'} }, //菜单名称
  createTime: { n: '创建时间', type: 'Timestamp',f: false, t: true }, //创建时间
  updateTime: { n: '更新时间', type: 'Timestamp', f: false, t: true } //更新时间
});

export default model;
