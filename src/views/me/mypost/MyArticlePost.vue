<template>
  <div class="my_article_post">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item>{{ this.$t("me.me") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("me.mypost") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("home.article") }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div v-for="article in articlePost" :key="article.articlePostID" class="article_wrap">
      <div v-if="article.cover1">
        <img class="article_img" :src="splitImg(article.cover1)" alt />
      </div>
      <div class="article_info">
        <div>
          <h3>{{ article.caption }}</h3>
          <p class="content_2_l" v-html="delHtmlTag($options.filters.decode(article.content))"></p>
        </div>
        <div class="article_action">
          <span>{{ like }}</span>
          <span>{{ article.likeCount || 0 }}</span>
          <span>.</span>
          <span>{{ view }}</span>
          <span>{{ article.viewCount || 0 }}</span>
          <span>.</span>
          <span>{{ article.createDate | dateDiff }}</span>
          <div class="btn_group">
            <el-button type="text" @click="articleView(article.articlePostID)">{{ review }}</el-button>
            <el-button
              type="text"
              @click="articleEdit(article.articlePostID)"
              style="color: #ff9900"
            >{{ edit }}</el-button>
            <el-button
              type="text"
              @click="articleDelete(article.articlePostID)"
              style="color: #e80000"
            >{{ del }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, deleteArticle } from "../../../api/article";
import { ImgUrl } from "../../../api/default";
export default {
  data() {
    return {
      articlePost: [
        {
          articlePostID: "",
          userPostID: "",
          userID: "",
          caption: "",
          content: "",
          cover1: "",
          viewCount: "",
          likeCount: "",
          createDate: "",
          categoryName: ""
        }
      ]
    };
  },
  computed: {
    like() {
      return this.$t("mypost.like");
    },
    view() {
      return this.$t("mypost.view");
    },
    review() {
      return this.$t("mypost.review");
    },
    edit() {
      return this.$t("mypost.edit");
    },
    del() {
      return this.$t("mypost.delete");
    }
  },
  methods: {
    splitImg(cover1) {
      return ImgUrl + cover1.split(",")[0];
    },
    delHtmlTag(content) {
      return content.replace(/<[^>]+>/g, "");
    },
    articleView(data) {
      this.$router.push({
        name: "ReviewArticle",
        params: { articlePostID: data }
      });
    },
    articleEdit(data) {
      this.$router.push({
        name: "EditArticle",
        params: { articlePostID: data }
      });
    },
    articleDelete(articlePostID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = { articlePostID: articlePostID };
          const res = await deleteArticle(data);
          if (res.data.code == 200) {
            this.$message.success({
              message: res.data.msg
            });
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  activated() {
    getArticle()
      .then(res => {
        this.articlePost = res.data.info;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.article_wrap {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #dfdfdf;
}
.article_img {
  width: 200px;
  height: 120px;
  padding: 10px 0px 10px 10px;
}
.article_info {
  padding-left: 15px;
}
.article_action {
  display: flex;
  flex-direction: row;
}
h3 {
  display: inline-block;
  line-height: 30px;
  margin-block-start: 15px;
  margin-block-end: 0px;
}
.content_2_l {
  margin-block-start: 10px;
  margin-block-end: 0px;
  word-break: break-all;
  text-overflow: ellipsis;
  /* height: 38px; */
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /*! autoprefixer: on */
  overflow: hidden;
}
span {
  font-size: 13px;
  color: #888888;
  padding: 10px 5px 10px 5px;
}
.btn_group {
  position: absolute;
  right: 50px;
}
</style>
