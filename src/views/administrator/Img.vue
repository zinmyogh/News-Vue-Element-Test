<template>
  <div class="container">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>图片广告</el-breadcrumb-item>
    </el-breadcrumb>-->
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="网页版广告图" name="advWeb">
        <ImgWeb />
      </el-tab-pane>
      <el-tab-pane label="手机版广告图" name="advApp">
        <ImgApp />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImgWeb from "./ImgWeb";
import ImgApp from "./ImgApp";
export default {
  data() {
    return {
      activeName: "advWeb"
    };
  },
  components: {
    ImgWeb,
    ImgApp
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.el-breadcrumb {
  padding: 20px;
}
.el-tabs {
  min-height: 750px;
}
</style>
