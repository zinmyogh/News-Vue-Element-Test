<template>
  <div class="review" v-if="this.article != null">
    <h2>{{this.article[0].caption}}</h2>
    <h6>{{this.article[0].createDate}}</h6>
    <div class="content" v-html="$options.filters.decode(this.article[0].content)"></div>
  </div>
</template>

<script>
import { getArticleByID } from "../../api/article";
export default {
  data() {
    return {
      article: [
        {
          caption: "",
          content: "",
          createDate: ""
        }
      ]
    };
  },
  async activated() {
    // console.log("review article post~~~~");
    let id = { articlePostID: this.$route.params.articlePostID };
    // console.log("id>>>>>>>", id);
    if (id != undefined) {
      const res = await getArticleByID(id);
      this.article = res.data.info;
      // console.log(this.article);
      // console.log("res: ", res);
    } else {
      return;
    }
  }
};
</script>

<style scoped>
.review {
  width: 1030px;
  height: 150vh;
  position: relative;
  word-wrap: break-word;
  background-color: #fff;
  word-break: normal;
  overflow: scroll;
}
h2 {
  position: relative;
  display: flex;
  justify-content: center;
}
h6 {
  position: relative;
  display: flex;
  justify-content: center;
}
.content {
  position: relative;
  padding: 0 100px 0 100px;
}
</style>