<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>发布图片</el-breadcrumb-item>
      <el-breadcrumb-item>手机版广告图</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="image-upload">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        multiple
        :limit="5"
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
    <p>
      共 {{ uploadLength }} 张，还能上传
      <span v-if="uploadRemain == null">{{ uploadLimit }}</span>
      <span v-else>{{ uploadRemain }}</span> 张
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      uploadLength: 0,
      uploadLimit: 5,
      limitCount: 5,
      uploadRemain: null,
      hideUpload: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 5, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleOnChange(file, fileList) {
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

.image-upload {
  width: 468px;
  padding-top: 20px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>
