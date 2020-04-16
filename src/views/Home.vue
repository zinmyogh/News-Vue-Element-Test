<template>
  <div class="home">
    <MainHeader />
    <!-- <Body /> -->
    <div class="main-wrap">
      <div class="side-bar">
        <SideBar />
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/home/MainHeader";
import SideBar from "../components/body/SideBar";

export default {
  name: "Home",
  components: {
    MainHeader,
    SideBar
  }
};
</script>

<style scoped>
.main-wrap {
  display: flex;
  margin: 0 auto;
  width: 1180px;
}
.side-bar {
  position: relative;
  margin-top: 80px;
  height: 80vh;
  background-color: aqua;
}
.main-content {
  position: relative;
  margin-top: 80px;
  background-color: red;
  width: 100vw;
  height: 80vh;
}
</style>
