<template>
  <div class="account_body">
    <div class="body_wrap">
      <div class="grid_body">
        <div class="avator">
          <el-avatar shape="square" :size="100" fill :src="url"></el-avatar>
        </div>
        <div class="avator_right">
          <div class="name">13100000000</div>
          <div class="introduction">出非我不想赢，不然没人能我输</div>
        </div>
      </div>
      <div class="account_info">
        <div class="account_info_left">账号信息</div>
        <div class="account_info_right">
          <div class="account_right1">
            <div class="account_right1_1">手机</div>
            <div class="account_right1_2">13100001111</div>
          </div>
          <div class="account_right11">
            <div class="account_right1_1">密码</div>
            <el-button class="account_right1_2" type="text" @click="changePassword">更改密码</el-button>
          </div>
        </div>
      </div>

      <div class="account_info">
        <div class="account_info_left">登录账号</div>
        <div class="account_info_right">
          <div class="account_right11">
            <div class="account_right1_1">账号</div>
            <div class="account_right1_2" style="color: gray">管理员</div>
          </div>
          <div class="account_right11">
            <el-button type="text" @click="logout">退出登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        " https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    },
    changePassword() {
      console.log("change Password：》》》》");
    }
  }
};
</script>

<style scoped>
.account_body {
  position: relative;
  min-height: 750px;
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
  /* background-color: red; */
}

.avator_right {
  position: relative;
  display: inline-block;
  vertical-align: top;
}
.name {
  /* position: relative; */
  padding-bottom: 30px;
  padding-left: 20px;
  /* background-color: #fff; */
  vertical-align: top;
}
.introduction {
  position: relative;
  top: -12px;
  font-size: 15px;
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
  display: inline-block;
  padding-top: 20px;
}
.account_right1_2 {
  display: inline-block;
  padding-top: 20px;
  padding-left: 150px;
}
</style>
