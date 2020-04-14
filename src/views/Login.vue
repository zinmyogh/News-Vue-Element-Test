<template>
  <div class="login-background">
    <h1 style="color: white; padding-left: 20px">缅甸头条</h1>
    <el-card header="" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="Username"> </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            placeholder="Password"
            v-model="model.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="login">
          <el-button type="primary" native-type="submit" style="width: 150px">
            账号登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="register">
        <el-link
          class="register"
          @click="goRegister"
          type="info"
          :underline="false"
          >没有账号，去注册</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    // async login() {
    //   const res = await this.$http.post("login", this.model);
    //   localStorage.token = res.data.token;
    //   this.$router.push("/");
    //   this.$message({
    //     type: "success",
    //     message: "Login successfully! Welcome"
    //   });
    // },
    goRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
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
  z-index: -1;
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
}
.register {
  display: flex;
  justify-content: center;
}
</style>
