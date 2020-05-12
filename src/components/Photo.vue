<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <el-button @click="getArticle">arr</el-button>
    </div>
    <!-- <span>{{ this.data }}</span> -->
    <!-- <hr /> -->
    <div v-for="ar in data" :key="ar.id" v-html="ar.article">{{ ar.article }}</div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      data: [],
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  },
  methods: {
    async getArticle() {
      const res = await this.$axios.post("/blog/select", { id: "15" });
      // console.log(res.data.data);
      this.data = res.data.result;
      console.log(this.data);
    }
  }
};
</script>

<style>
.wrapper {
  height: 300px;
}
img {
  max-width: 500px !important;
}
</style>
