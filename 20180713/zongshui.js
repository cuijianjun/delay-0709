
//video
$('#video_show').click(function(){
  $('#video_video').get(0).play();
  $('#video_hide').css('display','block');
  $("html").css({
    "height":"100%",
    "overflow":"hidden",
  })
})
$('#video_close').click(function(){
  $('#video_video').get(0).pause();
  $('#video_hide').css('display','none');
  $("html").css({
    "height":"100%",
    "overflow":"auto",
  })
})
// menu
var pro = false;
$('#menu_pro').click(function(){
  if($(window).width()<500){
    if(!pro){
      pro = true;
      $('#app_ul1').css('display','none');
      $('#pro_ul').css('display','block');
    } else{
      pro = false;
      $('#pro_ul').css('display','none');
    }
  }
});
var app = false;
$('#pro_app').click(function(){
  if($(window).width()<500){
    if(!app){
      app = true;
      $('#pro_ul').css('display','none');
      $('#app_ul1').css('display','block');
    } else{
      app = false;
      $('#app_ul1').css('display','none');
    }
  }
});
$('#menu_pro').mouseenter(function(){
  if($(window).width()>=500){
    if(!$('#header_pro').is(":animated")){
      $('#header_pro').animate({top: '60px'});
      $('.tok_top').css('display','none');
    }
  }
});
$('#menu_pro').mouseleave(function(){
  $('#header_pro').animate({top: '-445px'},function(){
    $('.tok_top').css('display','block');
  });
});
var menu_state=false;
$('#menu_menu').click(function(){
  if(!menu_state){
    menu_state = true;
    $('#menu_ul').animate({marginLeft: 0});
    $('#menu_menu').css("background-image","url('https://cdn.shopify.com/s/files/1/1017/9603/files/back.png?8563729083055334737')");
  } else{
    menu_state = false;
    $('#app_ul1').css('display','none');
    $('#pro_ul').css('display','none');
    $('#menu_ul').animate({marginLeft: '-100%'});
    $('#menu_menu').css("background-image","url('https://cdn.shopify.com/s/files/1/1017/9603/files/three.png?8563729083055334737')");
  }
});
//search
$('#search_li').click(function(){
  $('#menu_ul').css('display','none');
  $('#search_big').css('display','block');
});
$('#close_form').click(function(){
  $('#menu_ul').css('display','flex');
  $('#search_big').css('display','none');
});
//product scroll
$('#p_gold').mouseenter(function(){
  $('#img_div').css('margin-left',0);
})
$('#p_black').mouseenter(function(){
  $('#img_div').css('margin-left','-300px');
})
$('#p_pink').mouseenter(function(){
  $('#img_div').css('margin-left','-600px');
})


$('#p_white0').mouseenter(function(){
  $('#img_div0').css('margin-left',0);
})
$('#p_black0').mouseenter(function(){
  $('#img_div0').css('margin-left','-300px');
})


$('#p_white1').mouseenter(function(){
  $('#img_div1').css('margin-left',0);
})
$('#p_black1').mouseenter(function(){
  $('#img_div1').css('margin-left','-300px');
})
//product
var left=-600;
$('#button_right').click(function(){
  left -= 300;
  if(left == -2700){
    left = -600;
    $('#feature_product').css('margin-left','-600px');
  }
  $('#feature_product').animate({marginLeft: left+'px'}, 400,function(){

  });
});
$('#button_left').click(function(){
  left += 300;
  if(left == 0){
    left = -1800;
    $('#feature_product').css('margin-left','-1800px');
  }
  $('#feature_product').animate({marginLeft: left+'px'}, 400,function(){

  });
});
var proscroll = setInterval(function(){
  left -= 300;
  if(left == -2700){
    left = -600;
    $('#feature_product').css('margin-left','-600px');
  }
  $('#feature_product').animate({marginLeft: left+'px'}, 400,function(){

  });
},2000);
$(".shopify-section.featured-promotions-section").mouseover(function(){
  clearInterval(proscroll);
});
$('#feature_product').mouseout(function(){
  proscroll = setInterval(function(){
    left -= 300;
    if(left == -2700){
      left = -600;
      $('#feature_product').css('margin-left','-600px');
    }
    $('#feature_product').animate({marginLeft: left+'px'}, 400,function(){

    });
  },2000);
});
//method
$('.img_hide').mouseenter(function(){
  $(this).find('img').fadeOut();
});
$('.img_hide').mouseleave(function(){
  $(this).find('img').fadeIn();
});
//footer
var footer_left = 0;
var setscroll = setInterval(function() {
  footer_left--;
  if(footer_left == -6630){
    footer_left = 0;
  }
  $('.footer_in').css('margin-left',footer_left + 'px');
}, 10);
$('.footer_pro').mouseenter(function(){
  clearInterval(setscroll);
});
$('.footer_pro').mouseleave(function(){
  setscroll = setInterval(function() {
    footer_left--;
    if(footer_left == -6630){
      footer_left = 0;
    }
    $('.footer_in').css('margin-left',footer_left + 'px');
  }, 10);
});
