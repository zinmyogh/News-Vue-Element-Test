<template>
  <div class="admin_image">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ this.$t("home.home") }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("admin.admin") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("admin.img") }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div>
      <p style="letter-spacing: 2px">
        {{ this.$t("imgadv.info") }}
      </p>
      <p style="color: #e80000; word-spacing: 2px">
        {{ this.$t("imgadv.warn") }}
      </p>
    </div>
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
      <el-button type="primary" @click="adminAddImage">{{
        this.$t("imgadv.upload")
      }}</el-button>
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
      imageList: [],
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
            images: this.imageList,
          };
          const result = await adminImage(data);
          this.$message.success({
            message: result.data.msg,
          });
          setTimeout(() => {
            this.$refs.upload.clearFiles();
            this.uploadLength = 0;
            this.uploadRemain = 3;
          }, 1000);
        }
      } else {
        this.$message.error({
          message: "上传时出现错误了！",
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
    },
  },
};
</script>

<style>
.admin_image {
  padding: 20px;
}
.el-breadcrumb {
  padding: 20px;
}
</style>
