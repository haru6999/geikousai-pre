$(function() {
	Array.prototype.remove = function(element) {
	  for (var i = 0; i < this.length; i++)
	    if (this[i] == element) this.splice(i,1); 
	};

	function preload(images, progress) {
		var total = images.length;
	    $(images).each(function(){
			var src = this;
	        $('<img/>')
				.attr('src', src)
				.load(function() {
					images.remove(src);
					progress(total, total - images.length);
				});
	    });
	}
	
	var now_percent = 0;
  var displaying_percent= 0;
  for(var i=1;i<=19;i++){
    preload([
      'image/top.png',
      'image/bushocho/'+i+'.png',
      'image/icon/'+i+'.png'
    ], function(total, loaded){
      now_percent = Math.ceil(100 * loaded / total);
    });
  }

	var timer = window.setInterval(function() {
		if (displaying_percent >= 100) {
			window.clearInterval(timer);
			$('#loader').fadeOut('slow', function() {
        $('.loaderBox').hide();
        $('#content').show();
        // リロード時にページtopへ
        $('.contents').css({
          'display':'none'
        });
        $('html,body').animate({ scrollTop: 0 },  { duration: 1500});
        setTimeout(function(){
          $('.contents').css({
            'display':'block'
          });
        },1000);
			});
		} else {
			if (displaying_percent < now_percent) {
				displaying_percent++;
				$('#load-text').html(displaying_percent + '%');
				$('#bar span').css('width', displaying_percent + '%');
			}
		}
	}, 
	20);

});


