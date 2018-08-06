import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home/Home')
const Member = () => import('@/components/Member/Member')
const Search = () => import('@/components/Search/Search')
const Shopcart = () => import('@/components/Shopcart/Shopcart')
const NewsList = () => import('@/components/News/NewsList')
const NewsDetail = () => import('@/components/News/NewsDetail')
const PhotoList = () => import('@/components/Photo/PhotoList')
const PhotoDetail = () => import('@/components/Photo/PhotoDetail')
const GoodsList = () => import('@/components/Goods/GoodsList')
const GoodsDetail = () => import('@/components/Goods/GoodsDetail')
const GoodComment = () => import('@/components/Goods/GoodsComment')


// 注册全局组件 router-view  router-link

// 未来所有的组件中的this对象，就具备该属性， 所有的this其实就是Vue的子类对象
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 首先进行重定向的操作
      path:'/',
      redirect: { name:'home'},
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    // 新闻列表
    {
      name:'news.list',
      path:'/news/list',
      component:NewsList
    },
    // 新闻想起
    {
      name:'news.detail',
      path:'/news/detail',
      component:NewsDetail
    },
    // 图文列表
    {
      name:'photo.list',
      path:'/photo/list/:categoryId',
      component:PhotoList
    },
    // 图文详情
    {
      name:'photo.detail',
      path:'/photo/detail',
      component:PhotoDetail
    },
    // 商品列表
    {
      name:'goods.list',
      path:'/goods/list',
      component:GoodsList
    },
    //商品详情
    {
      name:'goods.detail',
      path:'/goods/detail/:id',
      component:GoodsDetail
    },
    // 商品图文介绍
    {
      name:'photo.info',
      path:'/goods/photo/info',
      component:NewsDetail
    },
    // 商品评论组组件
    {
      name:'goods.comment',
      path:'/goods/comment',
      component:GoodComment
    }

  ]
})
