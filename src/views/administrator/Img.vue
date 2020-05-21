<template>
  <div class="admin_image">
    <div>
      <p style="letter-spacing: 2px">上传某些关于活动或广告类图片，用于轮播图显示</p>
      <p style="color: #e80000; letter-spacing: 2px">注：此操作只由管理员执行</p>
    </div>
    <p>
      共选择了 {{ uploadLength }} 张，还可选
      <span v-if="uploadRemain == null">{{ uploadLimit }}</span>
      <span v-else>{{ uploadRemain }}</span> 张
    </p>
    <el-upload
      ref="upload"
      :action="serverUrl"
      :headers="token"
      list-type="picture-card"
      multiple
      :limit="3"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :on-change="handleOnChange"
      :class="{ hide: hideUpload }"
    >
      <i class="el-icon-plus icon-hidden"></i>
    </el-upload>
    <div style="padding-top: 20px">
      <el-button type="primary" @click="adminAddImage">上传</el-button>
    </div>
  </div>
</template>

<script>
import { BaseUrl } from "../../api/default";
import { adminImage } from "../../api/admin";
export default {
  data() {
    return {
      serverUrl: `${BaseUrl}admin/uploadimages`,
      token: { authorization: localStorage.token },
      uploadLength: 0,
      uploadLimit: 3,
      limitCount: 3,
      uploadRemain: null,
      hideUpload: false,
      imageList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadRemain += 1;
      this.uploadLength -= 1;
    },
    async handleSuccess(res) {
      if (res.code == 200) {
        this.imageList.push(res.url);
        if (this.imageList.length == this.uploadLength) {
          let data = {
            images: this.imageList
          };
          const result = await adminImage(data);
          this.$message.success({
            message: result.data.msg
          });
          setTimeout(() => {
            this.$refs.upload.clearFiles();
            this.uploadLength = 0;
            this.uploadRemain = 3;
          }, 1000);
        }
      } else {
        this.$message.error({
          message: "上传时出现错误了！"
        });
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    handleOnChange(file, fileList) {
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
    },
    adminAddImage() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style>
.admin_image {
  padding: 30px;
}
</style>
