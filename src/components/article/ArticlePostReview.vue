<template>
  <div class="review" v-if="this.article != null">
    <h2 class="review_h2">{{ this.article[0].caption }}</h2>
    <h6 class="review_h6">{{ this.article[0].createDate }}</h6>
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
    let id = { articlePostID: this.$route.params.articlePostID };
    if (id != undefined) {
      const res = await getArticleByID(id);
      this.article = res.data.info;
    } else {
      return;
    }
  }
};
</script>

<style>
.review {
  width: 1030px;
  height: 150vh;
  position: relative;
  word-wrap: break-word;
  background-color: #fff;
  word-break: normal;
  overflow: scroll;
}
.review_h2 {
  position: relative;
  display: flex;
  justify-content: center;
}
.review_h6 {
  position: relative;
  display: flex;
  justify-content: center;
}
.content {
  position: inherit;
  padding: 0 100px 0 100px;
}
.content p img {
  width: 512px;
  height: 320px;
}
</style>
