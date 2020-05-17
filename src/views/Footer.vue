<template>
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
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  height: 60px;
  /* left: 0; */
  /* position: relative; */
  width: 100vw;
  text-align: center;
}
span {
  color: #989898;
  padding: 10px;
}
a:-webkit-any-link {
  color: #989898;
  text-decoration: none !important;
}
</style>