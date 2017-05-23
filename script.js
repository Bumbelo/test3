$(document).ready(function(){
    //animacja przy kliknięciu anchora
    $(".mobile").hide();
    $(".toggle-nav").click(function(){
        $(".mobile").slideToggle(250);
    });
    $(".navigation").click(function(){
       $("html, body").stop().animate({
           scrollTop:$($(this).attr("href")).offset().top-40
       }, 500) 
    });
});

var closeImage = function(){
    $("#popupDiv").fadeOut(150, function(){
    $("#popupDiv").remove();    
    $("#popup").remove();
    $(".fullsize").remove();
    $(".popup_left, .popup_right").remove();
    });
    $('body').off('scroll mousewheel touchmove');
};

var galleryCounter=1;

var changeImageRight = function(){
    //$("#popup").fadeOut(500);
    galleryCounter++;
    if(galleryCounter===(".galimg").length){
        galleryCounter=1;
    }
    $("#popup").stop().fadeOut(75, function(){
        $("#popup").attr('src', 'animal'+galleryCounter+'.jpg').stop().fadeIn(150);
    });
    //$("#popup").attr('src', 'animal'+galleryCounter+'.jpg').fadeIn(500);
}

var changeImageLeft = function(){
    galleryCounter--;
    if(galleryCounter===0){
        galleryCounter=(".galimg").length-1;
    }
    $("#popup").stop().fadeOut(75, function(){
        $("#popup").attr('src', 'animal'+galleryCounter+'.jpg').stop().fadeIn(150);
    });
}


$(document).ready(function(){
    $(".galimg").click(function(){
        var img=$(this).attr("src");
        var popup = "<div class='fullsize'><a href='#/' class='popup_left'><img src='aleft.png'></a><div id='popupDiv'><img id='popup' src='"+img+"'></div><a href='#/' class='popup_right'><img src='aright.png'></a></div>";
        $('body').on('scroll mousewheel touchmove', function(pgScroll) {
      pgScroll.preventDefault();
      pgScroll.stopPropagation();
      return false;
});
        
        galleryCounter=($(this).index()+1);
        $("body").append(popup);
        $("#popupDiv").hide();
        $("#popupDiv").fadeIn(150);
        $("#popupDiv").click(closeImage);
        
        $(".popup_right").click(changeImageRight); 
        $(".popup_left").click(changeImageLeft);
        
    });
});


/*$(document).ready(function(){
    $(".control_left, .control_right").hide();
    $(".slides").on({
    mouseenter: function () {
        $(".control_left, .control_right").fadeIn(500);
    },
    mouseleave: function () {
        $(".control_left, .control_right").fadeOut(500);
    }
    });
    $(".control_left, .control_right").on({
    mouseenter: function () {
        $(".control_left, .control_right").fadeIn(500);
    },
    mouseleave: function () {
        $(".control_left, .control_right").fadeOut(500);
    }
    });
});
*/

$(document).ready(function(){
    $(".control_left, .control_right").hide();
    $("#image_slider").on({
    mouseenter: function () {
        $(".control_left, .control_right").stop().fadeIn(400);
    },
    mouseleave: function () {
        $(".control_left, .control_right").stop().fadeOut(400);
    }
    });
});


var hamburger = function(){
    if($(document).width()<=800){
        $(".slicknav").show();
        $(".desktop").hide();
        $(".navigation").click(function(){
           $(".mobile").slideUp(250); 
        });
    }
    else if($(document).width()>800){
        $(".slicknav").hide();
        $(".desktop").show();
        $(".mobile").hide();
    };
   
};


$(document).ready(hamburger);
$(window).resize(hamburger);


var resetAnimation;
var startAnimation;
var szerokosc;

$(document).ready(function(){
    szerokosc=$(".slide").width();
});

$(window).resize(function(){
   szerokosc=$(".slide").width();
});

var currentSlide=1;
var animationSpeed=1000;
var pause = 5000;
$( document ).ready(function() {
    
    //var width = $(".slide").width();
    var $slider = $("#slider");
    var $slideContainer = $slider.find(".slides");
    var $slides = $slideContainer.find(".slide");
    var interval;
    
    var ctrl_right = function(){
            $("a.control_right").off("click");
            $("a.control_left").off("click");
            $slideContainer.animate({"margin-left": "-="+szerokosc}, animationSpeed, function(){
                currentSlide++;
                        if (currentSlide === $slides.length){
                            currentSlide = 1;
                            $slideContainer.css("margin-left", 0);
                        }
                        if (currentSlide === $slides.length){
                            currentSlide = 1;
                            $slideContainer.css("margin-left", 0);
                        }
                $("a.control_right").on("click", ctrl_right);
                $("a.control_left").on("click", ctrl_left);
            });
    };
    
    $("a.control_right").on("click", ctrl_right);
    
    var ctrl_left = function(){
            $("a.control_left").off("click");
            $("a.control_right").off("click");
                        if (currentSlide === 1){
                            currentSlide=$slides.length;
                            $slideContainer.css("margin-left",(currentSlide-1)*(-1*szerokosc));
                        }
            $slideContainer.animate({"margin-left": "+="+szerokosc}, animationSpeed, function(){
                currentSlide--;    
                    $("a.control_left").on("click", ctrl_left);
                    $("a.control_right").on("click", ctrl_right);
                
            });
    };
    
    $("a.control_left").on("click", ctrl_left);
    
    function startSlider(){
        interval=setInterval(function(){
            $("a.control_right").off("click");
            $("a.control_left").off("click");
            $slideContainer.animate({"margin-left": "-="+szerokosc}, animationSpeed, function(){
                    currentSlide++;
                        if (currentSlide === $slides.length){
                            currentSlide = 1;
                            $slideContainer.css("margin-left", 0);
                        }
                        $("a.control_right").on("click", ctrl_right);
                        $("a.control_left").on("click", ctrl_left);
                    });
        }, pause);
    }
    
    /*$("a.control_right").click(function(){
            $("a.control_right").off("click");
            $slideContainer.animate({"margin-left": "-="+szerokosc}, animationSpeed, function(){
                currentSlide++;
                        if (currentSlide === $slides.length){
                            currentSlide = 1;
                            $slideContainer.css("margin-left", 0);
                        }
            });
            $("a.control_right").on("click");
    });*/
    
    function stopSlider(){
        clearInterval(interval);
    }
        
    $slider.on("mouseenter", stopSlider).on("mouseleave", startSlider);
    
    $("a.control_left").on("mouseenter", stopSlider).on("mouseleave", startSlider);
    $("a.control_right").on("mouseenter", stopSlider).on("mouseleave", startSlider);
    
    
    
    startSlider();
    
    resetAnimation=function(){
        stopSlider();
    };
    
    startAnimation=function(){
        startSlider();
    }
    
});

$(window).resize(function(){
    resetAnimation(); 
});


//var blabla;
$(window).resize(function(){
    var $slider = $("#slider");
    var $slideContainer = $slider.find(".slides");
    var $slides = $slideContainer.find(".slide");
   
    /*$(document).ready(function(){
            blabla=$(".slide").width();
            if($("#wrapper").width()<1000){
                $slideContainer.css("margin-left", blabla*2);
    }
        });*/
    
    $slideContainer.css("margin-left", (currentSlide-1)*(-1*szerokosc));
    
    startAnimation();
});

