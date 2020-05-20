<template>
  <div>
    <el-row class="tac">
      <el-col class="side-bar-item">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          :default-openeds="['1', '2', '3']"
          :router="true"
        >
          <el-submenu v-if="checkPermission(['editor', 'admin'])" index="1">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>我的头条</span>
            </template>
            <el-menu-item index="/mainbody">首页</el-menu-item>
            <el-menu-item index="/createarticle">文章</el-menu-item>
            <el-menu-item index="/createmoment">微头条</el-menu-item>
            <el-menu-item index="/createvideo">视频</el-menu-item>
          </el-submenu>

          <el-submenu v-if="checkPermission(['admin', 'editor'])" index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/mypost">我的发布</el-menu-item>
            <el-menu-item index="/myaccount">我的账号</el-menu-item>
          </el-submenu>
          <el-submenu v-if="checkPermission(['admin'])" index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>管理员</span>
            </template>
            <el-menu-item index="/administrator/upload/cty"
              >标题管理</el-menu-item
            >
            <el-menu-item index="/administrator/upload/adv"
              >发布广告</el-menu-item
            >
            <el-menu-item index="/administrator/upload/img"
              >发布图片</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from "../utils/permission";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {
    checkPermission,
  },
};
</script>

<style scoped>
.el-submenu .el-menu-item {
  min-width: 150px !important;
}
</style>
