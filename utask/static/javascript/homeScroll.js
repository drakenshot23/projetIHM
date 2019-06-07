$(document).ready(function () {
    $("#project").click(function () {
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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$("#btn-create").click(function () {
    var list = {
        "test": "project"
    };
    var csrf_token = getCookie('csrftoken');
    $.ajax({
        type: "POST",
        headers: {"X-CSRFToken": csrf_token},
        url: "ajax_create_project/",
        dataType: "json",
        traditional: true,
        crossDomain: true,
        data: {'list': JSON.stringify(list)},
        success: function (data) {
            $('#container_project').append(data['project'].html);
        }
    });
});









