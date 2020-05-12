<template>
  <div class="register-background">
    <h1 style="color: white; padding-left: 20px">缅甸头条</h1>
    <el-card header class="register-card">
      <el-form
        :model="model"
        status-icon
        :rules="rules"
        ref="model"
        @submit.native.prevent="register"
        prop="model"
      >
        <!-- <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>-->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="model.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="conform_pass">
          <el-input
            type="password"
            v-model="model.conform_pass"
            show-password
          ></el-input>
        </el-form-item>
        <div class="register">
          <el-button type="primary" native-type="submit" style="width: 150px"
            >注册账号</el-button
          >
        </div>
      </el-form>
      <div class="register">
        <el-link
          class="register"
          @click="goRegister()"
          type="info"
          :underline="false"
          >已有账号，去登录</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
// import service from '../../utils/request'
export default {
  name: "register",
  data() {
    var checkPhone = (rule, value, callback) => {
      var regPhone = /^1[3456789]\d{9}$/;
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!regPhone.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.model.checkPass !== "") {
          this.$refs.model.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      model: {
        phone: "",
        password: "",
        conform_pass: "",
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        conform_pass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/login");
    },
    async register() {
      const res = await this.$service.post(
        // `/user/register?phone=${this.model.phone}&&password=${this.model.password}`
        "/user/register",
        this.model
      );
      if (res.data.code == 200) {
        // console.log(res);
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.$router.push("/login");
        // this.$router.push({
        //   path: "/login",
        //   query: { acc: this.model.phone }
        // });
      } else {
        // console.log(res);
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },
  },
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
.register-card {
  width: 35rem;
  margin: 10rem auto;
  z-index: 10;
}
.register-background {
  width: 100%;
  height: 90vh;
  position: absolute;
  z-index: -1;
}

.register-background::after {
  content: "";
  width: 120%;
  height: 90vh;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -1;
  border-radius: 0% 40% 30% 70%;
  background: #fa3d5c;
}
.register {
  display: flex;
  justify-content: center;
  padding: 5px;
}
</style>
