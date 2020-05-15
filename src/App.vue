<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
<style scope>
body {
  margin: 0 !important;
  width: 100%;
  background-color: #f8f8f8;
}
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
