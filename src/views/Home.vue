<template>
  <div class="home">
    <MainHeader />
    <div class="wrapper">
      <div class="home-wrap">
        <div class="side-bar">
          <SideBar />
        </div>
        <div class="main-content">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link :to="{path:'/footer/privacy'}">privacy</router-link>
      <span>|</span>
      <router-link to="/">
        <span>ahhaha</span>
      </router-link>
      <span>|</span>
      <router-link to="/">
        <span>ahhaha</span>
      </router-link>
      <span>|</span>
      <router-link to="/">
        <span>ahhaha</span>
      </router-link>
      <span>|</span>
      <router-link to="/">
        <span>ahhaha</span>
      </router-link>
      <br />
      <div style="padding-top: 10px; color: #989898">&#169;2020 miandiantt.com All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
import MainHeader from "./Header";
import SideBar from "./SideBar";

export default {
  name: "Home",
  components: {
    MainHeader,
    SideBar
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100%;
}
.wrapper {
  position: relative;
  width: 100vw;
}
.home-wrap {
  display: flex;
  margin: 0 auto;
  width: 1180px;
}
.side-bar {
  position: relative;
  display: inline-block;
  margin-top: 80px;
  padding-right: 10px;
  height: 80vh;
  min-width: 150px;
  background-color: #f8f8f8;
}
.main-content {
  position: relative;
  margin-top: 80px;
  padding-top: 0 !important;
  background-color: #fff;
  width: 100vw;
  height: 80vh;
}
.footer {
  height: 60px;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  text-align: center;
}
.footer span {
  color: #989898;
  padding: 10px;
}
a:-webkit-any-link {
  text-decoration: none !important;
}
</style>
