$(document).ready(function(){
    $(window).scroll(function(){
        //making the navbar sticky after we scroll
        //for making the navbar seen on top of the screen after we scroll down
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }
        else{
            $('.navbar').removeClass("sticky");
        }
    });
    // toggle menu/navbar script 
    $('.menu-btn').click(function(){                    //I created this for the purpose of responsiveness
        $('.navbar .menu').toggleClass("active");       //use it
        $('.menu-btn i').toggleClass("active");
    });
});

const background = document.getElementById('Home')
background.style.background = "url('images/cubes_pattern_blue_aqua_abstraction_4k_8k_hd_abstract-min.jpg')"
background.style.backgroundSize = "cover"