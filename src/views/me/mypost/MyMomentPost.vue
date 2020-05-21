<template>
  <div class="my_moment_post">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item>{{ this.$t("me.me") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("me.mypost") }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$t("home.moment") }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="moment_post"
      v-for="moment in momentPost"
      :key="moment.momentPostID"
    >
      <div>
        <p>{{ moment.content }}</p>
      </div>
      <div class="images_list">
        <img
          v-for="(img, index) in splitImg(splitImgAddUrl(moment.images))"
          :key="index"
          :src="img"
          alt
        />
      </div>
      <div>
        <div>
          <span>{{ moment.likeCount || 0 }}</span>
          <span>{{ like }}</span>

          <span>{{ moment.createDate | dateDiff }}</span>
          <el-button
            @click="momentDelete(moment.momentPostID)"
            type="text"
            style="color: #e80000; padding-left: 5px;"
          >
            {{ del }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoment, deleteMoment } from "../../../api/moment";
import { ImgUrl } from "../../../api/default";
export default {
  data() {
    return {
      momentPost: [
        {
          momentPostID: "",
          userID: "",
          content: "",
          images: "",
          likeCount: "",
          createDate: "",
        },
      ],
      imgUrl: [],
    };
  },
  computed: {
    like() {
      return this.$t("mypost.like");
    },
    del() {
      return this.$t("mypost.delete");
    },
  },
  methods: {
    splitImgAddUrl(images) {
      if (images == "" || images == undefined || images == null) {
        return "";
      } else {
        let arrImg = [];
        images.split(",").forEach((e) => {
          arrImg.push(ImgUrl + e);
        });
        return arrImg.toString();
      }
    },
    splitImg(image) {
      if (image == undefined || image == "" || image == null) {
        return "";
      } else {
        return image.split(",");
      }
    },
    momentDelete(momentPostID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let data = { momentPostID: momentPostID };
          const res = await deleteMoment(data);
          if (res.data.code == 200) {
            this.$message.success({
              message: res.data.msg,
            });
          } else {
            this.$message.error({
              message: res.data.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  activated() {
    getMoment()
      .then((res) => {
        this.momentPost = res.data.info;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.moment_post {
  border-bottom: 1px solid #dfdfdf;
}
p {
  display: inline-block;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
span {
  padding: 5px;
  font-size: 13px;
  color: #888888;
}
img {
  width: 150px;
  height: 150px;
  padding: 5px;
}
.images_list {
  width: 480px;
  display: inline-block;
  flex-direction: row;
}
</style>
