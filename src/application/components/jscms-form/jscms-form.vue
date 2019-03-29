<template>
  <div class="jscms-form">
    
  </div>
</template>
<script>
import modelman from 'modelman';

export default {
  props: ['data', 'parent'],
  data() {
    return {
      modelman: modelman,
    };
  },

  watch: {
    data: {
      handler: function() {
        this.parse();
      },
      deep: true
    }
  },

  mounted() {
    this.parse();
  },

  methods: {
    parse() {
    }
  }
};
</script>

<style lang="less" scoped>
</style>
