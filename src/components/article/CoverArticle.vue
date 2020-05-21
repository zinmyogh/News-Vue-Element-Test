<template>
  <div class="cover">
    <div>{{ this.$t("article.acover") }}</div>
    <div style="padding-left: 80px">
      <el-radio-group v-model="radio" @change="radioChange(radio)">
        <el-radio :label="1">{{ this.$t("article.ac1") }}</el-radio>
        <el-radio :label="3">{{ this.$t("article.ac3") }}</el-radio>
        <el-radio :label="0">{{ this.$t("article.acn") }}</el-radio>
      </el-radio-group>
      <div style="display: flex;">
        <el-upload
          :class="{ hide: uploadDisable }"
          ref="upload"
          multiple
          v-show="showUpload"
          :action="serverUrl"
          list-type="picture-card"
          :limit="limit"
          :headers="token"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="hadleSuccess"
          style="padding: 30px 10px;"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { BaseUrl } from "../../api/default";
export default {
  data() {
    return {
      radio: 1,
      limit: 1,
      showUpload: true, //显示cover上传框
      uploadDisable: false, //限制上传cover
      dialogImageUrl: "",
      dialogVisible: false,
      imgList: [],
      token: { authorization: localStorage.token },
      serverUrl: `${BaseUrl}article/articleimage`,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.uploadDisable = fileList.length == this.limit;
      console.log("file： ", file, "fileList：", fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.uploadDisable = fileList.length == this.limit;
    },
    hadleSuccess(response) {
      this.imgList.push(response.url);
      this.$emit("cover", this.imgList);
    },
    clearFiles() {
      this.$refs["coverUpload"].clearFiles();
    },
    radioChange(val) {
      if (val == 3) {
        this.limit = val;
        this.showUpload = true;
        this.$refs.upload.clearFiles();
        this.uploadDisable = false;
        this.imgList = [];
      }
      if (val == 1) {
        this.limit = val;
        this.showUpload = true;
        this.$refs.upload.clearFiles();
        this.uploadDisable = false;
        this.imgList = [];
      }
      if (val == 0) {
        this.limit = 0;
        this.showUpload = false;
        this.$refs.upload.clearFiles();
        this.uploadDisable = false;
        this.imgList = [];
      }
    },
  },
};
</script>

<style>
.cover {
  display: flex;
}
.hide .el-upload--picture-card {
  display: none !important;
}
</style>
