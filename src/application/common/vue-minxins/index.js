import { Request } from '@/application/common/request/index.js';
import modelman from 'modelman';

export default {
  data: function () {
    return {
      containerLoading: true,
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
      if (res.data.model) {
        model.assign(res.data.model);
        if (typeof callback === "function") {
          callback(model);
        }
      } else {
        if (typeof callback === "function") {
          callback(false);
        }
      }
    },

    log(...argv) {
      console.log(...argv);
    }
  }
}
