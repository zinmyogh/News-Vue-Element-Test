<template>
  <div class="adv">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>发布广告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-upload
      ref="avdForm"
      class="avatar-uploader"
      :action="serverUrl"
      :headers="token"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      style="padding: 30px 0 0 100px"
    >
      <img v-if="advImgUrl" :src="advImgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form
      :model="advForm"
      status-icon
      :rules="rules"
      ref="advForm"
      label-width="100px"
      class="demo-advForm"
    >
      <el-form-item label="广告标题" prop="advTitle">
        <el-input clearable v-model.number="advForm.advTitle" placeholder="视屏标语"></el-input>
      </el-form-item>
      <el-form-item label="广告URL" prop="advUrl">
        <el-input clearable v-model.number="advForm.advUrl" placeholder="http://xxx.com/"></el-input>
      </el-form-item>
      <el-form-item label="广告有效期" prop="advDay">
        <el-input type="int" clearable v-model.number="advForm.advDay" placeholder="广告要显示几天"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('advForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BaseUrl from "../../api/default";
import { addAdv } from "../../api/adv";
export default {
  data() {
    var checkadvTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("广告标题不能为空！"));
      }
      callback();
    };
    var checkadvUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("广告方URL地址不能为空！"));
      } else {
        callback();
      }
    };
    var checkadvDay = (rule, value, callback) => {
      let checkNum = /[0-9]/;
      if (value === "") {
        callback(new Error("广告有效期不能为空！"));
      } else if (!checkNum.test(value)) {
        callback(new Error("请输入数字，以天数为单位！"));
      } else {
        callback();
      }
    };
    return {
      serverUrl: `${BaseUrl.BaseUrl}article/articleimage`,
      token: { authorization: localStorage.token },
      limitCount: 1,
      advImgUrl: "",
      hideUpload: false,
      advForm: {
        advTitle: "",
        advUrl: "",
        advDay: ""
      },
      rules: {
        advTitle: [{ validator: checkadvTitle, trigger: "blur" }],
        advUrl: [{ validator: checkadvUrl, trigger: "blur" }],
        advDay: [{ validator: checkadvDay, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      this.advImgUrl = res.url;
    },
    submitForm() {
      this.$refs.advForm.validate(async valid => {
        if (valid && this.advImgUrl) {
          let data = {
            caption: this.advForm.advTitle,
            advImage: this.advImgUrl,
            advUrl: this.advForm.advUrl,
            validDay: this.advForm.advDay
          };
          const res = await addAdv(data);
          if (res.data.code == 200) {
            this.$message.success({
              message: res.data.msg
            });
            setTimeout(() => {
              this.$refs.advForm.resetFields();
              this.advImgUrl = "";
            }, 1000);
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
          console.log("adv response: >>>>", res);
        } else {
          this.$message.error({
            message: "错误提交！"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.advImgUrl = "";
    }
  }
};
</script>

<style scoped>
.adv {
  padding: 20px;
}
.el-form {
  padding-top: 30px;
}
.el-input {
  width: 80%;
}
</style>