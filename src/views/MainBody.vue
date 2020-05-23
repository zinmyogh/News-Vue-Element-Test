<template>
  <div class="main_body">
    <div class="textBox">
      <i class="el-icon-warning"></i>
      <transition name="slide">
        <span class="alert_msg text" :key="text.id">{{ text.val }}</span>
      </transition>
    </div>
    <PanelGroup />
    <el-carousel height="200px" direction="vertical" :autoplay="false">
      <el-carousel-item v-for="(img, i) in this.imageList" :key="i">
        <img style="width:100%; height:100%;" :src="img" alt />
      </el-carousel-item>
    </el-carousel>
    <HotFour />
  </div>
</template>

<script>
import PanelGroup from "../components/PanelGroup";
import HotFour from "../components/HotFour";
import { getAdminImage, getAdminPublic } from "../api/user";
import { ImgUrl } from "../api/default";
export default {
  components: {
    PanelGroup,
    HotFour
  },
  data() {
    return {
      textArr: ["公 告"],
      number: 0,
      imageList: []
    };
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.textArr[this.number]
      };
    }
  },
  async mounted() {
    this.startMove();
    const res = await getAdminImage();
    let imgArr = [];
    if (res.data.code == 200) {
      res.data.info[0].images.split(",").forEach(i => {
        imgArr.push(ImgUrl + i);
      });
      this.imageList = imgArr;
    }
    const result = await getAdminPublic();
    if (result.data.code == 200) {
      this.textArr.push(
        result.data.info[0].createDate + " " + result.data.info[0].publicMsg
      );
      this.textArr.push(
        result.data.info[1].createDate + " " + result.data.info[1].publicMsg
      );
    }
  },
  methods: {
    startMove() {
      setTimeout(() => {
        if (this.number === 2) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
    }
  }
};
</script>

<style scoped>
.main_body {
  padding: 10px 1px;
}
.textBox {
  padding: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  overflow: hidden;
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
  padding: 0 0 20px 0;
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
i {
  color: #4e4e4e;
}
.text {
  width: 100%;
  position: absolute;
  color: #4e4e4e;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(20px) scale(1);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-20px) scale(0.8);
  opacity: 0;
}
</style>
