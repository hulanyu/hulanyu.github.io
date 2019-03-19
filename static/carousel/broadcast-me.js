function Broadcast (el,imagesAndUrl,JSON) {
  if(el==null || imagesAndUrl == null) {
    console.log("请传入节点或者图片数据及链接！");
    return;
  }
  this.el = el;
  this.imagesAndUrl = [
  {linkHref:'#',imgSrc:'/images/banner_1.jepg',imgAlt:''},
  {linkHref:'#',imgSrc:'/images/banner_2.jepg',imgAlt:''},
  {linkHref:'#',imgSrc:'/images/banner_3.jepg',imgAlt:''},
  {linkHref:'#',imgSrc:'/images/banner_4.jepg',imgAlt:''}
  ];
  this.timer = JSON.transitionTime || 800;
  this.intervalTime = JSON.intervalTime || 5000;
  this.target = JSON.target || false;
  this.is_static = JSON.is_static || false;

  // 定义一些全局变量
  this.index = 1; 
  this.animationMark = false;
  this.init();
}

// init => 添加dom节点,初始化界面
Broadcast.prototype.init = function () {
  // 动态添加一些css样式
  var cssStr = '.broadcastMe .broadcastMe-list {width: ' + (this.imagesAndUrl.length+2)*this.el.clientWidth + 'px;}.broadcastMe .broadcastMe-list .broadcastMe-item {width:' + this.el.clientWidth + 'px;}'
  var styleNode = document.createElement('style');
  styleNode.innerText = cssStr;
  document.head.appendChild(styleNode)

  var html = '<div class="broadcastMe"><div class="broadcastMe-list" style="left:-' + this.el.clientWidth + 'px">';
  
  var temStr = ''

  temStr += '<div class="broadcastMe-item">'

  var _last_href = this.imagesAndUrl[this.imagesAndUrl.length-1].linkHref==null ? "#" : this.imagesAndUrl[this.imagesAndUrl.length-1].linkHref
  var _last_image = this.imagesAndUrl[this.imagesAndUrl.length-1].imgSrc
  var _last_alt = this.imagesAndUrl[this.imagesAndUrl.length-1].imgAlt || ''

  if (this.target) {
    temStr += '<a target="_blank" href="' + _last_href + '"><img src="' + _last_image + '" alt="' + _last_alt + '"></a>'
  } else {
    temStr += '<a href="' + _last_href + '"><img src="' + _last_image + '" alt="轮播图图片-pawn"></a>'
  }
  temStr += '</div>'
  
  var _this = this

  this.imagesAndUrl.map(function(item) {

    var _current_href = item.linkHref == null ? "#" : item.linkHref
    var _current_image = item.imgSrc
    var _current_alt = item.imgAlt || ''

    temStr += '<div class="broadcastMe-item">'

    if (_this.target) {
      temStr += '<a target="_blank" href="' + _current_href + '"><img src="' + _current_image + '" alt="' + _current_alt + '"></a>'
    } else {
      temStr += '<a href="' + _current_href + '"><img src="' + _current_image + '" alt="' + _current_alt + '"></a>'
    }

    temStr += '</div>'
  })

  var _first_href = this.imagesAndUrl[0].linkHref==null ? "#" : this.imagesAndUrl[0].linkHref
  var _first_image = this.imagesAndUrl[0].imgSrc
  var _first_alt = this.imagesAndUrl[0].imgAlt || ''

  temStr += '<div class="broadcastMe-item">'
  if (this.target) {
    temStr += '<a target="_blank" href="' + _first_href + '"><img src="' + _first_image + '" alt="' + _first_alt + '"></a>'
  } else {
    temStr += '<a href="' + _first_href + '"><img src="' + _first_image + '" alt="' + _first_alt + '"></a>'
  }
  temStr += '</div>'

  html += temStr + "</div>";

  temStr = '<div class="broadcastMe-tool"><div class="broadcastMe-spot broadcastMe-spot-active"></div>';
  // 添加下面小圆点
  for(var i=1,len=this.imagesAndUrl.length;i<len;i++){
    temStr += '<div class="broadcastMe-spot"></div>';
  }
  html += temStr + "</div>"

  // 添加左右2边按钮
  temStr = '<div class="broadcastMe-btn broadcastMe-btn-left"><i class="far fa-angle-left"></i></div><div class="broadcastMe-btn broadcastMe-btn-right"><i class="far fa-angle-right"></i></div>'

  html += temStr;

  this.el.innerHTML += html + "</div>";

  // 调用绑定事件
  this.bindEvent();
}

