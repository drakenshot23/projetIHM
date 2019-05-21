$(document).ready(function (){
    $("#project").click(function (){
        $('html, body').animate({
            scrollTop: $("#page_bottom").offset().top
        }, 1000);
        $('#project').animate({
            color : "#000"
        },1500);
    });
});

$(window).scroll(function () {
     
})


