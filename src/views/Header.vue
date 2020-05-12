<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="header-bar" mode="horizontal" :router="true">
      <!-- <el-menu-item>
        <el-image class="logo" :src="url" :fits="fits"></el-image>
      </el-menu-item>-->
      <el-menu-item>
        <!-- <img src="../../assets/images/logo.png" alt /> -->
        <span style="font-size: 30px; color: #ff5555;font-weight:900;">缅甸头条</span>
      </el-menu-item>

      <el-submenu class="header-bar-item" index="1">
        <template slot="title">
          <el-avatar :size="35">
            <img src="../assets/images/profile.png" alt />
          </el-avatar>
          <span style="padding-left: 10px">{{ (name ? name : phone) }}</span>
        </template>
        <el-menu-item index="/myaccount">
          <i class="el-icon-setting"></i>
          <span>账号设置</span>
        </el-menu-item>
        <!-- <el-menu-item index="1-2">
          <i class="el-icon-switch-button"></i>
          <span>退出登录</span>
        </el-menu-item>-->
      </el-submenu>

      <el-menu-item class="header-bar-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-message message-icon" style="font-size: 30px">
              <el-badge :value="3" class="item"></el-badge>
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>通知</el-dropdown-item>
            <el-dropdown-item>评论</el-dropdown-item>
            <el-dropdown-item>关注</el-dropdown-item>
            <el-dropdown-item>私信</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainHeader",
  data() {
    return {
      user: {},
      activeIndex: "1",
      fits: "scale-down",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  computed: {
    ...mapGetters(["name", "phone"])
  },
  // created() {
  //   this.getUser();
  // },
  methods: {
    // handleSelect(key, keyPath) {
    //   // if (keyPath == "1-2") {
    //   //   removeToken();
    //   //   localStorage.clear();
    //   //   setTimeout(() => {
    //   //     this.$router.push("/login");
    //   //   }, 1000);
    //   // }
    //   this.$router.push("/myaccount");
    //   console.log(key, keyPath);
    // }
    // getUser() {
    //   this.user = {
    //     name: this.name
    //   };
    // }
  },
  mounted() {
    if (localStorage.userName == "null") {
      return;
    } else {
      this.$store.commit("user/SET_NAME", localStorage.userName);
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #fff;
  height: 60px;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}
.logo {
  width: 60px;
  height: 40px;
  padding: 5px;
}
.header-bar {
  margin: 0 auto;
  height: 100%;
  z-index: 100;
  width: 1180px;
}
.header-bar .header-bar-item {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.item {
  display: relative;
  right: 10px;
}
</style>
