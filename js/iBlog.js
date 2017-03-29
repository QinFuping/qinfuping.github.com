$(document).ready(function() {
    console.log($('body').height());
	$('#wrapper>a').each(function() {
		$(this).css('background', 'url("'+$(this).children()[0].src+'") center 0 no-repeat');
	});
	$(window).scroll(function(event) {
		var scTop=$(window).scrollTop();
		$('#wrapper>a').each(function() {
			$(this).css('transform', 'translateY('+.7*scTop+'px)');
		});
		$('.show-prev,.show-next').css('transform', 'translateY('+.7*scTop+'px)');
		if(scTop>=$('#about').offset().top-$('#nav').height()){
			$('#nav').addClass('nav-dark');
			if(_move.timer2){
                clearInterval(_move.timer2);
            }
		}else{
            $('#nav').removeClass('nav-dark');
            if(_move.timer2){
                clearInterval(_move.timer2);
            }
            _move.timer2=setInterval(autoMove,duringTime);
		}
		// if(scTop>=$('#idea').offset().top-$(window).innerHeight()){
         //    $('#idea')[0].style.backgroundPositionY+=0.7*scTop+'px';
        // }
	});
	//main-show
	var container=document.getElementsByClassName('container')[0];
	var wrapper=document.getElementsByClassName('wrapper')[0];
	var showPrev=document.getElementsByClassName('show-prev')[0];
	var showNext=document.getElementsByClassName('show-next')[0];
	var slide=document.getElementsByClassName('slide');
	var duringTime=5000;
	container.scrollLeft=document.body.offsetWidth;	
	var tmpDOM=wrapper.innerHTML;
	var firstDOM=slide[0];//type of firstDOM is object
	var lastDOM=slide[slide.length-1];
	wrapper.innerHTML='';
	wrapper.appendChild(lastDOM);
	wrapper.innerHTML+=tmpDOM;
	wrapper.appendChild(firstDOM);
	var _move={};
	var autoNum=1;
	function moveTo(starPos,endPos,obj){
		if(_move.timer){
			clearInterval(_move.timer);
		}
		var starPos=starPos;
		var endPos=endPos;
		var step=0;
		var maxStep=40;
		var everyStep=(endPos-starPos)/maxStep;
		function move() {
			step++;
			obj.scrollLeft+=everyStep;
			if(step>=maxStep){
				obj.scrollLeft=endPos;
				clearInterval(_move.timer);
			}
		}
		_move.timer=setInterval(move,20);
	}
	function autoMove(){
	    // console.log('running');
		var picWidth=document.body.offsetWidth;
		container.scrollLeft=picWidth*autoNum;
		autoNum++;
		if(autoNum>slide.length-1){
			container.scrollLeft=document.body.offsetWidth;
			autoNum=2;
		}
		moveTo(container.scrollLeft,picWidth*autoNum,container);
	}
	_move.timer2=setInterval(autoMove,duringTime);
	showPrev.onclick=function(){
		console.log(slide.length);
		clearInterval(_move.timer2);
		autoNum-=2;
		if(autoNum<1){
			autoNum=slide.length-2;
		}
		autoMove();
		_move.timer2=setInterval(autoMove, duringTime);
	}
	showNext.onclick=function(){
		clearInterval(_move.timer2);
		autoMove();
		_move.timer2=setInterval(autoMove, duringTime);
	}
    //about
    $('.about-slide').hover(function(){
        $(this).children('.about-slide-title').css({'color':'#e71a1f'});
    },function(){
        $(this).children('.about-slide-title').css({'color':'#cecece'});
    });
    $('#about-prev').click(function () {
        $('.about-container').animate({scrollLeft:-$('.about-slide').width()},600);
    });
    $('#about-next').click(function(){
        $('.about-container').animate({scrollLeft:$('.about-slide').width()},400);
    });
});
