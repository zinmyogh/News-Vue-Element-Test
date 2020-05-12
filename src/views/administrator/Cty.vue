<template>
  <div class="cty">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>标题管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="create_cty">
      <span>添加分类：</span>
      <el-input
        placeholder="请输入要添加的分类名"
        suffix-icon="el-icon-circle-plus-outline"
        v-model="categoryNameA"
      ></el-input>
      <span style="padding: 0 10px;"></span>
      <el-button class="add_cty" type="primary" @click="addcate">添加</el-button>
    </div>
    <!-- <el-divider></el-divider> -->
    <el-table :data="categoryData" style="width: 100%;">
      <el-table-column type="index" width="50px" align="center"></el-table-column>
      <el-table-column label="分类名称" prop="categoryName" width="120px" align="center"></el-table-column>
      <el-table-column label="分类ID" prop="categoryID" width="80px" align="center"></el-table-column>
      <el-table-column label="分类UUID" prop="categoryOrder" width="320px" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="updatecate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delcate(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addCty, getCty, updCty, delCty } from "../../api/admin";
export default {
  data() {
    return {
      categoryNameA: "",
      categoryData: [
        {
          categoryID: "",
          categoryName: "",
          categoryOrder: ""
        }
      ]
    };
  },
  methods: {
    addcate() {
      // console.log(this.categoryName);
      let data = { categoryName: this.categoryNameA };
      addCty(data)
        .then(result => {
          if (result.data.code == 200) {
            this.$message.success({
              message: result.data.msg
            });
            this.categoryName = null;
            this.$router.go(0);
          } else {
            this.$message.error({
              message: result.data.msg
            });
            this.categoryNameA = null;
          }
          // console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    },
    delcate(index, row) {
      // console.log("delcate : ", index, row);
      const h = this.$createElement;
      this.$msgbox({
        title: "提示！",
        message: h("p", null, [
          h("span", null, `您确定要删除 "${row.categoryName}类" 分类标题吗？`),
          h("i", { style: "color: #c00000" }, "永久性操作，请慎重操作！")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // console.log(row.categoryName);
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let data = { categoryOrder: row.categoryOrder };
            delCty(data)
              .then(() => {
                done();
                instance.confirmButtonLoading = false;
                this.$router.go(0);
              })
              .catch(e => {
                console.log(e);
              });
          } else {
            done();
          }
        }
      }).then(() => {
        this.$message({
          type: "success",
          message: "已删除完毕！"
        });
      });
    },
    updatecate(row) {
      // console.log(index, row);
      this.$prompt("请输入新标题名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          let data = { categoryName: value, categoryOrder: row.categoryOrder };
          updCty(data)
            .then(() => {
              this.$router.go(0);
              // console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更改"
          });
        });
    }
  },
  mounted() {
    getCty()
      .then(res => {
        this.categoryData = res.data.info;
        // console.log(res.data.info);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.cty {
  width: 100%;
  position: relative;
}
.el-breadcrumb {
  padding: 20px;
}
.create_cty {
  padding: 20px;
}
.create_cty span {
  color: #303030;
}
.el-input {
  width: 200px;
}
</style>