<template>
  <d2-container v-loading="loading">
    <template slot="header">
      <span>{{ id ? '修改' : '新建' }}文章</span>
      <el-button type="primary" size="mini" style="float: right" @click="saveData()">{{ id ? '保存' : '发布' }}</el-button>
    </template>
    <div clsss="filter-warp">
      <el-form :model="article" label-width="130px">
        <el-form-item label="文章分类">
          <el-select v-model="article.categoryId" placeholder="选择文章分类">
            <el-option :label="category.name" :value="category.id" v-for="(category, i) in categoryList" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="article.type" placeholder="选择文章类型">
            <el-option :label="type.name" :value="type.id" v-for="(type, i) in typeOptions" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-input v-model="article.poster" placeholder="填写文章封面地址"></el-input>
        </el-form-item>
        <el-form-item :label="'文章标题('+ article.title.length +')'">
          <el-input v-model="article.title" placeholder="填写文章标题"></el-input>
        </el-form-item>
        <el-form-item :label="'文章关键字('+ article.keywordsStr.length +')'">
          <el-input v-model="article.keywordsStr" placeholder="填写文章关键字"></el-input>
        </el-form-item>
        <el-form-item :label="'文章描述('+ article.description.length +')'">
          <el-input type="textarea" :rows="5" v-model="article.description" placeholder="填写文章描述/摘要"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="article.mdContent!==undefined">
      <d2-mde
        v-model="article.mdContent"
        class="mde"/>
      <el-card shadow="never" class="d2-card">
        <d2-markdown :source="article.mdContent"/>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request"
import store from 'store'

export default {
  name: "articleEdit",
  data() {
    return {
      loading: true,
      categoryList: [],
      typeOptions: [{
        id: 1,
        name: "单封面"
      }, {
        id: 2,
        name: "多封面"
      }],
      article: {
        categoryId: "",
        type: 1,
        poster: "",
        title: "",
        keywordsStr: "",
        keywords: [],
        description: "",
        mdContent: undefined
      },
      id: this.$route.query.id || ""
    }
  },
  watch: {
    article: {
      handler() {
        if (this.article ) {
          if ( this.article.title ||
            this.article.keywordsStr ||
            this.article.keywords.length ||
            this.article.description ||
            this.article.mdContent
          ) {
            console.log("save", this.article);
            store.set("draft-article", this.article)
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getCategory(() => {
      let draftArticle = store.get("draft-article")
      if ( draftArticle == undefined || draftArticle == null || draftArticle == '' ) {
        draftArticle = this.article
      }
      if (this.id) {
        if ( this.id === draftArticle._id ) {
          this.fill(draftArticle)
        } else {
          this.getData()
        }
      } else {
        if ( draftArticle ) {
          this.fill(draftArticle)
        }
        if ( this.article.mdContent === undefined ) {
          this.article.mdContent = "";
          this.loaded()
        }
      }
    })
  },
  methods: {
    async getData() {
      let res = await req.get(`/api/article?id=${this.id}`)
      res.data.data.keywordsStr = res.data.data.keywords.join(',')
      let article = res.data.data
      this.fill(article)
      this.loaded()
    },

    fill(article) {
      this.article = article
      this.loaded()
    },

    validate() {
      if ( this.article.categoryId === "" ) {
        this.$message.error("请选择文章分类")
        return false
      }
      if ( this.article.type === "" ) {
        this.$message.error("请选择文章类型")
        return false
      }
      if ( this.article.title === "" ) {
        this.$message.error("请填写文章标题")
        return false
      }
      if ( this.article.poster === "" ) {
        this.$message.error("请填写文章封面地址")
        return false
      }
      if ( this.article.keywords === "" ) {
        this.$message.error("请填写文章关键字")
        return false
      }
      if ( this.article.description === "" ) {
        this.$message.error("请填写文章描述")
        return false
      }
      if ( this.article.mdContent === "") {
        this.$message.error("请填写文章内容")
        return false
      }
    },

    async saveData () {
      const validateRes = this.validate()
      if ( validateRes === false ) {
        return
      }
      let res = {}
      if ( !this.id ) {
        let keywords = this.article.keywordsStr.split(",")
        keywords = [...new Set(keywords)]
        this.article.keywords = keywords
        res = await req.post(
          "/api/article/create",
          this.article
        )
      } else {
        let keywords = this.article.keywordsStr.split(",")
        keywords = [...new Set(keywords)]
        let data  = {
          id: this.article._id,
          categoryId: this.article.categoryId,
          type: this.article.type,
          poster: this.article.poster,
          title: this.article.title,
          keywords: keywords,
          description: this.article.description,
          mdContent: this.article.mdContent
        }
        res = await req.post(
          "/api/article/update",
          data
        )
      }
      let msg = res.data.msg
      if (res.data.code === 1) {
        if (typeof msg === "object") {
          this.$message.error(JSON.stringify(msg))
        } else {
          this.$message.error(msg)
        }
      } else {
        this.$message.success(msg)
        this.closeMe()
      }
    },

    async getCategory(callback) {
      let res = await req.get("/api/category/list")
      let categoryList = []
      let data = res.data.data
      data.forEach(item => {
        categoryList.push({
          id: item._id,
          name: item.name
        })
      })
      this.categoryList = categoryList
      if (typeof callback === "function") {
        callback()
      }
    },

    closeMe() {
      store.set("draft-article", null)
      setTimeout(() => {
        this.$store.dispatch('d2admin/page/close', {
          tagName: 'article-edit',
          vm: this
        })
      }, 1000)
    },

    loaded() {
      setTimeout(()=>{
        this.loading = false;
      }, 1000);
    }
  }
}
</script>
<style>
.cm-spell-error {
  background: none !important
}
</style>

<style lang="scss" scoped>
.mde {
  margin-bottom: -16px
}
</style>
