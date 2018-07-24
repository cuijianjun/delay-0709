import $ from 'jquery';
import EventEmitter from 'event-emitter-es6';
import utils from 'lib/kutils.js';
import {parseUrlParams, generateMixed} from 'lib/utils';
import Musvg from 'lib/musvg';
import native from 'lib/native';
import playCommon from '../common_style/play-common-functions.js';
import 'assets/styles/reset.less';
import 'assets/styles/iconfont.less';
import './less/wexin_share.less';
import { doPOSTJson, doGET } from 'lib/server-api';

class Wexin_share {
  constructor() {
    let urlParams = parseUrlParams();
    this.recordId = urlParams.record_id;
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '', // 必填，公众号的唯一标识
      timestamp: '', // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '', // 必填，签名
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ] // 必填，需要使用的JS接口列表
    });
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 用户点击了分享后执行的回调函数
        }
      });
      wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户点击了分享后执行的回调函数
        },
        cancle: function () {
          // 用户取消点击了分享后执行的回调函数
        }
      });
    });
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
    $(() => {
      this.loadRecord(this.recordId);
      this._registerEvents();
    });
  }
  _registerEvents() {
    let playing = false, currentAudio = null;
    $('.header').on('click', function () {
      let $audio = $(this).find('audio');
      // if (playing) {
      //   playing = false;
      //   currentAudio.pause();
      //   currentAudio.currentTime = 0;
      //   currentAudio = null;
      // }
      playing = true;
      currentAudio = $audio.get(0);
      currentAudio.play();
    });
  }
  async getConfig() {
    let jsapi_ticket = null;
    let time = +new Date() / 1000;
    if (localStorage['jsapi_ticket_expire_time'] > time && localStorage['jsapi_ticket']) {
      jsapi_ticket = localStorage['jsapi_ticket'];
    }
    let access_token = this.getWxAccessToken();
    let url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';
    jsapi_ticket = await this.get_jsapi_ticket();
    localStorage['jsapi_ticket'] = jsapi_ticket;
    localStorage['jsapi_ticket_expire_time'] = time + 7000;
    let nocestr = utils.generateMixed(16);
    let signature = 'jsapi_ticket=' +
      'sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=' +
      'Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value';
    signature = sha1(signature);// eslint-disable-line
  }

  async get_jsapi_ticket(url) {
    let resp = await doGET(url);
    let jsapi_ticket = resp.data.ticket;
    return jsapi_ticket;
  }
}

let share = new Wexin_share();
