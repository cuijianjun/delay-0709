<template>
  <div>
    <mt-header fixed title="固定在顶部"></mt-header>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="首页">
        <img slot="icon" src="./assets/img/callme.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="会员">
        <img slot="icon" src="./assets/img/feedback.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="购物车">
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
    return {
      selected: ''
    }
  },
  watch: {
    selected (newV, oldV) {
      console.log(newV)
    }
  }
}
</script>
<style>

</style>
