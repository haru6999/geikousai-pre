window.onload = function () {
  $('.topBox')
}

jQuery(function($){
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

});