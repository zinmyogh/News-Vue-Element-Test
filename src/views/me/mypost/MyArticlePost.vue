<template>
  <div class="my_article_post">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的发布</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
    </el-breadcrumb>

    <div
      v-for="article in articlePost"
      :key="article.articlePostID"
      class="article_wrap"
    >
      <div v-if="article.cover1">
        <img class="article_img" :src="splitImg(article.cover1)[0]" alt />
      </div>
      <div class="article_info">
        <div>
          <h3>{{ article.caption }}</h3>
          <p v-html="delHtmlTag(decode(article.content))"></p>
          <!-- <p >{{article.content}}</p> -->
        </div>
        <div class="article_action">
          <span>获赞 {{ 20 }}</span>
          <span>.</span>
          <span>阅读 {{ 220 }}</span>
          <span>.</span>
          <!-- <span>{{article.viewCount}}</span>
          <span>{{article.likeCount}}</span>-->
          <span>{{ article.createDate | time }}</span>
          <div class="btn_group">
            <el-button type="text" @click="articleView(article.articlePostID)"
              >查看</el-button
            >
            <el-button
              type="text"
              @click="articleEdit(article.articlePostID)"
              style="color: #ff9900"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="articleDelete(article.articlePostID)"
              style="color: #e80000"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-for="article in articlePost" :key="article.articlePostID">{{article.caption}}</div> -->
  </div>
</template>

<script>
import { getArticle } from "../../../api/article";
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
          categoryName: "",
        },
      ],
    };
  },
  methods: {
    splitImg(cover1) {
      return cover1.split(",");
    },
    delHtmlTag(content) {
      return content.replace(/<[^>]+>/g, "");
    },
    articleView(data) {
      console.log("articleView : ", data);
    },
    articleEdit(data) {
      console.log("articleEdit", data);
    },
    articleDelete(data) {
      console.log("articleDelete", data);
    },
    decode(str) {
      return decodeURIComponent(
        atob(str)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    },
  },
  mounted() {
    getArticle()
      .then((res) => {
        // console.log(res.data.info);
        this.articlePost = res.data.info;
        // console.log(this.articlePost);
        // console.log(this.articlePost[12].content);
        // this.articlePost.push(res.data.info);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.article_wrap {
  display: flex;
  flex-direction: row;
  /* box-sizing: border-box; */
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
p {
  display: inline-block;
  margin-block-start: 10px;
  margin-block-end: 0px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
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
