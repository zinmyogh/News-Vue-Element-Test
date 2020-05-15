<template>
  <div class="my_moment_post">
    <!-- <div class="time">{{ formatDate(new Date()) }}</div> -->
    <el-breadcrumb separator-class="el-icon-caret-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的发布</el-breadcrumb-item>
      <el-breadcrumb-item>微头条</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="moment_post"
      v-for="moment in momentPost"
      :key="moment.momentPostID"
    >
      <div>
        <p>{{ moment.content }}</p>
      </div>
      <div class="images_list">
        <img
          v-for="(img, index) in splitImg(moment.images)"
          :key="index"
          :src="img"
          alt
        />
      </div>
      <div>
        <div>
          <span>获赞 &nbsp;&nbsp;{{ moment.likeCount || 0 }}</span>
          <span>{{ moment.createDate | time }}</span>
          <el-button @click="momentView(moment.momentPostID)" type="text">
            查看
          </el-button>
          <el-button
            @click="momentEdit(moment.momentPostID)"
            type="text"
            style="color: #ff9900"
          >
            编辑
          </el-button>
          <el-button
            @click="momentDelete(moment.momentPostID)"
            type="text"
            style="color: #e80000"
          >
            删除
          </el-button>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- <div>{{this.data}}</div> -->
  </div>
</template>

<script>
import { getMoment } from "../../../api/moment";
// let moment = require("moment");
// import dateDiff from "../../../utils/time";
export default {
  data() {
    return {
      momentPost: [
        {
          momentPostID: "",
          userID: "",
          content: "",
          images: "",
          likeCount: "",
          createDate: "",
        },
      ],
    };
  },
  methods: {
    splitImg(images) {
      return images.split(",");
    },
    momentView(data) {
      console.log(data);
    },
    momentEdit(data) {
      console.log(data);
    },
    momentDelete(data) {
      console.log(data);
    },
  },
  mounted() {
    // console.log("my moment post mounted>>>>>>");
    getMoment()
      .then((res) => {
        this.momentPost = res.data.info;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.moment_post {
  border-bottom: 1px solid #dfdfdf;
}
p {
  display: inline-block;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
span {
  padding: 10px;
  font-size: 13px;
  color: #888888;
}
/* .moment_body {
  display: flex;
} */
img {
  width: 150px;
  height: 150px;
  padding: 5px;
}
.images_list {
  width: 480px;
  display: inline-block;
  flex-direction: row;
}
</style>
