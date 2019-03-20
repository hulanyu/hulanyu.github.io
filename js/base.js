// 轮播设置
var swiper = new Swiper('.banner', {
      spaceBetween: 30,
      centeredSlides: true,
      effect: 'fade',
      loop:true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  //鼠标移入停止
  $('.swiper-slide').mouseenter(function () {
    swiper.autoplay.stop();
  })
  //鼠标移出开始
  $('.swiper-slide').mouseleave(function () {
    swiper.autoplay.start();
  })
var scrollFunc = function (e) {  
      e = e || window.event;  
      if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
        if (e.wheelDelta > 0) { //当滑轮向上滚动时  
          if( $(document).scrollTop() <800){
            $(".BaseRetun").css("opacity","0")
          }
        }  
        if (e.wheelDelta < 0) { //当滑轮向下滚动时  
          // console.log("滑轮向下滚动");  
          if( $(document).scrollTop() >800){
            $(".BaseRetun").css("opacity","1")
          }
        }  
      } else if (e.detail) {  //Firefox滑轮事件  
        if (e.detail> 0) { //当滑轮向上滚动时  
          /* console.log("滑轮向上滚动");  */
          if( $(document).scrollTop() <800){
            $(".BaseRetun").css("opacity","0")
          }
        }  
        if (e.detail< 0) { //当滑轮向下滚动时  
          /*console.log("滑轮向下滚动");  */
          if( $(document).scrollTop() >800){
            $(".BaseRetun").css("opacity","1")
          }
        }  
      }  
    }
  //给页面绑定滑轮滚动事件  
  if (document.addEventListener) {//firefox  
    document.addEventListener('DOMMouseScroll', scrollFunc, false);  
  }  
  //滚动滑轮触发scrollFunc方法  //ie 谷歌  
  window.onmousewheel = document.onmousewheel = scrollFunc;

  //点击3秒后消失
  $(".BaseRetun").click(function(){
    setTimeout(function(){
       $(".BaseRetun").css("opacity","0")
    },800)
  })