import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configNotice',
  displayName: '公告'
});

model.assign({
  id: { n: 'id', type: 'String', f: true, t: true, r: true },
  title: { n: '公告标题', type: 'String', f: true, t: true, r: true }, //菜单顺序
  content: { n: '公告内容', type: 'String', f: true, t: true, r: true } //菜单名称
});

export default model;
