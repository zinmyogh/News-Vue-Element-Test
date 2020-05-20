<template>
  <div class="article">
    <el-card shadow="hover">
      <el-form ref="titleForm" :model="titleForm" label-width="100px">
        <el-form-item
          label="文章标题："
          prop="title"
          :rules="[
            { required: true, message: '标题不能为空', trigger: 'blur' },
          ]"
        >
          <el-input
            maxlength="50"
            clearable
            show-word-limit
            v-model="titleForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="titleForm.categoryID"
            placeholder="请选择文章类型"
            style="width: 150px"
          >
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

      <el-divider></el-divider>
      <QuillEditor ref="quill" @input="articleContent" />
      <el-divider></el-divider>
      <CoverUpload ref="cover" @cover="coverList" />
      <div class="upload-btn">
        <el-button @click="uploadArticle()" type="primary"
          >点击上传文章</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
import QuillEditor from "../components/article/QuillEditor";
import CoverUpload from "../components/article/CoverArticle";
import { getCty } from "../api/admin";
import { addArticle } from "../api/article";

export default {
  components: {
    QuillEditor,
    CoverUpload,
  },

  data() {
    return {
      titleForm: {
        title: "",
        categoryID: "",
      },
      content: "", //文章内容
      cover1: "",
      cover2: "",
      cover3: "",
      encode: "",
      categories: [
        {
          categoryID: "",
          categoryName: "",
        },
      ],
    };
  },

  methods: {
    async uploadArticle() {
      let data = {
        caption: this.titleForm.title,
        categoryID: this.titleForm.categoryID,
        content: this.content,
        cover1: this.cover,
      };
      const res = await addArticle(data);
      if (res.data.code == 200) {
        this.$message.success({
          message: res.data.msg,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1000);
      } else {
        this.$message.error({
          message: "Server Error! Please try again later!",
        });
      }
    },
    coverList(payload) {
      this.cover = payload.toString();
    },
    articleContent(payload) {
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
      };
      let encoded = Base64.encode(payload);
      this.content = encoded;
    },
  },
  mounted() {
    getCty()
      .then((res) => {
        this.categories = res.data.info;
      })
      .catch((e) => {
        console.log(e);
      });
  },
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
