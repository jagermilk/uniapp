<template>
  <view>
    <view class="search-box">
        <search @click="clicksearch"></search>
        </view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="[i===active? 'active':'','left-scroll-view-item']" @click="activeChanged(i)">{{item.cat_name}}
          </view>
        </block>

      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <block v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="right-scroll-view-item">
            <view class="level2title">
              {{item2.cat_name}}
            </view>
            <!-- 动态渲染三级分类的列表数据 -->
            <view class="cate-lv3-list">
              <!-- 三级分类 Item 项 -->
              <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                <!-- 图片 -->
                <image :src="item3.cat_icon"></image>
                <!-- 文本 -->
                <text>{{item3.cat_name}}</text>
              </view>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight-50
      this.getCateList()
    },
    methods: {
      //一级分类+二级分类
      async getCateList() {
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        // 判断是否获取失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeChanged(i) {
        this.active = i
        // 为二级分类列表重新赋值
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      //点击三级分类跳转
      gotoGoodsList(item3){
         uni.navigateTo({
            url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
          })
      },
      clicksearch(){
      console.log(111)
      uni.navigateTo({
             url: '/subpkg/search/search'
           })
    }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .right-scroll-view {
    display: flex;
    flex-direction: column;

    .right-scroll-view-item {
      display: flex;
      flex-direction: column;

      .level2title {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }

      .cate-lv3-list {
        display: flex;
        flex-wrap: wrap;

        .cate-lv3-item {
          width: 33.33%;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          image {
            width: 140rpx;
            height: 140rpx;
          }

          text {
            font-size: 12px;
          }
        }
      }
    }
  }
  .search-box{
    position: sticky;
     // 吸顶的“位置”
      top: 0;
      // 提高层级，防止被轮播图覆盖
      z-index: 999;
  }
</style>
