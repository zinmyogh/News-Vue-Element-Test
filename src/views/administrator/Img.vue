<template>
  <div class="admin_image">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        this.$t("home.home")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("admin.admin") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("admin.img") }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div style="padding-left: 20px">
      <p style="letter-spacing: 2px">{{ this.$t("imgadv.info") }}</p>
      <p style="color: #e80000; word-spacing: 2px">
        {{ this.$t("imgadv.warn") }}
      </p>
    </div>
    <p style="padding-left: 20px">
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
      style="padding-left: 20px"
    >
      <i class="el-icon-plus icon-hidden"></i>
    </el-upload>
    <div style="padding-top: 20px; padding-left: 20px">
      <el-button type="primary" @click="adminAddImage">
        {{ this.$t("imgadv.upload") }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <div class="add_public">
      <p>{{ this.$t("imgadv.public") }}</p>
      <el-input
        class="alert_msg"
        :placeholder="this.$t(`imgadv.enterp`)"
        v-model="public_msg"
        clearable
      ></el-input>
      <div style="padding-top: 20px">
        <el-button class="add_cty" type="primary" @click="publicMsg">
          {{ this.$t("imgadv.upload") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseUrl } from "../../api/default";
import { adminImage, adminPublic } from "../../api/admin";
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
      public_msg: "",
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
    publicMsg() {
      console.log("public message; ");
      let data = { publicMsg: this.public_msg };
      adminPublic(data)
        .then((res) => {
          if (res.data.code == 200) {
            this.public_msg = "";
            this.$message.success({
              message: res.data.msg,
            });
          }
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
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
.add_public {
  padding: 0 20px 20px 20px;
}
.add_public span {
  display: flex;
  flex-direction: column;
}
.alert_msg {
  width: 500px;
}
</style>
