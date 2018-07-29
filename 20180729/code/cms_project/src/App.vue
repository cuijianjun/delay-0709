<template>
  <div>
    <mt-header fixed title="固定在顶部"></mt-header>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
        <img slot="icon" src="./assets/img/callme.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="./assets/img/feedback.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="./assets/img/goodShow.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="./assets/img/picShare.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style>

</style>
