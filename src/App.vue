<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  mounted() {
    // console.log("env......", process.env.NODE_ENV.link);
  }
};
</script>
<style scope>
body {
  margin: 0 !important;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
}
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
</style>
