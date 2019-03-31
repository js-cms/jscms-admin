<template>
  <div class="com-objectid">
    <div class="text" v-if="field.extra.displayField" >
      {{(!data[keyname] || data[keyname][field.extra.displayField] == null || data[keyname][field.extra.displayField] == '' || data[keyname][field.extra.displayField] == undefined) ? '无' : data[keyname][field.extra.displayField]}}
    </div>
    <div class="text" v-if="!field.extra" >
      {{data[keyname]._id  || '无' }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableComObjectid',
  props: ['data', 'field', 'keyname', 'index']
};
</script>
