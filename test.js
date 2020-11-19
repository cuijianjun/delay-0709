// promise.all()返回值是new Promise
// 需要用一个数组存放每一个promise的结果值
// 遍历参数数组，判断是否是promise，是的话执行得到结果后压入结果数组；否则直接放入结果数组。
// 当每个都成功执行后，resolve（result）
// 当有一个失败，reject
function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

const myPromiseAll = (arr) => {
  let result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (isPromise(arr[i])) {
        arr[i].then((data) => {
          result[i] = data;
          if (result.length === arr.length) {
            resolve(result)
          }
        }, reject)
      } else {
        result[i] = arr[i];
      }
    }
  })
}

// 2. 手写new
function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype);
  let result = fn.call(instance, ...args)
  return typeof result === 'object' ? result : instance
}

function ObjectFactory() {
  let obj = {};
  let Constructor = [].shift.apply(arguments)
  obj.__proto__ = Constructor.prototype
  let ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}

// 节流
const throttle = function (fn, interval) {
  let last = 0;
  return function (...args) {
    let context = this;
    let now = +new Date();
    // 还没到时间
    if (now - last < interval) return;
    last = now;
    fn.apply(this, args)
  }
}

// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

// 简单来说，diff算法有以下过程
//
// 先同级比较再比较子节点
// 先判断一方有子节点和一方没有子节点的情况。如果新的一方有子节点，旧的一方没有，相当于新的子节点替代了原来没有的节点；
// 同理，如果新的一方没有子节点，旧的一方有，相当于要把老的节点删除。
// 再来比较都有子节点的情况，这里是diff的核心。
// 首先会通过判断两个节点的key、tag、isComment、data同时定义或不定义以及当标签类型为input的时候type相不相同来确定两个节点是不是相同的节点，
// 如果不是的话就将新节点替换旧节点。
// 如果是相同节点的话才会进入到patchVNode阶段。
// 在这个阶段核心是采用双端比较的算法，同时从新旧节点的两端进行比较，
// 在这个过程中，会用到模版编译时的静态标记配合key来跳过对比静态节点，如果不是的话再进行其它的比较。

// 4.nextTick知道吗，实现原理是什么？todo
// nextTick批量异步更新策略，一句话概括在下次DOM更新循环结束之后执行延迟回调。
// 它主要是为了解决：例如一个data中的数据它的改变会导致视图的更新，而在某一个很短的时间被改变了很多次，
// 假如是1000次，每一次的改变如果都都将促发数据中的setter并按流程跑下来直到修改真实DOM，
// 那DOM就会被更新1000次，这样的做法肯定是非常低效的。
//
// 而在目前浏览器平台并没有实现nextTick方法，
// 所以Vue.js 源码中分别用 Promise、setTimeout、setImmediate 等方式定义了一个异步方法nextTick，
// 它接收的是一个回调函数，多次调用nextTick会将传入的回调函数存入队列中，
// 当当前栈的任务都执行完毕之后才来执行这个队列中刚刚存储的那些回调函数，并且通过这个异步方法清空当前队列。


// 让异步操作顺序执行 todo 每隔1秒输出1,2,3
const arr = [1, 2, 3]
arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise(r => {
      setTimeout(() => r(console.log(x)), 1000)
    })
  })
}, Promise.resolve())

// todo 用下面的代码会在一秒后，顺序输出1，2，3，4
var arr = [1, 2, 3, 4]
var promises = []

arr.map(async (value) => {
  promises.push(new Promise((res) => {
    setTimeout(() => {
      console.log(value)
      res()
    }, 1000)
  }))
})

var promise = Promise.resolve()

for (var i = 0; i < promises.length; i += 1) {
  const task = promises[i]
  promise
  .then(() => {
    return task
  })
}


// var value = 0
// Object.defineProperty(window,'a',{
//   get(){
//     return value+=1;
//   }
// })
// if(a===1&&a===2&&a===3){
//   console.log('success')
// }

// 数组乱序 todo
function confuseArr (arr) {
  const res = [];
  while(arr.length) {
    res.push(arr.splice(
      Math.floor(Math.random() * (arr.length - 1)), 1)[0]);
  }
  return res;
}

// 数组拍平

function _flat(arr, depth) {
  if(!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1))
    } else {
      return prev.concat(cur);
    }
  }, []);
}