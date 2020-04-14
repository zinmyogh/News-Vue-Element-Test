<template>
  <div class="home">
    <MainHeader />
    <Body />
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/home/MainHeader";
import Body from "@/components/body/index";

export default {
  name: "Home",
  components: {
    MainHeader,
    Body
  }
};
</script>

<style scoped>
.home {
}
</style>
