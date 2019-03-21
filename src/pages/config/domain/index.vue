<template>
  <d2-container v-loading="loading">
    <template slot="header">域名配置</template>
    <el-form v-for="(domain, index) in configObj.info.domains" :key="index" :inline="true" :model="domain">
      <el-form-item label="协议">
        <el-input style="width: 100px" v-model="domain.protocol" placeholder="输入协议"></el-input>
      </el-form-item>
      <el-form-item label="域名">
       <el-input style="width: 300px" v-model="domain.host" placeholder="输入域名"></el-input>
      </el-form-item>
      <el-form-item label="端口">
       <el-input style="width: 100px"  v-model="domain.port" placeholder="输入端口"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" round @click="deleteItem(index)">删除</el-button>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="success" @click="saveData()">保存</el-button>
      <el-button type="primary" @click="newDomain()">增加一条</el-button>
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
  name: 'domainIndex',
  data () {
    return {
      loading: true,
      configObj: {
        _id: "",
        info: {
          domains: [
            new Domain()
          ]
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {

    newDomain () {
      this.configObj.info.domains.push(new Domain())
    },

    deleteItem (index) {
      if ( this.configObj.info.domains.length === 1 ) {
         this.$message.error("请至少保留一条")
      } else {
        this.configObj.info.domains.splice(index, 1)
      }
    },

    async getData () {
      let res = await req.get('/api/config?alias=domainBase')
      this.configObj = res.data.data
      this.loaded()
    },

    async saveData () {
      let res = await req.post('/api/config', this.configObj)
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
