var $ = require('./common/libs/zepto-modules/zepto.js');
require('./common/libs/zepto-modules/event.js');
require('./common/libs/zepto-modules/touch.js');
require('./common/libs/zepto-modules/ajax.js');

;
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 540) { // 最大宽度
            width = 540;
        }
        var rem = width / 10; // 将屏幕宽度分成10份， 1份为1rem
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);



var Swiper = require('./common/libs/swiper/swiper.min.js');
var swiperAni = require('./common/libs/swiper/swiper.animate1.0.2.min.js');
var IScroll = require('./common/libs/iscroll/iscroll.js');

var swiper = new Swiper('.swiper-container',{
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAni.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
});

/*if(localStorage.first){
	$('.swiper-container').hide();
	$('.main-container').show();
}else{
	$('.swiper-container').show();
	$('.main-container').hide();
}*/
$('.swiper-container').show();
$('.main-container').hide();

var myScroll;
$('#enter').tap(function(){
	localStorage.first=true;
	$('.swiper-container').hide();
	$('.main-container').show();
	
	$.post('http://localhost:8000/skill',function(data){
		console.log(data)
		var html='';
		for(var i=0;i<data.length;i++){
			html+='<li>'
							+'<div class="img">'
								+'<img src="img/logo.jpeg" />	'
							+'</div>'				
							+'<div class="con">'
								+'<h3>'+data[i].category+'</h3>'
								+'<p>'+data[i].name+'</p>'
							+'</div>'
						+'</li>'
		}
		$("#scroller ul").html(html);
		
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})
	
})

/*var myScroll;
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		*/

	$('#footer ul li').tap(function(){
			$(this).addClass('green').siblings('li').removeClass('green');
	
			var target=$(this).attr("id");
			$.post('http://localhost:8000/'+target,function(data){
				switch (target){
					case 'skill':
							var html='';
							for(var i=0;i<data.length;i++){
								html+='<li>'
												+'<div class="img">'
													+'<img src="img/logo.jpeg" />	'
												+'</div>'				
												+'<div class="con">'
													+'<h3>'+data[i].category+'</h3>'
													+'<p>'+data[i].name+'</p>'
												+'</div>'
											+'</li>';
							}
							$("#scroller ul").html(html);
						break;
					
					case "project":	
						$("#scroller ul").html('');
						var html='';
						html+='<li class="up"><h2>项目介绍<h2></li>';
						for(var i=0;i<data.length;i++){
								html+='<li class="down">'
													+'<p>'+data[i].name+'</p>'
													+'<p>'+data[i].description+'</p>'
													+'<p>'+data[i].detail+'</p>'									
													+'<p>'+data[i].tech+'</p>'									
												+'</li>'
						}
						$("#scroller ul").html(html);
					break;
					
					case "work":	
						$("#scroller ul").html('');
						var html='';
						html+='<li class="up"><h2>工作经历<h2></li>';
						for(var i=0;i<data.length;i++){
								html+='<li class="down">'
													+'<p>'+data[i].name+'</p>'
													+'<p>'+data[i].time+'</p>'
													+'<p>'+data[i].posts+'</p>'									
													+'<p>'+data[i].projects+'</p>'									
												+'</li>'
						}
						$("#scroller ul").html(html);
					break;
					
					case "self":	
						$("#scroller ul").html('');
						var html='';
						html+='<li class="user"><div class="circle"><img class="bounceIn animated" src="img/logo.jpeg"/></div></li>';
						for(var i=0;i<data.length;i++){
								html+='<li class="tit">'
													+'<p>姓名：'+data[i].name+'</p>'
													+'<p>性别：'+data[i].sex+'</p>'
													+'<p>Tel：'+data[i].phone+'</p>'								
												+'</li>'
						}
						$("#scroller ul").html(html);
					break;
					
				}	
			
			myScroll.scrollTo(0,0);
			myScroll.refresh();
		})
		
	})
	
	$('#wrapper').swipeLeft(function(){
		console.log($("#footer ul li[class='green']").index())
		var index=$("#footer ul li[class='green']").index()+1;
		
		$('#footer ul li').eq(index).addClass('green').siblings('li').removeClass('green');
		var id=$("#footer ul li[class='green']").index()+2;
		console.log(id)
		var target=$('#footer ul li').eq(index).attr('id');
		
		$.post('http://localhost:8000/'+target,function(data){
			var html='';
			for(var i=0;i<data.length;i++){
				html+='<li>'
								+'<div class="img">'
									+'<img src="img/logo.jpeg" />	'
								+'</div>'				
								+'<div class="con">'
									+'<h3>'+data[i].category+'</h3>'
									+'<p>'+data[i].name+'</p>'
								+'</div>'
							+'</li>'
			}
			$("#scroller ul").html(html);
			myScroll.scrollTo(0,0);
			myScroll.refresh();
		})
	})
	

var ado=document.getElementById("ado");
$(".music").on('tap',function(){
	if(ado.paused){
		ado.play();
	}else{
		ado.pause();
	}
})
