<template>
  <div class="main_body">
    <div class="body_alert">
      <i class="el-icon-warning"></i>
      <span class="alert_msg">这是公告好不好！！！</span>
    </div>
    <PanelGroup />

    <el-carousel :interval="3000" type="card" height="200px">
      <el-carousel-item v-for="item in 5" :key="item" autoplay>
        <img src="../assets/images/girl.jpg" alt />
      </el-carousel-item>
    </el-carousel>
    <dir style="background-color: red; height: 228px">lolololol</dir>
  </div>
</template>

<script>
import PanelGroup from "../components/PanelGroup";
export default {
  components: {
    PanelGroup
  },
  data() {
    return {
      carasoulImg: [
        { img: "http://pic39.nipic.com/20140315/2457331_090001037000_2.jpg" },
        { img: "http://pic39.nipic.com/20140315/2457331_090001037000_2.jpg" },
        { img: "http://pic39.nipic.com/20140315/2457331_090001037000_2.jpg" },
        { img: "http://pic39.nipic.com/20140315/2457331_090001037000_2.jpg" }
      ]
    };
  }
};
</script>

<style scoped>
.main_body {
  padding: 10px 1px;
}
.body_alert {
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.el-icon-warning {
  font-size: 23px;
  position: relative;
}
.alert_msg {
  padding-left: 20px;
  position: absolute;
}
.el-carousel {
  padding-top: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
