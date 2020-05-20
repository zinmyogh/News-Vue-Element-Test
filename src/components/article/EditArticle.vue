<template>
  <div>
    <div style="display: flex; flex-direction: row">
      <div style="width: 800px; padding: 0px">
        <el-form
          ref="form"
          :model="editCaption"
          label-width="100px"
          style="padding: 20px 0 10px 0px"
        >
          <el-form-item label="文章标题：" prop="title">
            <el-input
              maxlength="50"
              clearable
              show-word-limit
              v-model="editCaption.renameCaption"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="padding: 20px 10px 0 50px">
        <el-button type="primary" @click="submitChange">上传修改</el-button>
      </div>
    </div>
    <div style="padding:0  20px 0 20px">
      <!-- 图片上传组件辅助-->
      <el-upload
        class="innerImgUpload"
        :action="serverUrl"
        name="file"
        :headers="token"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      ></el-upload>

      <quill-editor
        class="editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
  </div>
</template>

<script>
import { BaseUrl, ImgUrl } from "../../api/default";
import { getArticleByID, updateArticle } from "../../api/article";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线
  ["blockquote", "code-block"], // 引用
  [{ header: [1, 2, 3, 4, 5, 6] }], // 1、2 级标题
  [{ size: ["small", false, "large"] }],
  [{ list: "ordered" }], // 有序、无序列表
  [{ list: "bullet" }], // 有序、无序列表
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["image"], // 链接、图片、视频 // 链接、图片、视频
];
export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: String,
    },
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 4000, //kb
    },
  },
  data() {
    return {
      token: { authorization: localStorage.token },
      content: this.value,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editCaption: {
        renameCaption: "",
      },
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".innerImgUpload input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
      serverUrl: `${BaseUrl}article/articleimage`, // 这里写你要上传的图片服务器地址
    };
  },
  methods: {
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
    },
    submitChange() {
      let data = {
        articlePostID: this.$route.params.articlePostID,
        caption: this.editCaption.renameCaption,
        content: this.encode(this.content),
      };
      if (this.editCaption.renameCaption != "") {
        updateArticle(data)
          .then((res) => {
            if (res.data.code == 200) {
              setTimeout(() => {
                this.editCaption.renameCaption = "";
                this.content = "";
              }, 1000);
              return this.$message.success({
                message: res.data.msg,
              });
            } else {
              return this.$message.error({
                message: res.data.msg,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        return this.$message.error({
          message: "标题不能为空！",
        });
      }
    },
    // 富文本图片上传前
    beforeUpload(file) {
      // 显示loading动画
      this.quillUpdateImg = true;
      this.handleImageSize(file);
    },

    uploadSuccess(res, file) {
      console.log(file);
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", ImgUrl + res.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    handleImageSize(file) {
      const isLimit = file.size / 1024 / 1024 <= 5;
      if (
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].indexOf(
          file.type
        ) === -1
      ) {
        this.$message.error("上传图片只能是 jpg/jpeg/gif/png格式!");
        return false;
      }
      if (!isLimit) {
        this.$message.error('上传图片大小不能超过" + 5 + "MB!');
        this.quillUpdateImg = false;
        return false;
      }
    },
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
    },
  },
  activated() {
    let id = { articlePostID: this.$route.params.articlePostID };
    getArticleByID(id)
      .then((res) => {
        this.editCaption.renameCaption = res.data.info[0].caption;
        this.content = this.decode(res.data.info[0].content);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
.editor {
  line-height: normal !important;
  position: relative;
  height: 600px;
}

.ql-snow .ql-editor img {
  max-width: 500px !important;
  padding: 5px 50px !important;
}
.ql-toolbar.ql-snow {
  border-bottom: 1px solid #ccc !important;
}
.ql-toolbar.ql-snow .ql-formats {
  padding: 0 10px;
}

.innerImgUpload {
  position: relative !important;
  display: none;
}
</style>
