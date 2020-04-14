<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="4"> <SideBar /></el-col>
      <el-col :span="20"><MainContent /></el-col>
    </el-row>
  </div>
</template>

<script>
import MainContent from "./MainContent";
import SideBar from "./SideBar";
export default {
  components: {
    MainContent,
    SideBar
  }
};
</script>

<style></style>
