<template>
  <div class="side-bar">
    <el-row class="tac">
      <el-col class="side-bar-item">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          active-text-color="red"
          :default-openeds="['1']"
          unique-opened="true"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>我的头条</span>
            </template>
            <el-menu-item-group>
              <template slot="title">发布</template>
              <el-menu-item index="1-1">文章</el-menu-item>
              <el-menu-item index="1-2">微头条</el-menu-item>
              <el-menu-item index="1-3">视频</el-menu-item>
              <el-menu-item index="1-4">微视频</el-menu-item>
              <el-menu-item index="1-5">图集</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="2-1">我的发布</el-menu-item>
            <el-menu-item index="2-2">我的粉丝</el-menu-item>
            <el-menu-item index="2-3">我的关注</el-menu-item>
            <el-menu-item index="2-4">账号设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.side-bar {
  margin-top: 100px;
  margin-left: 10%;
  height: 80vh;
  /* background-color: aqua; */
}
.el-submenu .el-menu-item {
  min-width: 0 !important;
}
</style>
