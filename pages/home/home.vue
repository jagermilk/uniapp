<template>
  <view class="home">
    <view class="swiper">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item,i) in swiperList" :key="i" class="swiper">
          <swiper-item>
            <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
              <image :src="item.image_src" class="swiperimage"></image>
            </navigator>
          </swiper-item>
        </block>
      </swiper>
    </view>

    <view class="navbar">
      <block v-for="(item,i) in navList" :key="i">
        <image :src="item.image_src" class="navimage" @click="navClickHandler(item)"></image>
      </block>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </view>
          </view>
        </view>

      </view>
    </view>



  </view>
</template>

<script>
  export default {
    data() {

      return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        swiperList: [],
        navList: [],
        floorList: []
      }
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 3. 获取轮播图数据的方法
      async getSwiperList() {
        // 3.1 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 3.2 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperList = res.message
      },
      // 3. 在 methods 中定义获取数据的方法
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      //nav标签跳转界面
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 3. 定义获取楼层列表数据的方法
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
         // 通过双层 forEach 循环，处理 URL 地址
          res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
        
          this.floorList = res.message
      },
    },
  }
</script>

<style lang="scss">
  .swiper {
    height: 320rpx;

    .swiper-item,
    .swiperimage {
      width: 100%;
      height: 100%;
    }
  }





  .navbar {
    display: flex;
    justify-content: space-around;
    padding: 50rpx 0 30rpx;

    .navimage {
      width: 128rpx;
      height: 140rpx;
    }
  }
  
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }
  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
