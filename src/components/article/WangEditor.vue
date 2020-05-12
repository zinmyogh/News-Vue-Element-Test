<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
import E from "wangeditor";
let editor = null;
export default {
  name: "Editorbar",
  data() {
    return {
      info_: null,
      isChange: false
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // isClear (val) {
    //   // 触发清除文本域内容
    //   if (val) {
    //     editor.txt.clear()
    //     this.info_ = null
    //   }
    // },
    // value (val) {
    //   // 使用 v-model 时,设置初始值
    //   editor.txt.html(val)
    // },
    value: function(value) {
      console.log(value);
      // if (value !== this.editor.txt.html()) {
      //   this.editor.txt.html(this.value)
      // }
      if (!this.isChange) {
        editor.txt.html(this.value);
      }
      this.isChange = false;
    }
  },
  mounted() {
    this.seteditor();
    editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      // var that = this;
      editor = new E(this.$refs.toolbar, this.$refs.editor);

      // editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
      // editor.customConfig.uploadImgServer = "http://192.168.0.106:3000"; // 配置服务器端地址
      // editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      // editor.customConfig.uploadFileName = "image"; // 后端接受上传文件的参数名
      editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 3 张图片
      editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      editor.customConfig.customUploadImg = async (files, insert) => {
        // files 是 input 中选中的文件列表

        const formData = new FormData();
        formData.append("file", files[0]);
        const res = await this.$axios.post(
          "http://192.168.0.106:3000/blog/imgUpload",
          formData
        );
        if (res.data.code == "202") {
          // console.log(insert);
          // console.log(res);
          var url = res.data.url;
          insert(url); //生成img标签并插入文章中
        } else {
          console.log("err");
        }

        // const formData = new FormData();
        // formData.append("file", files[0]);
        // that
        //   .$axios({
        //     //上传图片到后台
        //     method: "post",
        //     // url: that.common.getApi() + "/blog/imgUpload",
        //     url: "/blog/imgUpload",
        //     data: formData
        //   })
        //   .then(res => {
        //     if (res.data.success) {
        //       console.log(res.data.obj);

        //       var imgUrl = res.data.obj.savePath; //后台返回的文件路径

        //       insert(imgUrl); //生成img标签并插入文章中
        //     } else {
        //       that.$message.error(res.data.msg);
        //     }
        //   });
        // insert 是获取图片 url 后，插入到编辑器的方法

        // 上传代码返回结果之后，将图片插入到编辑器中
      };
      // this.editor.customConfig.uploadParams = {formFile:'2'};
      // 配置菜单
      editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table" // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        // 'undo',  // 撤销
        // 'redo'  // 重复
      ];
      // 颜色
      editor.customConfig.colors = [
        "#000000",
        "#FF0000",
        "#eeece0",
        "#1c487f",
        "#009999",
        "#606266",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#ffffff"
      ];

      editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          console.log(xhr, editor, result);
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          console.log(xhr, editor, result);
          // 图片上传成功回调
          //
          // let imgUrl = result.data;
          // insertImg(imgUrl)
        },
        timeout: (xhr, editor) => {
          console.log(xhr, editor);
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          console.log(editor);
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功,插入图片的回调
          console.log(result, editor);
          // if(result.code == 200){
          var url = result.data;
          insertImg(url); //将内容插入到富文本中
          // console.log(insertImg(url)+"DFDF")
          // console.log(data+"dsfd")
          // }
        }
      };

      editor.customConfig.onchange = html => {
        this.isChange = true;
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("change", this.info_); // 将内容同步到父组件中
        console.log(this.info_);
      };

      // 创建富文本编辑器

      editor.create();
      //初始化内容
      // debugger;
      editor.txt.html(this.value);
    }
  }
};
</script>

<style lang="css">
.editor {
  width: 100%;
}
.toolbar {
  flex-wrap: wrap;
  border: 1px solid #ccc;
}
.w-e-menu {
  z-index: 1 !important;
}
.text {
  width: 100%;
  border: 1px solid #ccc;
  height: 300px;
}

.w-e-menu {
  z-index: 2 !important;
}

.w-e-text-container {
  z-index: 1 !important;
}
</style>


<!-- 在父组件中引入，并使用
import wangeditor  from '../wangeditor  .vue'
//注册
components: {
      wangeditor 
    },
// html中使用
<wangeditor  v-model="addform.content"></wangeditor  > 
-->