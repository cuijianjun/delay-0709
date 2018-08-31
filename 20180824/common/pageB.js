import * as _ from 'lodash'
var page = 'subpageB'
if(page === 'subpageA'){
  import(/*webpackChunkName: 'subpageA'*/'./subPageA').then(function (subpageA) {
    console.log(subpageA);
  })
}else

if(page === 'subpageB'){
  import(/*webpackChunkName: 'subpageB'*/'./subpageB').then(function (subpageB) {
    console.log(subpageB);
  })
}


export default 'pageB'