jQuery(window).on('load', function() {
  // about,themeのfadeIn
  jQuery(window).scroll(function (){
    var elemPos1 = $('.about').offset().top;
    var elemPos2 = $('.theme').offset().top;
    var elemPos3 = $('.topImg').offset().top;
    var elemPos4 = $(window).height() - elemPos3;
    var elemPos4Init = ($(window).height())*0.59;
    var elemPos = new Array();
    for(var i=1;i<=4;i++){
      elemPos[i] = $('.line'+i).offset().top;
    }
    var scroll = jQuery(window).scrollTop();
    var windowHeight = jQuery(window).height();
    if (scroll > elemPos1 - windowHeight + windowHeight/3){
      $('.about').addClass('LeftToRight');
    }
    if (scroll > elemPos2 - windowHeight + windowHeight/3){
      $('.theme').addClass('RightToLeft');
    }
    for(var i=1;i<=4;i++){
      if (scroll > elemPos[i] - windowHeight + 100){
        $('.line'+i).addClass('lineZoom');
      }
    }

    // maru
    var aa = 150*elemPos4/elemPos4Init ;
    setTimeout(function(){
      $('#maru1').css({
        'animation': 'maru01 4s infinite linear'
      })
      $('#maru3').css({
        'animation': 'maru03 4s infinite linear'
      })
      $('#maru6').css({
        'animation': 'maru06 4s infinite linear'
      })
      $('#maru8').css({
        'animation': 'maru08 4s infinite linear'
      })

    },0);
    setTimeout(function(){
      $('#maru2').css({
        'animation': 'maru02 4s infinite linear'
      })
      $('#maru4').css({
        'animation': 'maru04 4s infinite linear'
      })
      $('#maru5').css({
        'animation': 'maru05 4s infinite linear'
      })
      $('#maru7').css({
        'animation': 'maru07 4s infinite linear'
      })
      
    },2000);
    if(elemPos4>=0){ //スクロールし始めから.topImgが隠れるまで
      $('.maru').css({
        'transform': 'scale(0.12) translate(0,calc(5vh + '+aa+'vh))'
      })
      // console.log("bb")
    }else if(elemPos4<0){
      $('.maru').css({
        'transform': 'scale(0.12) translate(0,0)'
      })
    }    
  });


  // movieの文字スライド
  $("#movieText").ready(function(){  
    var i = 0;
    var windowWidth = $(window).width();
    var slide = function(){
      $("#movieText").css({
        'transform':'matrix(1,0,0,1,'+ i +',0)'
      });
      i --;
    }
    var id = setInterval(function(){
      slide();
      if(i ==　-224){　
        // clearInterval(id);  
        i = 0;
      }
    }, 15);
  });

  // 部署長画像(丸)
  for(var i=3;i<=19;i++){
    $('.memberImgBox').append('<div class="memberImgDiv"><img src="image/members/'+i+'.png" class="memberImg" id="me'+i+'"></div>')
    if(i%3==0 || i%3==2){ //左の列と右の列

    }else{ //真ん中の列
      $('#me'+i).css({
        'margin-top':'5vh'
      })
    }
  }

  // 適部署バーガー
  $("#tekibusho img").ready(function(){  
    var i = 0;
    var j = 0;
    var x = 0;
    var y = 0;
    var moveX = function(){
      i++;
      x=i;
      if(i>=85){
        x = 85 - (i-85);
      }
      if(i==170){
        i=0;
        x=i;
      }
      $("#tekibusho img").css({
        'left': x+'vw'
      });
    }
    var moveY = function(){
      j+=0.5;
      y=j;
      if(j>=95){
        y = 95 - (j-95);
      }
      if(j==190){
        j=0;
        y=j;
      }
      $("#tekibusho img").css({
        'top': y+'%'
      });
    }
    setInterval(function(){
      moveX();
      moveY();
    }, 80);
  });

  // popup
  $('#close').click(function(){
    $('.black').css({
      'display':'none'
    })
    $('.popup').css({
      'animation':'popsOut .5s'
    })
    setTimeout(function(){
      $('.popup').css({
        'display':'none',
        'animation': 'none'
      });
    },500);
  })
  $('.memberImg').click(function(){
    var meIdSp = $(this).attr('id') .split('me');
    var meId = meIdSp[1];
    $('.icon').attr("src","image/icon/"+meId+".png");
    $('.bushocho').attr("src","image/bushocho/"+meId+".png");
    switch(meId){
      case "1":
        $('.bushomei').text('芸工祭長');
        $('.name').text('パッション');
      break;
      case "2":
        $('.bushomei').text('副祭長');
        $('.name').text('ジャーヴィス');
      break;
      case "3":
        $('.bushomei').text('書記');
        $('.name').text('ハヤミ');
      break;
      case "4":
        $('.bushomei').text('総務');
        $('.name').text('フラット');
      break;
      case "5":
        $('.bushomei').text('会計');
        $('.name').text('さくら');
      break;
      case "6":
        $('.bushomei').text('web部署長');
        $('.name').text('うーさー');
      break;
      case "7":
        $('.bushomei').text('映像部署長');
        $('.name').text('ざわくん');
      break;
      case "8":
        $('.bushomei').text('グラフィック部署長');
        $('.name').text('マルメ');
      break;
      case "9":
        $('.bushomei').text('インテリア部署長');
        $('.name').text('ひざ');
      break;
      case "10":
        $('.bushomei').text('エクステリア部署長');
        $('.name').text('てら');
      break;
      case "11":
        $('.bushomei').text('ディレクション部署長');
        $('.name').text('アルジャ');
      break;
      case "12":
        $('.bushomei').text('ブース部署長');
        $('.name').text('ミーシャ');
      break;
      case "13":
        $('.bushomei').text('バー部署長');
        $('.name').text('クロール');
      break;
      case "14":
        $('.bushomei').text('ワークショップ部署長');
        $('.name').text('セゾン');
      break;
      case "15":
        $('.bushomei').text('昼ステ長');
        $('.name').text('鋤骨');
      break;
      case "16":
        $('.bushomei').text('夜ステ長');
        $('.name').text('ボマイェ');
      break;
      case "17":
        $('.bushomei').text('カフェ部署長');
        $('.name').text('ごま');
      break;
      case "18":
        $('.bushomei').text('PA部署長');
        $('.name').text('ドナさん');
      break;
      case "19":
        $('.bushomei').text('運動会部署長');
        $('.name').text('ジョニー');
      break;
    }
    $('.black').css({
      'display':'inline'
    })
    $('.popup').css({
      'display':'inline',
      'animation':'popsIn .5s'
    })
    setTimeout(function(){
      $('.popup').css({
        'animation': 'none'
      });
    },500);
  })
  

});