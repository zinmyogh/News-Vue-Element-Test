<template>
  <div class="login-background">
    <h1 style="color: white; padding-left: 20px">缅甸头条</h1>
    <el-card header class="login-card">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        prop="loginForm"
        @submit.native.prevent="login"
      >
        <el-form-item label="用户名" prop="phone">
          <el-input v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password " v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="login">
          <el-button
            type="primary"
            :loading="loading"
            native-type="submit"
            style="width: 150px"
          >账号登录</el-button>
        </el-form-item>
      </el-form>

      <div class="register">
        <el-link class="register" @click="goRegister" type="info" :underline="false">没有账号，去注册</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validatePhone = (rule, value, callback) => {
      var regPhone = /^1[3456789]\d{9}$/;
      if (!value || value === "") {
        return callback(new Error("手机号不能为空"));
      } else if (!regPhone.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else callback();
    };
    var validatePass = (rule, value, callback) => {
      if (!value || value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      loginForm: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },

    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // console.log("res: ", res);
              this.loading = false;
              this.$router.push("/");
            })
            .catch(e => {
              console.log(e);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
.login-card {
  width: 35rem;
  margin: 10rem auto;
  z-index: 10;
}
.login-background {
  width: 100%;
  height: 90vh;
  position: absolute;
  /* z-index: -1; */
}

.login-background::after {
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
.login {
  display: flex;
  justify-content: center;
  padding: 5px;
}
.register {
  display: flex;
  justify-content: center;
  padding: 5px;
}
</style>
