$(document)
  .on('shopify:section:select', function(e){

    var $parentSection = $('#shopify-section-' + e.detail.sectionId);

    if ($parentSection.hasClass('social-feeds-section')){
      $('.social-feeds-wrap').each(function (index, value) {
        social.twitter();
      });
    }

    if ($parentSection.hasClass('header-section')){
      header.init();
    }

    //Sidebar toggle check
    if ($(window).width() >= 768 && $('.sidebar').length) {
      $('.toggle-all--true .toggle_list .active').parents('ul.toggle_list').prev().click();
    }

    utils.pageBannerCheck();
    var evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
  });

$(document)
  .on('shopify:section:deselect', function(e){

    var $parentSection = $('#shopify-section-' + e.detail.sectionId);

  });
$(function(){
  var url = window.location.pathname
  if(url  === "/search"){
    $($(".container")[0]).css("padding-top","100px")
  }else if(url  === "/account" ){
    $($(".container")[0]).css("padding-top","85px")
    $(".account-header.clearfix").css("position","initial")
  }else if(url  === "/cart"){
    $($(".container")[0]).css("padding-top","60px")
  }else if(url  === "/"){
    $($(".container")[0]).css("padding-top","0px")
  }else{
    $($(".container")[0]).css("padding-top","70px")
  }

  if(url  !== "/"){
    $("body").css("background","white")
  }
  var len = $(".clearfix.breadcrumb-collection").length;
  if(len>0){
    $($(".clearfix.breadcrumb-collection")[0]).remove()
  }
  //删除星星
  setInterval(function(){
    $(".product-list.collection-matrix .spr-badge").remove();
  },2000)

  //更改add to cart 的样式
  $(".omega .action_button").css({
    "background":"rgba(1,155,255,.7)",
    "border":"none",
    "border-radius":"5px",
    "text-transform":"capitalize"
  })
})