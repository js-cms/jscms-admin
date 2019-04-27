import modelman from 'modelman';

let model = new modelman.Model({
  name: 'robots',
  displayName: '爬虫协议'
});

model.assign({
  robots: { n: 'robots文件内容', type: 'String', f: true, t: false, r: true, extra: {comType: 'textarea', rows: 12}}, //robots.txt 内容
});

export default model;
