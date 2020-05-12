<template>
  <div>
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
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <!-- <el-button type="danger" @click="to_data">base64</el-button> -->
  </div>
</template>

<script>
import BaseUrl from "../../api/default";
// 工具栏配置
const toolbarOptions = [
  ["bold"], // 加粗 斜体 下划线
  ["italic"], // 加粗 斜体 下划线
  ["underline"], // 加粗 斜体 下划线
  ["blockquote"]["code-block"], // 引用 // 引用
  [{ header: 1 }], // 1、2 级标题
  [{ list: "ordered" }], // 有序、无序列表
  [{ list: "bullet" }], // 有序、无序列表
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link"],
  ["image"] // 链接、图片、视频 // 链接、图片、视频
];
export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: String
    },
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 4000 //kb
    }
  },
  data() {
    return {
      token: { authorization: localStorage.token },
      content: this.value,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        // placeholder: "",
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
              }
            }
          }
        }
      },
      serverUrl: `${BaseUrl.BaseUrl}article/articleimage` // 这里写你要上传的图片服务器地址
      // header: {
      //   // token: sessionStorage.token
      // } // 有的图片服务器要求请求头需要有token
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件"
      // console.log("//失去焦点事件");
    },
    onEditorFocus() {
      //获得焦点事件"
      // console.log("//获得焦点事件");
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
      // console.log("//内容改变事件 ", this.content);
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
        console.log("haaaaaaaaaaaaaahahahah ... ", res.url);
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.url);
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
    to_data() {
      console.log("context: ", this.content);
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
      let encoded = Base64.encode(this.content);
      // 将富文本的base64编码 转换成原来的格式，这个用于将数据库中的富文本展示在界面上
      let decoded = Base64.decode(encoded);
      console.log("encoded: ", encoded);
      console.log(decoded);
    }
  },
  mounted() {
    console.log(BaseUrl.BasuUrl);
  }
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
  /* background-color: orangered; */
  /* position: fixed; */
  /* width: 978px; */
  /* position: relative; */
}
.ql-toolbar.ql-snow .ql-formats {
  padding: 0 10px;
}

.innerImgUpload {
  position: relative !important;
  display: none;
}
</style>
