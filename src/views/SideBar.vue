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
              <span>{{ this.$t("home.caption") }}</span>
            </template>
            <el-menu-item index="/mainbody">{{
              this.$t("home.home")
            }}</el-menu-item>
            <el-menu-item index="/createarticle">{{
              this.$t("home.article")
            }}</el-menu-item>
            <el-menu-item index="/createvideo">{{
              this.$t("home.video")
            }}</el-menu-item>
            <el-menu-item index="/createmoment">{{
              this.$t("home.moment")
            }}</el-menu-item>
          </el-submenu>

          <el-submenu v-if="checkPermission(['admin', 'editor'])" index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>{{ this.$t("me.me") }}</span>
            </template>
            <el-menu-item index="/mypost">{{
              this.$t("me.mypost")
            }}</el-menu-item>
            <el-menu-item index="/myaccount">{{
              this.$t("me.myacc")
            }}</el-menu-item>
          </el-submenu>
          <el-submenu v-if="checkPermission(['admin'])" index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>{{ this.$t("admin.admin") }}</span>
              <!-- <span>管理员</span> -->
            </template>
            <el-menu-item index="/administrator/upload/cty">{{
              this.$t("admin.cty")
            }}</el-menu-item>
            <el-menu-item index="/administrator/upload/img">{{
              this.$t("admin.img")
            }}</el-menu-item>
            <el-menu-item index="/administrator/upload/adv">{{
              this.$t("admin.adv")
            }}</el-menu-item>
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
