$(document).ready(function (){
    $("#project").click(function (){
        $('html, body').animate({
            scrollTop: $("#page_bottom").offset().top
        }, 1000);
    });
});

