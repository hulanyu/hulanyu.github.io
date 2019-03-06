"use strict";
//1.初始化数据
let hashA = init();
let keys = hashA['keys'];
let hash = hashA['hash'];
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 217,
  stars = [],
  count = 0,
  maxStars = 1400;

var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

//2.生成键盘
generateKeyBoard(keys,hash);
        
        
//3.监听用户动作
//要监听谁的键盘事件 main还是document，需要知道用户按的是什么键
listenToUser(hash);
switchSearchEngin();



// 下面是工具函数
function init(){
    let keys = {
        0 : ['q','w','e','r','t','y','u','i','o','p'],
        1 : ['a','s','d','f','g','h','j','k','l'],
        2 : ['z','x','c','v','b','n','m'],
        length : 3
    }
    let hash = {
        q : 'qq.com',
        w : 'wangdoc.com',
        e : undefined,
        r : 'react-juejin.foreversnsd.cn',
        t : 'tgideas.qq.com/doc/',
        y : 'youtube.com',
        i : 'iciba.com',
        o : undefined,
        p : undefined,
        a : undefined,
        s : 'segmentfault.com',
        d : 'dribbble.com',
        f : undefined,
        g : 'github.com',
        h : undefined,
        j : 'juejin.im',
        k : 'ke.qq.com',
        l : undefined,
        z : 'zhihu.com',
        x : 'xiedaimala.com',
        c : 'csdn.net',
        v : 'cn.vuejs.org',
        b : 'bilibili.com',
        n : undefined,
        m : 'mail.163.com'
    }
    let hasInLocalStorage = getFormLocalStorage('data');
    if(hasInLocalStorage){
        hash = hasInLocalStorage;
    }
    return {'keys':keys,'hash':hash}
}

function getFormLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function generateKeyBoard(keys, hash) {
    for (let index = 0; index < keys['length']; index = index + 1) { //0 1 2
        let div = tag('div');
        main.appendChild(div);

        let row = keys[index];
        for (let index2 = 0; index2 < row['length']; index2 = index2 + 1) { //将固定的10换成可控制的
            let kbd_wrapper = tag('div');
            kbd_wrapper.className = 'kbd_wrapper';
            let kbd = tag('kbd');
            kbd.className = 'key';
            let span = createSpan(row[index2]);
            let img = createImage(hash[row[index2]]);
            let button = createButton(row[index2]);
        
            // 判断按键是否已经有对应的网址
            if (hash[row[index2]] === undefined) {
                kbd.setAttribute('title', '未设置网站导航');
            } else {
                kbd.setAttribute('title', hash[row[index2]]);
            }

            kbd.onclick = function (e) {
                let website = e.currentTarget.getAttribute('title');
                if (website === '未设置网站导航') {
                    alert('请编辑此按键的网站再跳转')
                } else {
                    console.log(1)
                    window.open('http://' + website, "_blank");
                }
            }
            
            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(button);
            kbd_wrapper.appendChild(kbd);
            div.appendChild(kbd_wrapper);
        }
    }
}

function tag(tagName) {
    let element = document.createElement(tagName);
    return element;
}

function createSpan(textContent) {
    let span = tag('span');
    span.textContent = textContent; //第一个数组 第二个数组 第三个数组
    span.className = 'text';
    return span;
}

function createButton(id) {
    let button = tag('button');
    button.textContent = 'e';
    button.id = id;
    button.onclick = function (e) {
        //阻止事件冒泡
        e.stopPropagation();
        let button2 = e['target'];
        let img2 = button2.previousSibling;
        //获取当前的id
        let key = button2['id'];
        //用户输入一个网址
        let web = prompt('请输入一个网址：');
        //将原来的hash给替换掉
        hash[key] = web;
        img2.src = 'http://' + web + '/favicon.ico';
        localStorage.setItem('data', JSON.stringify(hash));
    }
    return button;
}

function createImage(domain) { //hash[row[index2]]
    let img = tag('img');
    if (domain) {
        img.src = 'http://' + domain + '/favicon.ico';
    } else {
        img.src = './image/dot.png';
    }
    img.onerror = function (e) {
        e.target.src = './image/dot.png';
    }
    return img;
}


function listenToUser(hash) {
    // ifInputting作为一个开关
    let ifInputting = false;
    let inputBar = document.getElementById('inputBar');
    let searchBtn = document.querySelector('.searchBtn');
    inputBar.addEventListener('focus', function (e) {
        ifInputting = true;
        e.target.placeholder = '';
    })
    inputBar.addEventListener('focusout', function (e) {
        ifInputting = false;
        e.target.placeholder = '点击左边图标切换搜索引擎';
    })
    searchBtn.onclick = function (e) {
        e.preventDefault();
        let searchContent = inputBar.value;
        // 判断是什么搜索引擎
        let searchEnginLogo = document.getElementById('searchEnginLogo');
        let engin = searchEnginLogo.getAttribute('data-engin');
        switch (engin) {
            case 'baidu':
                window.open("https://www.baidu.com/s?wd=" + searchContent, '_blank');
                break;
            case 'google':
                window.open("https://www.google.com.hk/search?q=" + searchContent, '_blank');
                break;
        }
    }

    document.onkeypress = function (e) {
        let key = e['key'];
        let website = hash[key];
        if (!ifInputting) {
            if (website === undefined) {
                alert('请编辑此按键的网站再跳转')
            } else {
                console.log(1);
                window.open('http://' + website, "_blank");
            }
        }
    }
}

// 切换搜索引擎
function switchSearchEngin() {
    // 搜索引擎默认是google
    let ifSwitch = false;
    let searchEnginLogo = document.getElementById('searchEnginLogo');
    let googleLogo = document.querySelector('#searchEnginLogo li:nth-child(1)');
    let baiduLogo = document.querySelector('#searchEnginLogo li:nth-child(2)');
    let googlePic = document.querySelector('#searchEnginPic li:nth-child(1)');
    let baiduPic = document.querySelector('#searchEnginPic li:nth-child(2)');
    searchEnginLogo.setAttribute('data-engin', 'google');
    searchEnginLogo.onclick = function () {
        if (!ifSwitch) {
            // google --> baidu
            googleLogo.classList.remove('active');
            baiduLogo.classList.add('active');
            googlePic.classList.remove('active');
            baiduPic.classList.add('active');
            searchEnginLogo.setAttribute('data-engin', 'baidu');
        } else {
            // baidu --> google
            baiduLogo.classList.remove('active');
            googleLogo.classList.add('active');
            baiduPic.classList.remove('active');
            googlePic.classList.add('active');
            searchEnginLogo.setAttribute('data-engin', 'google');
        }
        ifSwitch = !ifSwitch;
    }
}
function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Star = function() {

  this.orbitRadius = random(w / 2 - 50);
  this.radius = random(100, this.orbitRadius) / 10;
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 100000;
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}
Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY,
      twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}
function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };  

  window.requestAnimationFrame(animation);
}

animation();