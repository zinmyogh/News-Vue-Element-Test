<template>
  <div>
    <el-card class="box-card">
      <div style="padding-bottom: 10px; font-size: 18px; letter-spacing: 2px;">
        <i class="el-icon-s-data" style="padding: 10px; font-size: 18px;"></i>
        热点新闻
      </div>

      <div
        class="hot"
        v-for="hot in data"
        :key="hot.articlePostID"
        @click="viewHot(hot.articlePostID)"
      >
        <div class="hot_header">
          <u>
            <div style="padding-bottom: 5px; font-weight: bold;">{{ hot.caption }}</div>
          </u>
          <div>
            <i class="el-icon-star-on"></i>
            {{ hot.likeCount }}
          </div>
        </div>

        <i>
          <div class="hot_content" v-html="delHtmlTag($options.filters.decode(hot.content))"></div>
        </i>
      </div>

      <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
    </el-card>
  </div>
</template>

<script>
import { getHotArticle } from "../api/article";
export default {
  data() {
    return {
      data: [
        {
          articlePostID: "",
          caption: "",
          content: "",
          likeCount: ""
        }
      ]
    };
  },
  methods: {
    delHtmlTag(content) {
      return content.replace(/<[^>]+>/g, "");
    },
    viewHot(id) {
      console.log("hot id", id);
      this.$router.push({
        name: "ReviewArticle",
        params: { articlePostID: id }
      });
    }
  },
  mounted() {
    getHotArticle()
      .then(res => {
        console.log("hot article>>>>", res);
        this.data = res.data.info;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style lang='scss' scoped>
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.hot {
  padding: 10px;
}
.hot_header {
  display: flex;
  justify-content: space-between;
}
.hot_content {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  /*! autoprefixer: on */
  overflow: hidden;
}
</style>
