// 轮播设置
var tabArr = Array.from($(".busTitle").children())
var swiper1 = new Swiper('.business', {
      spaceBetween: 30,
      centeredSlides: true,
      effect: 'slide',
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChangeTransitionStart: function(){
          // console.log(this.activeIndex);
          $(tabArr[this.activeIndex]).addClass("active")
          $(tabArr[this.activeIndex]).siblings().removeClass("active")
        },
      },
    });
  // 鼠标移入停止播放
  $('.busTitle').mouseenter(function () {
     swiper1.autoplay.stop();
  })
  //鼠标移出开始播放
  $('.busTitle').mouseleave(function () {
    swiper1.autoplay.start();
  })
  $('.swiper-slide-bus').mouseenter(function () {
    swiper1.autoplay.stop();
  })
  //鼠标移出开始
  $('.swiper-slide-bus').mouseleave(function () {
    swiper1.autoplay.start();
  })
  // 点击tab选项时轮播切换到相应的项
  for (var i = 0; i < tabArr.length; i++) {
    (function(j){
      tabArr[j].addEventListener("click", function(e) {
        swiper1.slideTo(j, 1000, false)
        $(this).addClass("active")
        $(this).siblings().removeClass("active")
      }, false);
    })(i)
  }