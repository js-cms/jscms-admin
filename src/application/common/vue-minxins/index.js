import { Request } from '@/application/common/request/index.js';

export default {
  data: function () {
    return {
      containerLoading: false,
      req$: Request(this)
    }
  }
}