// bindEvent => 绑定节点事件/自动轮播开启事件
Broadcast.prototype.bindEvent = function () {
  // 获取要用到的节点信息
  this.broadcastMe = this.el.getElementsByClassName('broadcastMe')[0];
  this.broadcastMeList = this.el.getElementsByClassName('broadcastMe-list')[0];
  this.broadcastMeTool = this.el.getElementsByClassName('broadcastMe-tool')[0];
  this.broadcastMeSpot = this.el.getElementsByClassName('broadcastMe-spot');
  this.broadcastMeBtnLeft = this.el.getElementsByClassName('broadcastMe-btn-left')[0];
  this.broadcastMeBtnRight = this.el.getElementsByClassName('broadcastMe-btn-right')[0];

  
  // 左右按钮事件监听 
  this.broadcastMeBtnLeft.addEventListener('click', function() {
    if(_this.animationMark) return;
    _this.index--;
    _this.render()
  });
  this.broadcastMeBtnRight.addEventListener('click', function() {
    if(_this.animationMark) return;
    _this.index++;
    _this.render();
  });

  var _this = this

  // 下面小圆点点击事件监听
  this.broadcastMeTool.addEventListener('click', function(e) {
    var obj = e.target;
    if(obj.className != "broadcastMe-spot") return;
    _this.spotClick(obj);
  })

  // 开启自动轮播
  var timer = setInterval(autoPlay.bind(this),this.intervalTime);

  this.el.addEventListener("mouseover", function() {
    clearInterval(timer);
  })
  this.el.addEventListener("mouseout", function() {
    timer = setInterval(autoPlay.bind(_this),_this.intervalTime);
  })

  // 移动端手指滑动
  var stratPointX = 0;
  var offsetX = 0;
  this.el.addEventListener("touchstart", function(e) {
    // 清楚定时器，因为移动端不能监听到Mouseover时间
    clearInterval(timer);

    stratPointX = e.changedTouches[0].pageX;
    offsetX = _this.broadcastMeList.offsetLeft;
    this.animationMark = true;
  })
  this.el.addEventListener("touchmove", function(e) {
    var disX = e.changedTouches[0].pageX - stratPointX;
    var left = offsetX + disX;

    _this.broadcastMeList.style.transitionProperty = 'none';
    _this.broadcastMeList.style.left = left + 'px';
  })
  this.el.addEventListener("touchend", function() {
    var left = _this.broadcastMeList.offsetLeft;
    // 判断正在滚动的图片距离左右图片的远近，
    _this.index = Math.round(-left/_this.el.clientWidth);
    _this.animationMark = false;
    // 开启定时器
    timer = setInterval(autoPlay.bind(_this),_this.intervalTime);

    _this.render();
  })

  
  // 封装自动轮播
  function autoPlay () {
    if (this.is_static) {
      return
    }
    if(this.animationMark) return;
    this.index++;
    this.render();
  }
}

// render => 根据index的值，渲染当前要显示的界面
Broadcast.prototype.render = function () {
  if(this.animationMark) return;

  this.animationMark = true;
  // 修改broadcastMeList 的left值
  this.broadcastMeList.style.left = (-1)*this.el.clientWidth*this.index + 'px';
  this.broadcastMeList.style.transition = 'left ' + this.timer/1000 + 's';

  var _this = this

  setTimeout(function() {
    // 添加判断，防止出界
    if(_this.index <= 0){
      _this.broadcastMeList.style.transitionProperty = 'none';
      _this.index = _this.imagesAndUrl.length;
      _this.broadcastMeList.style.left = (-1)*_this.el.clientWidth*_this.index + 'px';
    }else if (_this.index > _this.imagesAndUrl.length){ 
      _this.broadcastMeList.style.transitionProperty = 'none';
      _this.index = 1;
      _this.broadcastMeList.style.left = (-1)*_this.el.clientWidth*_this.index + 'px';
    }
    _this.animationMark = false;
  }, this.timer)

  this.renderSpot();
}

// renderSpot => 渲染最下面的小圆点
Broadcast.prototype.renderSpot = function () {
  var flag = this.index;
  if(this.index <= 0){
    flag = this.imagesAndUrl.length;
  }else if(this.index > this.imagesAndUrl.length){
    flag = 1;
  }

  for(var i=0,len=this.broadcastMeSpot.length;i<len;i++){
    if(i==(flag-1)){
      this.broadcastMeSpot[i].className = "broadcastMe-spot broadcastMe-spot-active";
    }else{
      this.broadcastMeSpot[i].className = "broadcastMe-spot";
    }
  }
}

// spotClick => 下面小圆点点击事件
Broadcast.prototype.spotClick = function (obj) {
  for(var i=0,len=this.broadcastMeSpot.length;i<len;i++){
    if(this.broadcastMeSpot[i] === obj){
      this.index = i+1;
      this.render();
      break;
    }
  }
}

// 如果是在vue的环境下使用，取消下面的注释
// module.exports = Broadcast;