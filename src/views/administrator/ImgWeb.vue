<!-- <template>
  <div>
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
    <p>
      共选择了 {{ uploadLength }} 张，还可选
      <span v-if="uploadRemain == null">{{ uploadLimit }}</span>
      <span v-else>{{ uploadRemain }}</span> 张
    </p>
  </div>
</template>

<script>
import BaseUrl from "../../api/default";
import { addMoment } from "../../api/moment";
export default {
  data() {
    return {
      serverUrl: `${BaseUrl.BaseUrl}moment/uploadimages`,
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
      console.log(file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadRemain += 1;
      this.uploadLength -= 1;
    },
    handleSuccess(res) {
      console.log(res);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
      //imageLength = files.length;
    },
    handleOnChange(file, fileList) {
      console.log("filelIst: ", fileList);
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
      // console.log(this.hideUpload);
    }
  }
};
</script>

<style>
</style>



<!-- <template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>发布图片</el-breadcrumb-item>
      <el-breadcrumb-item>网页版广告图</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="image-upload">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        multiple
        :limit="3"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
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
      uploadLimit: 3,
      limitCount: 3,
      uploadRemain: null,
      hideUpload: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadLength -= 1;
      this.uploadRemain += 1;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    // beforeAvatarUpload(file) {
    //   //文件上传之前调用做一些拦截限制
    //   //console.log(file);
    //   const isJPG = true;
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     this.$message.error("上传图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    handleOnChange(file, fileList) {
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
      console.log(this.hideUpload);
    }
  }
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
.el-breadcrumb {
  padding: 10px 0 20px 0;
}
</style>
-->