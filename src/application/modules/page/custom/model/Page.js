import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Page',
  displayName: '文章'
});

model.assign({
  title: { n: '页面标题', type: 'String', f: true, t: true, r: true }, //页面标题
  keywords: { n: '页面关键字', type: 'String', f: true, t: true, r: true  }, //页面关键字
  description: { n: '页面描述', type: 'String', f: true, t: true, r: true }, //页面描述
  name: { n: '页面名称', type: 'String', f: true, t: true, r: true  }, //页面名称
  alias: { n: '页面别名', type: 'String', f: true, t: true, r: true  }, //页面别名
  createTime: { n: '创建时间', type: 'Timestamp', f: true, t: true, r: true }, //创建时间
  updateTime: { n: '更新时间', type: 'Timestamp', f: true, t: true, r: true } //更新时间
});

export default model;
