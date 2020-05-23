<template>
  <div class="my_post">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane :label="this.$t(`home.article`)" name="article">
        <MyArticlePost />
      </el-tab-pane>
      <el-tab-pane :label="this.$t(`home.video`)" name="video">
        <MyVideoPost />
      </el-tab-pane>
      <el-tab-pane :label="this.$t(`home.moment`)" name="moment">
        <MyMomentPost />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyArticlePost from "./mypost/MyArticlePost";
import MyMomentPost from "./mypost/MyMomentPost";
import MyVideoPost from "./mypost/MyVideoPost";
export default {
  components: {
    MyArticlePost,
    MyMomentPost,
    MyVideoPost
  },
  data() {
    return {
      activeName: "article"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.my_post {
  width: 1020px;
  height: 750px;
  overflow: scroll;
  background-color: aquamarine;
}
.el-tabs {
  min-height: 750px;
}
</style>
