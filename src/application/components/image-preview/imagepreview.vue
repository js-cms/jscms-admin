<template>
  <div class="h-image-preview-list" :style="listStyles">
    <div
      :style="itemStyles(data)"
      v-for="(data, index) of datas"
      :key="index"
      @click="click(index, data)"
      class="h-image-preview-item"
    >
      <i class="icon h-icon-error" @click.stop="$emit('close', index)"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hImagePreview',
  props: {
    width: {
      type: Number,
      default: 60
    },
    distance: {
      type: Number,
      default: 10
    },
    datas: {
      type: [Array],
      default: () => []
    },
    borderRadius: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
    };
  },
  methods: {
    click(index, value) {
      this.$emit('click', index, value);
    },
    itemStyles(data) {
      return {
        height: `${this.width}px`,
        width: `${this.width}px`,
        'margin-right': `${this.distance}px`,
        'margin-bottom': `${this.distance}px`,
        'border-radius': `${this.borderRadius}px`,
        'background-image': `url(${data.thumbUrl || data.url})`
      };
    }
  },
  computed: {
    listStyles() {
      return {
        'margin-right': `-${this.distance}px`,
        'margin-bottom': `-${this.distance}px`
      };
    }
  }
};
</script>

<style lang="less" scoped>
@import (less) './imagepreview.less';

.h-image-preview-item {
  .icon {
    position: relative;
    display: block;
    left: calc(100% - 12px);
    top: -5px;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s;
    &::before {
      color: red;
      border-radius: 50%;
      background-color: #fff;
    }
  }
  &:hover {
    .icon {
      opacity: 1;
    }
  }
}
</style>
