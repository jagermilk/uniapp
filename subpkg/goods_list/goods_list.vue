<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i"  @click="togoodsdetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        isloading: false
      };
    },
    // 下拉刷新的事件
    onPullDownRefresh() {

      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      // 2. 重新发起请求

      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    onReachBottom() {

      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if (this.isloading) return
      // 让页码值自增 +1
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
            console.log('我在发请求')
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 调用获取商品列表数据的方法
      this.getGoodsList()
    },

    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // ** 打开节流阀
        this.isloading = true

        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)

        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        // ** 关闭节流阀
        this.isloading = false
        cb && cb()
        // 为数据赋值
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total

      },
      togoodsdetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
