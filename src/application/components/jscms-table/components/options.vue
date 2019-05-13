<template>
  <div class="com-options">
    <div class="text" >
      {{name}}
    </div>
  </div>
</template>
<script>
import Select from '@/application/components/jscms-form/Select.js';

export default {
  name: 'TableComObjectid',
  props: ['data', 'field', 'keyname', 'index'],
  data: function() {
    return {
      name: ''
    }
  },
  mounted() {
    this.getOptionName();
  },
  methods: {
    getOptionName() {
      let name = '';
      let select = new Select(this.field.extra.options);
      select.options.forEach(i => {
        if (i.key == this.data[this.keyname]) {
          name = i.title;
        }
      });
      this.name = name;
    }
  },
};
</script>
