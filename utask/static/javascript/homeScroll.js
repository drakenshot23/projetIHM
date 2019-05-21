$(document).ready(function (){
    $("#project").click(function (){
        $('html, body').animate({
            scrollTop: $("#page_bottom").offset().top
        }, 1000);
        if (window.innerWidth >= 830) {
            $('#project').animate({
                color: "#000"
            }, 1500);
            $('#profil').animate({
                color: "#000"
            }, 1500);
            $('#logout').animate({
                borderColor: "#B466A8",
                //backgroundColor:"rgba(180, 102, 168, 0.3)",
                color: "#B466A8"
            }, 1500);
        }
    });
});

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
     if (window.innerWidth >= 830) {
         if (scroll > 100) {
             $('#project').css({
                 'color': 'black'
             })
             $('#profil').css({
                 'color': 'black'
             });
             $('#logout').css({
                 'border-color': '#B466A8',
                 //'background-color':'rgba(180, 102, 168, 0.3)',
                 'color': '#B466A8'
             });
         } else {
             $('#project').css({
                 'color': 'white'
             });
             $('#profil').css({
                 'color': 'white'
             });
             $('#logout').css({
                 'border-color': 'white',
                 //'background-color':'rgba(255,255,255,0.3)',
                 'color': 'white'
             });
         }
     }
});





