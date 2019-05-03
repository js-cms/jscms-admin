import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configSite',
  displayName: '网站配置'
});

model.assign({
  title: { n: '标题元信息', type: 'String', f: true, t: true, r: true }, //首页标题
  subtitle: { n: '副标题元信息', type: 'String', f: true, t: true, r: true }, //副标题
  keywords: { n: '关键字元信息', type: 'String', f: true, t: true, r: true }, //首页关键字
  separator: { n: '标题分割符', type: 'String', f: true, t: false, r: true }, //标题分割符
  icp: { n: 'icp备案信息', type: 'String', f: true, t: false, r: false }, //icp备案信息
  logo: { n: '站点logo地址', type: 'String', f: true, t: false, r: false }, //站点logo地址
  favicon: { n: '站点图标地址', type: 'String', f: true, t: false, r: false }, //站点图标地址
  description: { n: '描述元信息', type: 'String', f: true, t: true, r: false, extra: {comType: 'textarea'}}, //首页描述元信息
  about: { n: '关于网站', type: 'String', f: true, t: true, r: false, extra: {comType: 'textarea'}}, //关于网站
  articleStatement: { n: '文章页声明', type: 'String', f: true, t: false, r: false, extra: {comType: 'codeEdit', lang: 'html', height: '200px'}}, //关于网站
  footHTML: { n: '网站底部代码', type: 'String', f: true, t: false, r: false, extra: {comType: 'codeEdit', lang: 'html', height: '200px'}}, //网站底部代码
  boolWebReg: { n: '前台注册登录', type: 'Boolean', f: true, t: false, r: true, d: true , extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolWebRegEmail: { n: '邮箱注册登录', type: 'Boolean', f: true, t: false, r: true, d: true , extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolWebRegEmailActive: { n: '邮箱注册激活', type: 'Boolean', f: true, t: false, r: true, d: true , extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolWebRegPhone: { n: '手机注册登录', type: 'Boolean', f: true, t: false, r: true, d: false , extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolCommentLogin: { n: '登录才能评论', type: 'Boolean', f: true, t: false, r: true, d: false, extra: {comType: 'radio', options: 'true:必须登录,false:不必登录'}}, //必须登录.才能评论
  boolLoginVercode: { n: '注册登录验证码', type: 'Boolean', f: true, t: false, r: true, d: true, extra: {comType: 'radio', options: 'true:开启,false:关闭'}}, //开启登录注册验证码
  emailConfService: { n: '邮箱服务器', type: 'String', f: true, t: false, r: false }, // 邮箱服务器
  emailConfUser: { n: '邮箱服务账号', type: 'String', f: true, t: false, r: false }, // 邮箱服务账号
  emailConfPass: { n: '邮箱服务密码', type: 'String', f: true, t: false, r: false } // 邮箱服务密码
});

export default model;
