<template>
  <div class="register-background">
    <h1 style="color: white; padding-left: 20px">缅甸头条</h1>
    <el-card header="" class="register-card">
      <el-form @submit.native.prevent="register">
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
        <el-form-item label="确认密码">
          <el-input
            type="password"
            placeholder="Conform Password"
            v-model="model.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="register">
          <el-button type="primary" style="width: 150px">
            注册账号
          </el-button>
        </el-form-item>
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
export default {
  name: "register",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    // async register() {
    //   const res = await this.$http.post("register", this.model);
    //   localStorage.token = res.data.token;
    //   this.$router.push("/");
    //   this.$message({
    //     type: "success",
    //     message: "register successfully! Welcome"
    //   });
    // },
    goRegister() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
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
}
.register {
  display: flex;
  justify-content: center;
}
</style>
