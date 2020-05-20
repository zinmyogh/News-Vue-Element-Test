<template>
  <div class="my_article_post">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的发布</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
    </el-breadcrumb>

    <div v-for="article in articlePost" :key="article.articlePostID" class="article_wrap">
      <div v-if="article.cover1">
        <img class="article_img" :src="splitImg(article.cover1)" alt />
      </div>
      <div class="article_info">
        <div>
          <h3>{{ article.caption }}</h3>
          <p class="content_2_l" v-html="delHtmlTag($options.filters.decode(article.content))"></p>
          <!-- <p >{{article.content}}</p> -->
        </div>
        <div class="article_action">
          <span>获赞 {{ article.likeCount || 0 }}</span>
          <span>.</span>
          <span>阅读 {{ article.viewCount || 0 }}</span>
          <span>.</span>
          <!-- <span>{{article.viewCount}}</span>
          <span>{{article.likeCount}}</span>-->
          <span>{{ article.createDate | dateDiff }}</span>
          <div class="btn_group">
            <el-button type="text" @click="articleView(article.articlePostID)">查看</el-button>
            <el-button
              type="text"
              @click="articleEdit(article.articlePostID)"
              style="color: #ff9900"
            >编辑</el-button>
            <el-button
              type="text"
              @click="articleDelete(article.articlePostID)"
              style="color: #e80000"
            >删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-for="article in articlePost" :key="article.articlePostID">{{article.caption}}</div> -->
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
          // imgUrl: ImgUrl
        }
      ]
    };
  },
  methods: {
    splitImg(cover1) {
      // console.log("cover1: ", ImgUrl + cover1.split(","));
      return ImgUrl + cover1.split(",")[0];
    },
    delHtmlTag(content) {
      return content.replace(/<[^>]+>/g, "");
    },
    articleView(data) {
      // console.log("articleView : ", data);
      this.$router.push({
        name: "ReviewArticle",
        params: { articlePostID: data }
      });
    },
    articleEdit(data) {
      // console.log("articleEdit", data);
      this.$router.push({
        name: "EditArticle",
        params: { articlePostID: data }
      });
    },
    articleDelete(articlePostID) {
      // console.log("articlePostID: ", articlePostID);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // console.log("gg: ", articlePostID);
          let data = { articlePostID: articlePostID };
          // console.log("delete: ", data);
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

<style lang='scss' scoped>
.article_wrap {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #dfdfdf;
}
.article_img {
  width: 200px;
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
