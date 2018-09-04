import react from 'react'
import module from './module'
//自定义模块名
import(/*webpackChunkName:'async'*/'./async').then(function (a) {
  console.log(a);
})
console.log('hello world!ffff!');