<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">网站配置项</span>
      </div>
      <div class="h-panel-body">
        <Row>
          <Cell width="12" >
            <Form
              :label-width="150"
              :model="from.fields"
              ref="form"
              showErrorTip
            >
              <template v-for="(f, key, index) in from.fields" >
                <FormItem :label="f.displayName" prop="input" v-if="!f.extra.comType" :key="index">
                  <input :name="f.name" type="text" v-model="f.value" >
                </FormItem>
                <FormItem :label="f.displayName" prop="input" v-if="f.extra.comType==='textarea'" :key="index">
                  <textarea :name="f.name" v-model="f.value" rows=4 ></textarea>
                </FormItem>
              </template>
              <FormItem>
                <Button color="primary" :loading="isLoading" @click="submit">提交</Button>
              </FormItem>
            </Form>
          </Cell>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import site from './model/Site';
console.log(site.fields);

export default {
  data() {
    return {
      mode: 'single',
      from: site,
      param1: ['美金', '人民币', '卢布'],
      isLoading: false
    };
  },
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Message('验证成功');
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    reset() {
      this.isLoading = false;
      this.$refs.form.reset();
    },
    add() {
      this.data.inputs.push({ value: '' });
    },
    remove(index) {
      this.data.inputs.splice(index, 1);
    }
  }
};
</script>

<style lang="less">
.basic-form-vue {
  .h-panel-body {
    padding-right: 60px;
  }
}
</style>