<template>
  <div class="com-text">
    <div class="text" v-if="field.extra.displayField" >
      {{(!data[keyname] || data[keyname][field.extra.displayField] == null || data[keyname][field.extra.displayField] == '' || data[keyname][field.extra.displayField] == undefined) ? '无' : data[keyname][field.extra.displayField]}}
    </div>
    <div class="text" v-if="!field.extra.displayField">
      {{data[keyname] === '' || data[keyname] === undefined ? '无' : JSON.stringify(data[keyname])}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableComObject',
  props: ['data', 'field', 'keyname', 'index']
};
</script>
