import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configSite',
  displayName: '网站配置'
});

model.assign({
  // 元信息设置
  title: { n: '站点首页标题', type: 'String', f: true, t: true, r: true, p: '站点首页标题，一般不超过80个字符。' }, // 站点首页标题
  separator: { n: '站点标题分割符', type: 'String', f: true, t: false, r: true, p: '站点标题分割符' }, // 站点标题分割符
  subtitle: { n: '站点副标题', type: 'String', f: true, t: true, r: true, p: '站点副标题，位于标题分隔符后面。' }, // 站点副标题
  keywords: { n: '站点首页关键字', type: 'String', f: true, t: true, r: true, p: '站点首页关键字，一般不超过100个字符。' }, // 站点首页关键字
  favicon: { n: '站点图标地址', type: 'String', f: true, t: false, r: false, p: '请输入图标的网址'}, // 站点图标地址
  description: { n: '站点描述', type: 'String', f: true, t: true, r: false, p: '站点描述，一般不超过200个字符。', extra: {comType: 'textarea'}}, //首页描述元信息

  // 网站信息设置
  logo: { n: '站点logo地址', type: 'String', f: true, t: false, r: false, p: '网站logo的图片网址'}, //站点logo地址
  icp: { n: 'icp备案信息', type: 'String', f: true, t: false, r: false, p: '填写你在工信部的网址备案号，如果没有就留空' }, //icp备案信息
  weibo: { n: '微博地址', type: 'String', f: true, t: true, r: false, p: '微博地址'}, //微博地址
  email: { n: '邮箱地址', type: 'Email', f: true, t: true, r: false, p: '邮箱地址'}, //邮箱地址
  qq: { n: 'qq号', type: 'String', f: true, t: true, r: false, p: 'qq号'}, //qq号
  phone: { n: '电话号码', type: 'String', f: true, t: true, r: false, p: '电话号码'}, //电话号码
  about: { n: '关于网站', type: 'String', f: true, t: true, r: false, p: '关于网站，可填写网址的介绍，此文本用于展示。', extra: {comType: 'textarea'}}, //关于网站
  articleStatement: { n: '文章页声明', type: 'String', f: true, t: false, p: '文章底部的声明，此文本用于展示，支持html代码', r: false, extra: {comType: 'codeEdit', lang: 'html', height: '300px'}}, //文章页声明
  footHTML: { n: '网站底部代码', type: 'String', f: true, t: false, r: false, p: '网站地步代码，可以插入类似网站统计的js脚本。', extra: {comType: 'codeEdit', lang: 'html', height: '300px'}}, //网站底部代码

  // 二维码设置
  qrWxservice: { n: '客服微信二维码', type: 'String', f: true, t: true, r: false, p: '客服微信二维码的图片地址'}, // 客服微信二维码的图片地址
  qrWxpay: { n: '微信收款二维码', type: 'String', f: true, t: true, r: false, p: '微信收款二维码的图片地址'}, // 微信收款二维码的图片地址
  qrWxpub: { n: '微信公众号二维码', type: 'String', f: true, t: true, r: false, p: '微信公众号二维码的图片地址'}, // 微信公众号二维码的图片地址
  qrAlipay: { n: '支付宝收款二维码', type: 'String', f: true, t: true, r: false, p: '支付宝收款二维码的图片地址'}, // 支付宝收款二维码的图片地址
  qrUnionpay: { n: '银联云闪付收款二维码', type: 'String', f: true, t: true, r: false, p: '银联云闪付收款二维码的图片地址'}, // 银联云闪付收款二维码的图片地址
 
  // 开关配置信息
  boolWebReg: { n: '开启前台注册登录', type: 'Boolean', f: true, t: false, r: true, d: true, extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolWebRegEmail: { n: '邮箱注册登录', type: 'Boolean', f: true, t: false, r: true, d: true, extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolWebRegEmailActive: { n: '邮箱注册激活', type: 'Boolean', f: true, t: false, r: true, d: true, extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolWebRegPhone: { n: '手机注册登录', type: 'Boolean', f: true, t: false, r: true, d: false, extra: {comType: 'radio', options: 'true:开放,false:关闭'}}, //开放前台注册
  boolCommentLogin: { n: '登录才能评论', type: 'Boolean', f: true, t: false, r: true, d: false, extra: {comType: 'radio', options: 'true:必须登录,false:不必登录'}}, //必须登录.才能评论
  boolLoginVercode: { n: '注册登录验证码', type: 'Boolean', f: true, t: false, r: true, d: true, extra: {comType: 'radio', options: 'true:开启,false:关闭'}}, //开启登录注册验证码
  confEmailService: { n: '邮箱服务器', type: 'String', f: true, t: false, r: false, p: '填写邮箱服务器主机' }, // 邮箱服务器
  confEmailUser: { n: '邮箱服务账号', type: 'String', f: true, t: false, r: false, p: '填写邮箱服务账号'}, // 邮箱服务账号
  confEmailPass: { n: '邮箱服务密码', type: 'String', f: true, t: false, r: false, p: '填写邮箱服务密码' } // 邮箱服务密码
});

export default model;
