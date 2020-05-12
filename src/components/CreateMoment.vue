<template>
  <div class="container">
    <div class="context">
      <span></span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7 }"
        maxlength="200"
        show-word-limit
        placeholder="有什么新鲜事想告诉大家？"
        v-model="content"
      ></el-input>
      <p>
        共选择了 {{ uploadLength }} 张，还剩
        <span v-if="uploadRemain == null">{{ uploadLimit }}</span>
        <span v-else>{{ uploadRemain }}</span> 张
      </p>
      <div class="image-upload">
        <el-upload
          ref="upload"
          :action="serverUrl"
          :headers="token"
          list-type="picture-card"
          multiple
          :limit="9"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
          :on-change="handleOnChange"
          :class="{ hide: hideUpload }"
        >
          <i class="el-icon-plus icon-hidden"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <div class="moment_btn">
        <el-button type="primary" @click="uploadMoment">上传动态</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseUrl from "../api/default";
import { momentUpl } from "../api/moment";
export default {
  data() {
    return {
      serverUrl: `${BaseUrl.BaseUrl}moment/uploadimages`,
      token: { authorization: localStorage.token },
      dialogImageUrl: "",
      dialogVisible: false,
      uploadLength: 0,
      uploadLimit: 9,
      limitCount: 9,
      uploadRemain: null,
      hideUpload: false,
      content: "",
      imageList: []
    };
  },
  methods: {
    uploadMoment() {
      if (this.content) {
        return this.$refs.upload.submit();
      } else {
        return this.$message.error({
          message: "动态不能为空！"
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadRemain += 1;
      this.uploadLength -= 1;
    },
    async handleSuccess(res) {
      let data = {
        content: this.content,
        images: this.imageList
      };
      // console.log(res);
      if (res.code == 200) {
        this.imageList.push(res.url);
        // console.log("this.imageList: ", this.imageList);
        if (this.imageList.length == this.uploadLength) {
          const result = await momentUpl(data);
          console.log("result: ", result);
          this.$message.success({
            message: result.data.msg
          });
          setTimeout(() => {
            this.$refs.upload.clearFiles();
            this.content = "";
          }, 1000);

          // console.log("result; ", result);
        }
      } else {
        this.$message.error({
          message: "上传是出现错误了！"
        });
        // console.log("push imagelist error lar");
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 9, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
      //imageLength = files.length;
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      //console.log(file);
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleOnChange(file, fileList) {
      console.log("filelIst: ", fileList);
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
      // console.log(this.hideUpload);
    }
    // momentUpl() {}
  }
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
.context {
  padding: 20px;
  width: 70%;
  height: 80px;
}
.context .el-textarea textarea {
  /* border: none; */
  resize: none;
}
.image-upload {
  width: 468px;
  padding-top: 0px;
}
.hide .el-upload--picture-card {
  display: none;
}
.moment_btn {
  position: absolute;
  float: right;
  top: 32%;
  right: 35%;
}
</style>
