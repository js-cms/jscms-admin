<template>
  <div class="com-text">
    <div class="text">
      {{data[keyname] === '' || data[keyname] === undefined ? '无' : data[keyname]}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableComText',
  props: ['data', 'field', 'keyname', 'index']
};
</script>
