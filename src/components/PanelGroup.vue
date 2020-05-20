<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">粉丝</div>
          <count-to
            :start-val="0"
            :end-val="this.followers"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
        <div class="card-panel-icon-wrapper icon-fans">
          <i
            class="el-icon-user-solid"
            style="font-size: 45px"
            class-name="card-panel-icon"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">关注</div>
          <count-to
            :start-val="0"
            :end-val="this.follow"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
        <div class="card-panel-icon-wrapper icon-follower">
          <i
            class="el-icon-user"
            style="font-size: 45px"
            class-name="card-panel-icon"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">获赞</div>
          <count-to
            :start-val="0"
            :end-val="this.totallike || 0"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
        <div class="card-panel-icon-wrapper icon-like">
          <i
            class="el-icon-medal"
            style="font-size: 45px"
            class-name="card-panel-icon"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">我的文章</div>
          <count-to
            :start-val="0"
            :end-val="this.articlepost"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
        <div class="card-panel-icon-wrapper icon-article">
          <i
            class="el-icon-finished"
            style="font-size: 45px"
            class-name="card-panel-icon"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import {
  getFollowers,
  getFollow,
  getTotalLike,
  getArticlePostCount,
} from "../api/user";

export default {
  data() {
    return {
      followers: 0,
      follow: 0,
      totallike: 0,
      articlepost: 0,
    };
  },
  components: {
    CountTo,
  },
  async mounted() {
    const followers = await getFollowers();
    const follow = await getFollow();
    const totallike = await getTotalLike();
    const articlepost = await getArticlePostCount();
    if (
      followers.data.code == 200 &&
      follow.data.code == 200 &&
      totallike.data.code == 200 &&
      articlepost.data.code == 200
    ) {
      this.followers = parseInt(followers.data.info[0].count);
      this.follow = parseInt(follow.data.info[0].count);
      this.totallike = parseInt(totallike.data.info[0].totalcount);
      this.articlepost = parseInt(articlepost.data.info[0].count);
    } else {
      return;
    }
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    border-radius: 3px;
    height: 120px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-fans {
        background: #40c9c6;
      }

      .icon-follower {
        background: #36a3f7;
      }

      .icon-like {
        background: #f4516c;
      }

      .icon-article {
        background: #34bfa3;
      }
    }

    .icon-fans {
      color: #40c9c6;
    }

    .icon-follower {
      color: #36a3f7;
    }

    .icon-like {
      color: #f4516c;
    }

    .icon-article {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 60px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .i {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
