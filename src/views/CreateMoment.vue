<template>
  <div class="container">
    <div class="context">
      <span></span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7 }"
        maxlength="200"
        show-word-limit
        :placeholder="this.$t(`moment.msay`)"
        v-model="content"
      ></el-input>
      <p>
        {{
          this.$t("moment.msselect") +
            uploadLength +
            ", " +
            this.$t("moment.msremain")
        }}
        <span v-if="uploadRemain == null">{{ uploadLimit }}</span>
        <span v-else>{{ uploadRemain }}</span>
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
        <el-button type="primary" @click="uploadMoment">{{
          this.$t("moment.mbtn")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseUrl } from "../api/default";
import { addMoment } from "../api/moment";
export default {
  data() {
    return {
      serverUrl: `${BaseUrl}moment/uploadimages`,
      token: { authorization: localStorage.token },
      dialogImageUrl: "",
      dialogVisible: false,
      uploadLength: 0,
      uploadLimit: 9,
      limitCount: 9,
      uploadRemain: null,
      hideUpload: false,
      content: "",
      imageList: [],
    };
  },
  methods: {
    uploadMoment() {
      if (this.content) {
        return this.$refs.upload.submit();
      } else {
        return this.$message.error({
          message: "动态不能为空！",
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadRemain += 1;
      this.uploadLength -= 1;
    },
    async handleSuccess(res) {
      let data = {
        content: this.content,
        images: this.imageList,
      };
      if (res.code == 200) {
        this.imageList.push(res.url);
        if (this.imageList.length == this.uploadLength) {
          const result = await addMoment(data);
          this.$message.success({
            message: result.data.msg,
          });
          setTimeout(() => {
            this.$refs.upload.clearFiles();
            this.content = "";
            this.uploadLength = 0;
            this.uploadRemain = 9;
          }, 1000);
        }
      } else {
        this.$message.error({
          message: "上传是出现错误了！",
        });
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
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    handleOnChange(file, fileList) {
      console.log("filelIst: ", fileList);
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
    },
  },
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
