<template>
  <div class="my_video_post">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item>{{ this.$t("me.me") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("me.mypost") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("home.video") }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-for="video in videoPost" :key="video.videoPostID" class="video_wrap">
      <div>
        <video
          class="video_img"
          :src="videoUrl(video.videoURL)"
          controls="controls"
        ></video>
      </div>
      <div class="video_info">
        <div>
          <h3>{{ video.caption }}</h3>
        </div>
        <div class="video_action">
          <span>{{ like }}</span>
          <span> {{ video.likeCount || 0 }}</span>
          <span>.</span>
          <span>{{ view }}</span>
          <span> {{ video.viewCount || 0 }}</span>
          <span>.</span>
          <span>{{ video.createDate | dateDiff }}</span>
        </div>
        <div class="btn_group">
          <el-button
            type="text"
            @click="videoEdit(video.videoPostID)"
            style="color: #ff9900"
            >{{ edit }}</el-button
          >
          <el-button
            type="text"
            @click="videoDelete(video.videoPostID)"
            style="color: #e80000"
            >{{ del }}</el-button
          >
        </div>
      </div>
    </div>
    <!-- change user info form-->
    <el-dialog Caption="更新视屏标题" :visible.sync="updateVideoCaption">
      <el-form :model="videoForm">
        <el-form-item label="视屏标题" label-width="120px">
          <el-input
            clearable
            maxlength="50"
            v-model="videoForm.videoCaption"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVideoCaption = false">取消</el-button>
        <el-button type="primary" @click="conformChange">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getVideo,
  updateVideoCaption,
  deleteVideoPost,
} from "../../../api/video";
import { ImgUrl } from "../../../api/default";
export default {
  data() {
    return {
      updateVideoCaption: false,
      videoForm: {
        videoCaption: "",
      },
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
      id: "",
    };
  },
  computed: {
    like() {
      return this.$t("mypost.like");
    },
    view() {
      return this.$t("mypost.view");
    },
    edit() {
      return this.$t("mypost.edit");
    },
    del() {
      return this.$t("mypost.delete");
    },
  },
  methods: {
    videoEdit(data) {
      this.updateVideoCaption = true;
      this.id = data;
    },
    videoUrl(video) {
      if (video == "" || video == null || video == undefined) {
        return "";
      }
      return ImgUrl + video;
    },
    async conformChange() {
      if (this.videoForm.videoCaption) {
        let data = {
          videoPostID: this.id,
          caption: this.videoForm.videoCaption,
        };
        const res = await updateVideoCaption(data);
        if (res.data.code == 200) {
          this.$message.success({
            message: res.data.msg,
          });
          this.updateVideoCaption = false;
        } else {
          this.$message.error({
            message: res.data.msg,
          });
        }
      } else {
        this.$message.error({
          message: "视屏标题不能为空！",
        });
      }
    },
    videoDelete(videoPostID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = { videoPostID: videoPostID };
          const res = await deleteVideoPost(data);
          if (res.data.code == 200) {
            this.$message.success({
              message: res.data.msg,
            });
          } else {
            this.$message.error({
              message: res.data.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  activated() {
    getVideo()
      .then((res) => {
        this.videoPost = res.data.info;
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
  border-bottom: 1px solid #dfdfdf;
}
.video_img {
  width: 200px;
  padding: 10px 0px 10px 10px;
}
.video_info {
  padding-left: 15px;
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
  font-size: 14px;
  color: #888888;
  padding: 10px 5px 10px 5px;
}
</style>
