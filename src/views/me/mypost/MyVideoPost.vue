<template>
  <div class="my_video_post">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的发布</el-breadcrumb-item>
      <el-breadcrumb-item>视屏</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-for="video in videoPost" :key="video.videoPostID" class="video_wrap">
      <div>
        <video class="video_img" :src="video.videoURL"></video>
        <!-- <img class="video_img" :src="video.videoURL" alt /> -->
      </div>
      <div class="video_info">
        <div>
          <h3>{{ video.caption }}</h3>
        </div>
        <div class="video_action">
          <span>获赞 {{ 20 }}</span>
          <span>.</span>
          <span>观看 {{ 220 }}</span>
          <span>.</span>
          <!-- <span>{{video.viewCount}}</span>
          <span>{{video.likeCount}}</span>-->
          <span>{{ video.createDate | time }}</span>
        </div>
        <div class="btn_group">
          <el-button
            type="text"
            @click="videoEdit(video.videoPostID)"
            style="color: #ff9900"
            >编辑</el-button
          >
          <el-button
            type="text"
            @click="videoDelete(video.videoPostID)"
            style="color: #e80000"
            >删除</el-button
          >
        </div>
      </div>
    </div>
    <!-- <div>{{this.data}}</div> -->
  </div>
</template>

<script>
import { getVideo } from "../../../api/video";
export default {
  data() {
    return {
      videoPost: [
        {
          videoPostID: "",
          videoURL: "",
          caption: "",
          userPostID: "",
          userID: "",
          viewCount: "",
          likeCount: "",
          createDate: "",
          categoryName: "",
        },
      ],
    };
  },
  methods: {
    videoEdit(data) {
      console.log("videoEdit", data);
    },
    videoDelete(data) {
      console.log("videoDelete", data);
    },
  },
  mounted() {
    // console.log("my video post mounted>>>>>>");
    getVideo()
      .then((res) => {
        // console.log(res.data.info);
        this.videoPost = res.data.info;
        // console.log("video>>>>>", this.videoPost);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.my_video_post {
  word-wrap: break-word;
  word-break: normal;
}
.video_wrap {
  display: flex;
  flex-direction: row;
  /* box-sizing: border-box; */
  border-bottom: 1px solid #dfdfdf;
}
.video_img {
  width: 200px;
  padding: 10px 0px 10px 10px;
}
.video_info {
  padding-left: 15px;
  /* margin-top: 30px; */
}
.video_action {
  display: flex;
  flex-direction: row;
}
h3 {
  display: inline-block;
  line-height: 30px;
  margin-block-start: 15px;
  margin-block-end: 0px;
}
p {
  display: inline-block;
  margin-block-start: 10px;
  margin-block-end: 0px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
span {
  font-size: 13px;
  color: #888888;
  padding: 10px 5px 10px 5px;
}
/* .btn_group {
  position: absolute;
  right: 50px;
} */
</style>
