<template>
  <div class="account_body">
    <div class="body_wrap">
      <div class="grid_body">
        <div class="avator">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :headers="token"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="avator_right">
          <div class="name">{{ name || "___ ___" }}</div>
          <div class="introduction">
            {{ introduction || "靓，还没有写励志短语。。。" }}
          </div>
        </div>
      </div>
      <div class="account_info">
        <div class="account_info_left">账号信息</div>
        <div class="account_info_right">
          <div class="account_right1">
            <div class="account_right1_1">名称</div>
            <div class="account_right1_2">{{ name || "___ ___" }}</div>
          </div>
          <div class="account_right1">
            <div class="account_right1_1">手机</div>
            <div class="account_right1_2">{{ phone }}</div>
          </div>
          <div class="account_right1">
            <div class="account_right1_1">密码</div>

            <el-button
              style="padding-left: 150px;"
              type="text"
              @click="changePassForm = true"
              >更改密码</el-button
            >
          </div>
          <div class="account_right11">
            <div class="account_right1_1">励志短语</div>
            <div class="account_right1_2" style="overflow:hidden;">
              {{ introduction || "亲，还没有写励志短语。。。" }}
            </div>
          </div>
        </div>
      </div>

      <div class="account_info">
        <div class="account_info_left">登录账号</div>
        <div class="account_info_right">
          <div class="account_right1">
            <div class="account_right1_1">账号ID</div>
            <div class="account_right1_2">15983646156534869813</div>
          </div>
          <div class="account_right1">
            <div class="account_right1_1">账号类型</div>
            <div class="account_right1_2" style="color: gray">
              {{ phone == "13100000000" ? "管理员" : "个人" }}
            </div>
          </div>
          <div class="account_right11">
            <el-button type="text" @click="updateInfoForm = true"
              >更新信息</el-button
            >
            <el-button
              type="text"
              @click="logout"
              style="padding-left: 82px; color: #e80000"
              >退出登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- change password form-->
    <el-dialog title="更改密码" :visible.sync="changePassForm">
      <el-form :model="passFrom">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input
            clearable
            v-model="passFrom.oldpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            clearable
            v-model="passFrom.newpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePassForm = false">取 消</el-button>
        <el-button type="primary" @click="changePassword()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- change user info form-->
    <el-dialog title="更新信息" :visible.sync="updateInfoForm">
      <el-form :model="infoForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            clearable
            v-model="infoForm.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="励志短语" :label-width="formLabelWidth">
          <el-input
            clearable
            v-model="infoForm.introduction"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateInfoForm = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changePass } from "../../api/user";
import { mapGetters } from "vuex";
import { BaseUrl, ImgUrl } from "../../api/default";
export default {
  data() {
    return {
      serverUrl: `${BaseUrl}user/uploadprofile`,
      imageUrl: "",
      token: { authorization: localStorage.token },
      updateInfoForm: false,
      changePassForm: false,
      infoForm: {
        userName: "",
        introduction: "",
      },
      passFrom: {
        oldpassword: "",
        newpassword: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["phone", "name", "introduction"]),
  },
  mounted() {
    this.$store.commit("user/SET_PHONE", localStorage.phone);
    if (localStorage.userName == "null") {
      return;
    } else {
      this.$store.commit("user/SET_NAME", localStorage.userName);
    }
    if (localStorage.introduction == "null") {
      return;
    } else {
      this.$store.commit("user/SET_INTRODUCTION", localStorage.introduction);
    }
    this.imageUrl = localStorage.profile;
  },
  methods: {
    logout() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    },
    changePassword() {
      let data = {
        oldpassword: this.passFrom.oldpassword,
        newpassword: this.passFrom.newpassword,
      };
      changePass(data)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success({
              message: res.data.msg,
            });
          } else {
            this.$message.error({
              message: res.data.msg,
            });
          }
        })
        .catch((e) => {
          console.log("eee: ", e);
        });
      this.changePassForm = false;
    },
    async changeInfo() {
      let data = {
        userName: this.infoForm.userName,
        introduction: this.infoForm.introduction,
      };
      this.$store.dispatch("user/setInfo", data);
      this.updateInfoForm = false;
    },
    handleAvatarSuccess(res) {
      let profile = ImgUrl + res.url;
      localStorage.setItem("profile", profile);
      this.imageUrl = profile;
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
    },
  },
};
</script>

<style>
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
.account_body {
  position: relative;
  min-height: 700px;
  background-color: #fff;
  border-radius: 2px;
}
.body_wrap {
  position: relative;
  padding: 0 50px;
  overflow: hidden;
}
.grid_body {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 0;
  border-bottom: 1px solid #dfdfdf;
}

.avator_right {
  position: relative;
  display: inline-block;
  vertical-align: top;
}
.name {
  font-size: 30px;
  padding-left: 20px;
  vertical-align: top;
}
.introduction {
  position: relative;
  top: 18px;
  font-size: 30px;
  color: gray;
  padding-left: 20px;
  display: inline-block;
  vertical-align: top;
}
.account_info {
  display: flex;
  border-bottom: solid 1px #dfdfdf;
}
.account_info_left {
  display: inline-block;
  width: 150px;
  vertical-align: top;
  line-height: 60px;
}
.account_info_right {
  display: inline-block;
  width: 100%;
  vertical-align: top;
  margin-right: -120px;
  padding-right: 120px;
}
.account_right1 {
  display: flex;
  height: 60px;
  border-bottom: 1px solid #dfdfdf;
}
.account_right11 {
  display: flex;
  height: 60px;
}
.account_right1_1 {
  position: absolute;
  padding-top: 20px;
}
.account_right1_2 {
  position: absolute;
  padding-top: 20px;
  padding-left: 150px;
}
.account_right1_3 {
  display: inline-block;
  padding-top: 20px;
  padding-left: 500px;
}
</style>
