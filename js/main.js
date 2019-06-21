jQuery(function($){
  // リロード時にページtopへ
  $('html,body').animate({ scrollTop: 0 },  { duration: 1500});

  // about,themeのfadeIn
  jQuery(window).scroll(function (){
      var elemPos1 = $('.about').offset().top;
      var elemPos2 = $('.theme').offset().top;
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
  });

  // movieの文字スライド
  $("#movieText").ready(function(){  
    var i = 0;
    var scroll = function(){
      $("#movieText").css({
        'transform':'matrix(1,0,0,1,'+ i +',0)'
      });
      i --;
    }
    var id = setInterval(function(){
      scroll();
      if(i ==　-225){　
        // clearInterval(id);  
        i = 0;
        console.log(i)
    }}, 15);
  });

  // 部署長画像(丸)
  for(var i=3;i<=19;i++){
    $('.memberImgBox').append('<div class="memberImgDiv"><img src="image/members/'+i+'.png" class="memberImg me'+i+'"></div>')
    if(i%3==0 || i%3==2){ //左の列と右の列

    }else{ //真ん中の列
      $('.me'+i).css({
        'margin-top':'5vh'
      })
    }
  }
  

});