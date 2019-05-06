import { Request } from '@/application/common/request/index.js';
import storejs from 'store';
import modelman from 'modelman';

export default {
  data: function () {
    return {
      containerLoading: true,
      req$: Request(this)
    }
  },
  methods: {
    async fetchModel$(displayName, modelName, callback, pretreatment) {
      let res = await this.req$.get(`/api/back/model?name=${modelName}`);
      let model = new modelman.Model({
        name: modelName[0].toUpperCase() + modelName.substr(1),
        displayName: displayName
      });
      if ( res.code > 0 ) {
        this.$Message({
          text: res.msg,
          type: 'error'
        });
      } else {
        if (res.data.model) {
          if(typeof pretreatment === 'function') {
            pretreatment(res.data.model);
          }
          model.assign(res.data.model);
          if (typeof callback === "function") {
            callback(model);
          }
        } else {
          if (typeof callback === "function") {
            callback(false);
          }
        }
      }
    },

    logout$ () {
      storejs.remove('token');
      storejs.remove('uuid');
      storejs.remove('userInfo');
      this.$router.replace({ name: 'Login' });
    },

    log(...argv) {
      console.log(...argv);
    }
  }
}
