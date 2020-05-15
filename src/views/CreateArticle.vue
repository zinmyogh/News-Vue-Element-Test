<template>
  <div class="article">
    <el-card shadow="hover">
      <el-form ref="titleForm" :model="titleForm" label-width="100px">
        <el-form-item
          label="文章标题："
          prop="title"
          :rules="[{ required: true, message: '标题不能为空',trigger: 'blur'},]"
        >
          <el-input maxlength="50" clearable show-word-limit v-model="titleForm.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="titleForm.categoryID" placeholder="请选择文章类型" style="width: 150px">
            <el-option
              v-for="item in categories"
              :key="item.categoryID"
              :label="item.categoryName"
              :value="item.categoryID"
            >
              <span style="float: center">{{ item.categoryName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- </div> -->
      <el-divider></el-divider>
      <QuillEditor ref="quill" @input="articleContent" />
      <!-- <wangEditor @change="articleContent" /> -->
      <el-divider></el-divider>
      <CoverUpload ref="cover" @cover="coverList" />
      <div class="upload-btn">
        <el-button @click="uploadArticle()" type="primary">点击上传文章</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import QuillEditor from "../components/article/QuillEditor";
// import wangEditor from "./WangEditor";
import CoverUpload from "../components/article/CoverArticle";
import { getCty } from "../api/admin";
import { addArticle } from "../api/article";

export default {
  components: {
    QuillEditor,
    CoverUpload
    // wangEditor
  },

  data() {
    return {
      titleForm: {
        title: "",
        categoryID: ""
      },
      content: "", //文章内容
      cover1: "",
      cover2: "",
      cover3: "",
      encode: "",
      categories: [
        {
          categoryID: "",
          categoryName: ""
        }
      ]
    };
  },

  methods: {
    async uploadArticle() {
      // console.log(this.titleForm.categoryID);
      // console.log("uup article");

      let data = {
        caption: this.titleForm.title,
        categoryID: this.titleForm.categoryID,
        content: this.content,
        cover1: this.cover
      };
      // console.log("encode content; ", content);
      const res = await addArticle(data);
      if (res.data.code == 200) {
        this.$message.success({
          message: res.data.msg
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1000);
        // this.$refs.titleForm.resetFields();
        // this.titleForm.categoryID = "";
        // // this.content = "";
        // // console.log("this.content: ", this.content);
        // // this.$refs.quill.$refs.myQuillEditor.content = "";
        // this.$refs.quill = "";
        // this.$refs.cover.$refs.upload.clearFiles();
      } else {
        this.$message.error({
          message: "Server Error! Please try again later!"
        });
      }
      console.log("article : >>>>> ", res);
      // this.$message({
      //   type: "success",
      //   message: "Login successfully! Welcome",
      // });
    },
    coverList(payload) {
      this.cover = payload.toString();
      console.log("coverList: ", this.cover);
      // this.cover1 = payload[0];
      // console.log("cover 1: ", this.cover1);
      // this.cover2 = payload[1];
      // console.log("cover 2: ", this.cover2);
      // this.cover3 = payload[2];
      // console.log("cover 3: ", this.cover3);
      // this.cover3 = payload[3];
      // for (let i = 0; i < payload.length; i++) {
      //   this.cover = payload[i];
      // }
      // let covver = this.cover.split(",");

      // console.log("cofvvvver : ", covver);
    },
    articleContent(payload) {
      // this.content = payload;
      let Base64 = {
        encode(str) {
          return btoa(
            encodeURIComponent(str).replace(
              /%([0-9A-F]{2})/g,
              function toSolidBytes(match, p1) {
                return String.fromCharCode("0x" + p1);
              }
            )
          );
        },
        decode(str) {
          return decodeURIComponent(
            atob(str)
              .split("")
              .map(function(c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
        }
      };
      // 将富文本内容专程base64编码，这个用于上传到服务存储到数据库中
      let encoded = Base64.encode(payload);
      this.content = encoded;
      // // 将富文本的base64编码 转换成原来的格式，这个用于将数据库中的富文本展示在界面上
      // let decoded = Base64.decode(encoded);
      console.log("encoded: ", encoded);
      // console.log(decoded);
    }
  },
  mounted() {
    // console.log(" mountedmountedmountedmounted 》》》》》 ");
    getCty()
      .then(res => {
        this.categories = res.data.info;
        console.log(this.categories);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.article {
  position: absolute;
  width: 100%;
}
.upload-btn {
  position: relative;
  padding-left: 170px;
  padding-top: 20px;
  margin-bottom: 100px;
}
</style>


