<!-- <template>
  <div class="create_video">
    <div class="video_title">
      <span style="min-width: 80px; padding: 10px;color: #202020">视屏标题:</span>
      <el-input maxlength="50" clearable show-word-limit v-model="videoTitle"></el-input>
    </div>
    <div style="padding-left: 110px">
      <el-select v-model="categoryID" placeholder="请选择文章类型" style="width: 150px">
        <el-option
          v-for="item in categories"
          :key="item.categoryID"
          :label="item.categoryName"
          :value="item.categoryID"
        >
          <span>{{ item.categoryName }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="video_wrap" v-if="videoForm.showVideoPath ==''">
      <el-upload
        :action="url"
        :data="{step:'image'}"
        :headers="token"
        drag
        :on-progress="uploadVideoProcess"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将视频拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过5MB</div>
      </el-upload>
    </div>
    <video
      v-if="videoForm.showVideoPath !='' && !videoFlag"
      :src="videoForm.showVideoPath"
      class="avatar video-avatar"
      controls="controls"
    >您的浏览器不支持视频播放</video>
  </div>
</template>

<script>
import { getCty } from "../api/admin";
import BaseUrl from "../api/default";
export default {
  data() {
    return {
      videoTitle: "",
      token: { authorization: localStorage.token },
      url: `${BaseUrl.BaseUrl}article/articleimage`,
      //参数
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      categoryID: "",
      //视屏分类标题
      categories: [
        {
          categoryID: "",
          categoryName: ""
        }
      ]
    };
  },
  methods: {
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 5;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$alert("请上传正确的视频格式", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
        return false;
      }
      if (!fileSize) {
        this.$alert("视频大小不能超过5MB", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      console.log(fileList);
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      console.log("res video: ", res);
      console.log(file);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //后台上传地址
      if (res.code == 200) {
        console.log("执行了", res.url);
        this.curgimg = res.url;
        this.videoForm.showVideoPath = res.url;
      } else {
        this.$alert(res.info, "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      }
    }
  },
  mounted() {
    // console.log(" mountedmountedmountedmounted 》》》》》 ");
    getCty()
      .then(res => {
        this.categories = res.data.info;
        console.log(this.categories);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.video_title {
  display: flex;
  /* border-bottom: 1px solid #dfdfdf; */
  padding: 30px 10px 20px 10px;
}
.el-input {
  width: 80%;
}
/* .el-select {
  width: 150px;
  padding: 0 0 0 110px;
} */
.create_video {
  position: relative;
  height: 100%;
  /* background-color: red; */
}
.video_wrap {
  position: absolute;
  top: 30%;
  left: 32%;
  /* background-color: greenyellow; */
}
</style> -->

<template>
  <div class="create_video">
    <div class="video_title">
      <span style="min-width: 80px; padding: 10px;color: #202020">视屏标题:</span>
      <el-input maxlength="50" clearable show-word-limit v-model="videoTitle"></el-input>
    </div>
    <div style="padding-left: 110px">
      <el-select v-model="categoryID" placeholder="请选择视屏类型" style="width: 150px">
        <el-option
          v-for="item in categories"
          :key="item.categoryID"
          :label="item.categoryName"
          :value="item.categoryID"
        >
          <span>{{ item.categoryName }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="video_wrap" v-if="videoForm.showVideoPath ==''">
      <el-upload
        ref="upload"
        :action="url"
        :headers="token"
        :auto-upload="false"
        :on-progress="uploadVideoProcess"
        :on-change="handleChange"
        :on-success="handleVideoSuccess"
        :on-remove="handleRemove"
        :before-upload="beforeUploadVideo"
      >
        <el-button v-show="selectVideo" slot="trigger" type="primary">选取视屏文件</el-button>
        <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>
    <div class="videoArea">
      <video
        v-if="videoForm.showVideoPath !='' && !videoFlag"
        :src="videoForm.showVideoPath"
        class="video"
        controls="controls"
      >您的浏览器不支持视频播放</video>
    </div>
  </div>
</template>

<script>
import { getCty } from "../api/admin";
import BaseUrl from "../api/default";
import { addvideo } from "../api/video";
// import { post } from "../utils/request";
export default {
  data() {
    return {
      videoTitle: "",
      token: { authorization: localStorage.token },
      url: `${BaseUrl.BaseUrl}article/articleimage`,
      //参数
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      categoryID: "",
      selectVideo: true,
      //视屏分类标题
      categories: [
        {
          categoryID: "",
          categoryName: ""
        }
      ]
    };
  },
  methods: {
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 1024;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$alert("请上传正确的视频格式", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
        return false;
      }
      if (!fileSize) {
        this.$alert("视频大小不能超过1GB", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
        return false;
      }
      this.isShowUploadVideo = false;
    },
    submitUpload() {
      if (this.videoTitle && this.categoryID) {
        return this.$refs.upload.submit();
      } else {
        return this.$message.error({
          message: "视屏 标题 或 分类 不能为空！"
        });
      }
    },
    handleChange(file) {
      this.selectVideo = false;
      console.log("handelPreview: ", file);
    },
    handleRemove(file, fileList) {
      this.selectVideo = true;
      console.log(file, fileList);
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      console.log(fileList);
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      // console.log("res video: ", res);
      console.log(file);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //后台上传地址
      if (res.code == 200) {
        // console.log("执行了", res.code);
        this.curgimg = res.url;
        this.videoForm.showVideoPath = res.url;
        const result = this.postVideo();
        // console.log("0.  ", code);
        const results = Promise.resolve(result);
        results.then(r => {
          // console.log("c results: <<<<", r);
          if (r.code == 200) {
            return this.$message.success({
              message: r.msg
            });
          } else {
            return this.$message.error({
              message: r.msg
            });
          }
        });
      } else {
        return this.$message.error({
          message: "上传视屏失败"
        });
      }
    },
    async postVideo() {
      console.log("this.categoryID", this.categoryID);
      let data = {
        videoUrl: this.videoForm.showVideoPath,
        caption: this.videoTitle,
        categoryID: this.categoryID
      };
      const res = await addvideo(data);
      const result = res.data;
      // console.log("postvidoe: ", result);
      if (result.code == 200) {
        return result;
      } else {
        return;
      }
    }
  },
  mounted() {
    // console.log(" mountedmountedmountedmounted 》》》》》 ");
    getCty()
      .then(res => {
        this.categories = res.data.info;
        console.log(this.categories);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.video_title {
  display: flex;
  /* border-bottom: 1px solid #dfdfdf; */
  padding: 30px 10px 20px 10px;
}
.el-input {
  width: 80%;
}
/* .el-select {
  width: 150px;
  padding: 0 0 0 110px;
} */
.create_video {
  position: relative;
  height: 100%;
  /* background-color: red; */
}
.video_wrap {
  position: relative;
  padding-left: 110px;
  padding-top: 20px;
  /* top: 30%; */
  /* left: 32%; */
  /* background-color: greenyellow; */
}
.videoArea {
  position: relative;
  width: 800px;
  height: 300px;
  padding-top: 50px;
  padding-left: 110px;
  border: none;
}
.video {
  position: relative;
  width: 100%;
}
</style> 
