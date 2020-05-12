<template>
  <div>
    <el-breadcrumb separator-class="el-icon-caret-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的发布</el-breadcrumb-item>
      <el-breadcrumb-item>视屏</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
    };
  },
  methods: {
    // onEdit() {
    //   const h = this.$createElement;

    //   this.$notify({
    //     title: "提示消息",
    //     message: h(
    //       "i",
    //       { style: "color: teal" },
    //       "这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"
    //     ),
    //   });
    // },
    // onShare(){

    // },
    onDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  padding-bottom: 10px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  padding-top: 10px;
}
.el-image {
  height: 200px;
  padding: 0 20px;
}
</style>

<!--  <el-container v-for="(item, i) in 1" :key="i">
      <el-main style="display: flex;">
        <div>title</div>
        <el-image :src="src"></el-image>
      </el-main>
      <el-aside width="100px" style="background-color: #ff2550">
         <el-button-group> 
         <el-button
            type="primary"
            @click="onEdit"
            icon="el-icon-edit"
          ></el-button>
        <el-button
            type="warning"
            @click="onShare"
            icon="el-icon-share"
          ></el-button> 
        <el-button
          type="danger"
          @click="onDelete"
          icon="el-icon-delete"
        ></el-button>
        </el-button-group> 
      </el-aside>
    </el-container> -->
