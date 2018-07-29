import $ from 'jquery';
import EventEmitter from 'event-emitter-es6';
import utils from 'lib/kutils.js';
import { parseUrlParams } from 'lib/utils';
import Musvg from 'lib/musvg';
import native from 'lib/native';
import playCommon from '../common_style/play-common-functions.js';
import 'assets/styles/reset.less';
import 'assets/styles/iconfont.less';
import './less/playback.less';
import bg from './image/Medal.png';

class PlaybackApp extends EventEmitter {
  constructor() {
    super();
    let urlParams = parseUrlParams();
    this.recordId = urlParams.record_id;
    this.appId = urlParams.app_id;
    this.userId = urlParams.user_id;
    localStorage.userToken = 'xiaoyezilab'; // TODO: fake server

    console.log('app_id = %s, user_id = %s, score_id = %s', this.appId, this.userId, this.scoreId);

    this.svgContainer = document.getElementById('play-content');
    this.musvg = new Musvg(this.svgContainer, {
      pageClassName: 'svg-page',
    });

    this.device = null;
    this.isListening = false;

    // on document ready
    $(() => {
      if (this.recordId) {
        this.loadRecord(this.recordId);
      }
      this._registerEvents();
    });
  }

  _registerEvents() {
    // animate
    $('#score-content').on('click', '#score-right', function (e) {
      console.log('score-right');
      $('#score-content').animate({'left': '600'}, 500);
      $('#left-slip').fadeIn(1000);
      $('#score-dialog').fadeOut(1000);
    });
    $('body').on('click', '.mask', function (e) {
      console.log('mask');
      $('#score-content').animate({'left': '600'}, 500);
      $('#left-slip').fadeIn(1000);
      $('#score-dialog').fadeOut(1000);
    });

    $('body').on('click', '.left', function (e) {
      console.log('icon-left');
      $('#score-content').animate({'left': '50%'}, 500);
      $('#left-slip').fadeOut(500);
      $('#score-dialog').fadeIn(700);
    });
    this.musvg.on('device-changed', (port) => {
      this.device = port;
      this.device.enableVirtualDest();

      this.emit('onDeviceChange', {
        supportsInput: this.device.supportsInput,
        supportsSound: this.device.supportsSound,
      });

      if (!this.device.supportsInput) {
        if (this.isListening) {
          this.stopListenMusic();
          this.isListening = false;
        }
      }
    });
    // stop play score event
    this.musvg.on('userPlayer.end', () => {
      this._onStopListen();
    });
    // score scroll event
    this.musvg.on('scroll', (obj) => {
      let scaleRate = this.svgContainer.clientWidth * 0.85 / 595;
      let scrollTop = (obj.pos * scaleRate) + obj.element.offsetTop - (80 * scaleRate);
      playCommon.scrollScoreAuto($('.play-container .content'), scrollTop);
    });

    // show result error
    this.musvg.on('showNoteError', (obj) => {
      playCommon.showScoreErrorNote(obj, $('.alert-error-note'), ((0.5 + 0.45) / 7.5));
    });

    $('#playback').click(() => {
      if (!this.isListening) {
        this.startListen();
      } else {
        this.stopListen();
      }
    });
  };

  loadRecord(recordId) {
    // load result
    this.musvg.loadResult(recordId).then((result) => {
      let score = result.score;
      $('#play-rank').html(score.rank);
      $('#play-score').html(score.final.toFixed(1));
      $('#play-beat-rate').html((score.beat_rate * 100).toFixed(1));
      this.emit('onLoadRecord', {
        id: result.id.toString(),
        score_id: result.score_id.toString(),
        score: {
          final: result.score.final,
          pitch: result.score.pitch,
          rhythm_speed: result.score.rhythm_speed,
          complete: result.score.complete,
          technique: result.score.technique,
          expressive: result.score.expressive,
          difficulty: result.score.difficulty,
        },
      });
      // show score
      let domFragment = `
        <div class="score-top">
        <img src="${bg}">
        <div class="score">
        <div class="score-number">${score.final.toFixed(1)}</div>
        <div class="score-text">总得分</div></div></div>
        <div class="score-center">
        <div class="sum">
        <div class="single-standard accuracy">
        <div class="sum-top">${score.pitch.toFixed(1)}</div>
        <div class="sum-bottom">音准</div></div>
        <div class="verticaLine"></div>
        <div class="single-standard rhythm">
        <div class="sum-top">${score.rhythm_speed.toFixed(1)}</div>
        <div class="sum-bottom">节奏</div></div>
        <div class="verticaLine"></div>
        <div class="single-standard integrity">
        <div class="sum-top">${score.complete.toFixed(1)}</div>
        <div class="sum-bottom">完整性</div></div></div></div>
        <div class="score-bottom">
        <div class="score-right" id="score-right">
        <i class="iconfont icon-right-arrow"></i>
        </div>
        </div>`;
      $('#score-content').html(domFragment);
    }).catch(e => {
      console.error(e);
      this.emit('onError', {
        type: 'load_record',
      });
    }).finally(() => {
      utils.hideLoading();
      $('.svg-page').css('text-align', 'center');
      $(this.svgContainer).css({
        'overflowY': 'scroll'
      });
    });
  }

  startListen() {
    if (this.isListening) {
      return;
    }
    // if (!this.device || !this.device.supportsSound) {
    //   utils.alert('该功能需在连接The ONE智能设备时使用');
    //   this.emit('onError', {
    //     type: 'no_device',
    //   });
    //   return;
    // }
    $('#state-i').removeClass('icon-shipinbofang').addClass('icon-zanting-copy');
    $('#score-dialog').animate({'left': '600'}, 500);
    $('#left-slip').fadeIn(1000);
    this.musvg.startListenResult();
    this.emit('onStartListen');
    this.isListening = true;
  }

  stopListen() {
    if (!this.isListening) {
      return;
    }
    this.musvg.stopListenResult();
    this._onStopListen();
    this.emit('onStopListen');
  }

  _onStopListen() {
    $('#state-i').removeClass('icon-zanting-copy').addClass('icon-shipinbofang');
    this.isListening = false;
  }
}

// the app singleton
let theApp = new PlaybackApp();

// init native bridge
native.init(theApp);

window.app = theApp;
