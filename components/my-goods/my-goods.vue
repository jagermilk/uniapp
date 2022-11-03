<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic" ></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.goods_price| tofixed}}</view>
          <uni-number-box :min="1"  v-model="vModelValue" v-if="showRadio" @change="numChangeHandler"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        vModelValue:this.goods.goods_count
      };
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    options: {
           styleIsolation: 'shared'
       },
    props: {
      goods: {},
      showRadio: {
            type: Boolean,
            // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
            default: false,
          },
    },
    methods:{
      radioClickHandler(){
         this.$emit('radio-change', {
              // 商品的 Id
              goods_id: this.goods.goods_id,
              // 商品最新的勾选状态
              goods_state: !this.goods.goods_state
            })
      },
      numChangeHandler(val){
        console.log(val)
        this.$emit('num-change',{
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的数量
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
// 让 goods-item 项占满整个屏幕的宽度
  width: 750rpx;
  // 设置盒模型为 border-box
  box-sizing: border-box;
    .goods-item-left {
      margin-right: 5px;
      display: flex;
        justify-content: space-between;
        align-items: center;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
  .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    .uni-numbox-btns {
        padding:0px !important;
      }
    }
    .uni-numbox{
      margin-right: 8px;
    }
</style>
