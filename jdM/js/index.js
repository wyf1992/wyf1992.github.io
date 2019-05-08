window.onload = function(){
	search();
	banner();
	countDown();
}

var search = function(){
	var search = document.querySelector('.search');
	var banner = document.querySelector('.banner');
	var height = banner.offsetHeight;
	window.onscroll = function(){
		var scrollTop = document.body.scrollTop;
		var opacity = 0;
		if(scrollTop < height){
			opacity = scrollTop /height *0.85;
		}else{
			opacity = 0.85;
		}
		search.style.backgroundColor = 'rgba(201, 21, 35, '+ opacity +')';
	}
}

var banner = function(){
	// 1. 自动轮播，无缝   定时器，过渡
	// 2. 点随图片切换     index切换
	// 3. 滑动效果         touch事件
	// 4. 滑动结束 如果滑动距离小于屏幕1/3就吸附回去，否则就切换上下页
	
	// 屏幕宽度
	var width = document.querySelector('.banner').offsetWidth;
	// 图片容器
	var imgBox = document.querySelector('.banner ul:first-child');
	// 点容器
	var pointBox = document.querySelector('.banner ul:last-child');
	// 所有点
	var points = pointBox.querySelectorAll('li');

	// 加过渡
	var addTransition = function(){
		imgBox.style.transition = 'all 0.2s';
		imgBox.style.webkitTransition = 'all 0.2s';
	}
	// 取消过渡
	var removeTransition = function(){
		imgBox.style.transition = 'none';
		imgBox.style.webkitTransition = 'none';
	}
	// 加位移
	var setTranslateX = function(x){
		imgBox.style.transform = 'translateX('+ x +'px)';
		imgBox.style.webkitTransform = 'translateX('+ x +'px)';
	}

	// 点切换
	var setPoint = function(index){
		for (var i = points.length - 1; i >= 0; i--) {
			points[i].classList.remove('now');
		}
		points[index-1].classList.add('now');
	}
	
	// 定时器--自动轮播
	var index = 1;
	var timer = setInterval(function(){
		index ++;
		addTransition();
		setTranslateX(-index * width);

	},2000);

	// 轮播到最后一张，回到第一张
	imgBox.addEventListener('transitionend',function(){
		if(index >= 9){
			removeTransition();
			index = 1;
			setTranslateX(-index * width);
		}else if(index <= 0){
			removeTransition();
			index = 8;
			setTranslateX(-index * width);
		}
		setPoint(index);
	})


	// 滑动
	var startX = 0;
	var distance = 0;
	var isMove = false;
	imgBox.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startX = e.changedTouches[0].clientX;
	});
	imgBox.addEventListener('touchmove',function(e){
		isMove = true;
		distance = e.changedTouches[0].clientX - startX;
		removeTransition();
		setTranslateX(-index * width + distance);
	});
	imgBox.addEventListener('touchend',function(e){
		if(!isMove){return;}
			addTransition();
		if(Math.abs(distance) > width / 3){
			index = distance > 0 ? index - 1 : index + 1;
		}
			setTranslateX(-index * width);
			clearInterval(timer);
			timer = setInterval(function(){
				index ++;
				addTransition();
				setTranslateX(-index * width);

			},2000);
		isMove = false;
		startX = 0;
		distance = 0;
	});	
}

var countDown = function(){
	var timeBox = document.querySelector('.second-skill .time');
	var timeSpans = timeBox.querySelectorAll('span');
	var time = 2 * 60 * 60;
	var timer = setInterval(function(){
		time --;
		var h = Math.floor(time / 3600);
		var m = Math.floor(time % 3600 / 60);
		var s = Math.floor(time % 60);
		timeSpans[0].innerText = Math.floor(h / 10);
		timeSpans[1].innerText = h % 10;
		timeSpans[3].innerText = Math.floor(m / 10);
		timeSpans[4].innerText = m % 10;
		timeSpans[6].innerText = Math.floor(s / 10);
		timeSpans[7].innerText = s % 10;
		if(time <= 0){
			clearInterval(timer);
		}
	},1000);
}

