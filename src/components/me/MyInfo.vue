<template>
  <div class="my_info">
    <span style="padding-left: 60px; padding-top: 0px;font-size: 16px; color: gray">完善信息, 让更多人关注到你</span>
    <el-form :model="infoForm" ref="infoForm" label-width="100px" class="demo-infoForm">
      <el-form-item label="头像" prop="profilePic" style="padding-top: 20px">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称" prop="name" style="width: 80%">
        <el-input v-model="infoForm.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="地址" prop="address" style="width: 80%">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="生日">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="infoForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>-->

      <!-- <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="infoForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="励志短语" prop="introduction" style="width: 80%">
        <el-input type="text" v-model="infoForm.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('infoForm')">立即更新</el-button>
        <el-button @click="resetForm('infoForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      imageUrl: "",
      infoForm: {
        name: "",
        // address: "",
        // date1: "",
        profilePic: "",
        // sex: "",
        introduction: ""
      }
      // rules: {
      //   name: [
      //     // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
      //   ],
      // },
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  mounted() {
    // this.$store.state.user.info = localStorage.info;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //profilePic
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.my_info {
  padding-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #fff;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/* .el-icon-plus:before {
} */
</style>
