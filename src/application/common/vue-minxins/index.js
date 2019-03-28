import { Request } from '@/application/common/request/index.js';
import modelman from 'modelman';

// model.assign({
//   protocol: { n: '协议', type: 'String', f: true, t: true, r: true }, //协议
//   host: { n: '域名', type: 'String', f: true, t: true, r: true }, //域名
//   port: { n: '端口', type: 'Number', f: true, t: true, r: true } //端口
// });

// export default model;

export default {
  data: function () {
    return {
      containerLoading: false,
      req$: Request(this)
    }
  },
  methods: {
    async fetchModel$(displayName, modelName, callback) {
      let res = await this.req$.get(`/api/model?name=${modelName}`);
      let model = new modelman.Model({
        name: modelName[0].toUpperCase() + modelName.substr(1),
        displayName: displayName
      });
      model.assign(res.data.model);
      if (typeof callback === "function") {
        callback(model);
      }
    }
  }
}
