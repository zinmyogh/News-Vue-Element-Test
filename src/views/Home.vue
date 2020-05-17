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
    <Footer />
  </div>
</template>

<script>
import MainHeader from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

export default {
  name: "Home",
  components: {
    MainHeader,
    SideBar,
    Footer
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
  height: 100vh;
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
</style>
