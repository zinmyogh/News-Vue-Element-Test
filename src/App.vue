<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  // mounted() {
  //   this.$store.state.user.info = localStorage.info;
  // },
  // created() {
  //   if (localStorage.getItem("roles")) {
  //     console.log(this.$store.state.user.roles);
  //     this.$store.replaceState(
  //       // Object.assign(
  //       //   {},
  //       this.$store.state.user.roles,
  //       localStorage.getItem("roles")
  //       // )
  //     );
  //在页面刷新时将vuex里的信息保存到sessionStorage里
  // window.addEventListener("beforeunload",()=>{
  // sessionStorage.setItem("store",JSON.stringify(this.$store.state))
  // })
  //   }
  //   if (localStorage.getItem("roles")) {
  //     const { rools } = localStorage.getItem("roles");
  //     console.log(this.$store.state.user);
  //     this.$store.state.user.roles = rools;
  //   } else {
  //     console.log("app vue");
  //   }
  // }
};
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
