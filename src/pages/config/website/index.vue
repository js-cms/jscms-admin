<template>
  <d2-container v-loading="loading">
    <template slot="header">网站配置</template>
    <div class="form">
      <el-form ref="form" :model="websiteObj.info" label-width="120px">
        <el-form-item label="首页标题">
          <el-input v-model="websiteObj.info.title" placeholder="一般不超过80个字符"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="websiteObj.info.subtitle" placeholder="一般不超过80个字符"></el-input>
        </el-form-item>
        <el-form-item label="首页关键字">
          <el-input v-model="websiteObj.info.keywords" placeholder="请用英文逗号分割，一般不超过100个字符"></el-input>
        </el-form-item>
        <el-form-item label="标题分割符">
          <el-input v-model="websiteObj.info.separator" placeholder="如：- "></el-input>
        </el-form-item>
        <el-form-item label="icp备案信息">
          <el-input v-model="websiteObj.info.icp"></el-input>
        </el-form-item>
        <el-form-item label="站点logo地址">
          <el-input v-model="websiteObj.info.logo"></el-input>
        </el-form-item>
        <el-form-item label="站点图标地址">
          <el-input v-model="websiteObj.info.favicon"></el-input>
        </el-form-item>
        <el-form-item label="首页描述">
          <el-input type="textarea" :rows="4" v-model="websiteObj.info.description" placeholder="一般不超过200个字符"></el-input>
        </el-form-item>
        <el-form-item label="关于网站">
          <el-input type="textarea" :rows="5" v-model="websiteObj.info.about" placeholder="关于网站/网站介绍，不限字符数量，一般显示在主题模版底部或者侧边栏"></el-input>
        </el-form-item>
        <el-form-item label="网站底部代码">
          <el-input type="textarea" :rows="4" v-model="websiteObj.info.footHTML"></el-input>
        </el-form-item>
        <div class="title">
          友情链接管理：
        </div>
        <el-collapse>
          <el-collapse-item 
            v-for="(link, index) in websiteObj.info.friendLinks"
            :title="link.name"
            :name="index"
            :key="index"
          >
              <el-form-item label="链接名称">
                <el-input  v-model="link.name" placeholder="输入链接名称"></el-input>
              </el-form-item>
              <el-form-item label="logo">
                <el-input  v-model="link.logo" placeholder="logo地址"></el-input>
              </el-form-item>
              <el-form-item label="链接url">
                <el-input  v-model="link.url" placeholder="输入链接url"></el-input>
              </el-form-item>
              <el-form-item label="操作">
                <el-button type="danger" @click="websiteObj.info.friendLinks.splice(index, 1)">删除此链接</el-button>
              </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-form-item label="操作" style="margin-top: 30px;" >
          <el-button type="primary" @click="websiteObj.info.friendLinks.push({name:'新链接',logo:'',url:''})">新增链接</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template slot="footer">
      <el-button type="success" @click="saveData()">保存</el-button>
    </template>
  </d2-container>
</template>

<script>
import { req } from '@/api/request'

class Domain {
  constructor () {
    this.protocol = 'http'
    this.host = ''
    this.port = '80'
  }
}

export default {
  name: 'websiteIndex',
  data () {
    return {
      loading: true,
      websiteObj: {
        _id: "",
        info: {}
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {

    deleteItem (index) {
      if ( this.configObj.info.domains.length === 1 ) {
         this.$message.error("请至少保留一条")
      } else {
        this.configObj.info.domains.splice(index, 1)
      }
    },

    async getData () {
      let res = await req.get('/api/config?alias=website')
      this.websiteObj = res.data.data
      this.loaded()
    },

    async saveData () {
      let res = await req.post('/api/config', this.websiteObj)
      if ( res.data.code === 0 ) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    },

    loaded() {
      setTimeout(()=>{
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 10px;
}
.form {
  width: 70%;
}
</style>
