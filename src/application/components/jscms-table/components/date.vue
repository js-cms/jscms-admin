<template>
<div class="com-date">
  {{data[keyname] ? moment(data[keyname]).format("YYYY-MM-DD HH:mm:ss") : '无'}}
</div>
</template>
<script>
import moment from 'moment';

export default {
  name: "TableComDate",
  props: ['data', 'field', 'keyname', 'index'],
  data() {
    return {
      moment: moment
    }
  }
};
</script>
