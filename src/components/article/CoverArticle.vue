<template>
  <div class="cover">
    <div>放置封面图</div>
    <div style="padding-left: 80px">
      <el-radio-group v-model="radio" @change="radioChange(radio)">
        <el-radio :label="1">一张封面</el-radio>
        <el-radio :label="3">三张封面</el-radio>
        <el-radio :label="0">不放封面</el-radio>
      </el-radio-group>
      <div style="display: flex;">
        <el-upload
          :class="{hide : uploadDisable}"
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
import BaseUrl from "../../api/default";
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
      serverUrl: `${BaseUrl.BaseUrl}article/articleimage`
    };
  },
  methods: {
    //cover el-upload
    handleRemove(file, fileList) {
      this.uploadDisable = fileList.length == this.limit;
      // this.$refs.upload.abort(file);
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
      // console.log(response);
      this.imgList.push(response.url);
      console.log(this.imgList);
      this.$emit("cover", this.imgList);
      // console.log(this.imgList);
    },
    clearFiles() {
      this.$refs["coverUpload"].clearFiles();
    },
    //radio change action
    radioChange(val) {
      // console.log("radio", val);
      if (val == 3) {
        this.limit = val;
        this.showUpload = true;
        this.$refs.upload.clearFiles();
        this.uploadDisable = false;
        this.imgList = [];
        console.log("3 .... ", this.imgList);
        // console.log("limit3:  ....  ", this.limit);
      }
      if (val == 1) {
        this.limit = val;
        this.showUpload = true;
        this.$refs.upload.clearFiles();
        this.uploadDisable = false;
        this.imgList = [];
        console.log("1 .... ", this.imgList);
        // console.log("limit 1: ", this.limit);
      }
      if (val == 0) {
        this.limit = 0;
        this.showUpload = false;
        this.$refs.upload.clearFiles();
        this.uploadDisable = false;
        this.imgList = [];
        console.log("0 .... ", this.imgList);
        // console.log("limit 0 : ", this.limit);
      }
    }
  }
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