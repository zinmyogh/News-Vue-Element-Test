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
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <Infinite />
  </div>
</template>

<script>
import PanelGroup from "../components/PanelGroup";
import Infinite from "../components/InfiniteScroll";
export default {
  components: {
    PanelGroup,
    Infinite,
  },
  data() {
    return {
      carasoulImg: [{}],
      textArr: [
        " 第一条公告",
        " 第二条公告第二条公告",
        " 第三条公告第三条公告第三条公告",
      ],
      number: 0,
    };
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.textArr[this.number],
      };
    },
  },
  mounted() {
    this.startMove();
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
    },
  },
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
