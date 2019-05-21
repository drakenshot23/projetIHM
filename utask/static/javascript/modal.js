
function openModal(name){
    let element = 'modal_'+name;
    $('#background_modals').css({
        'opacity':'1',
        'visibility':'visible'
    });
    $('#'+element).css({
        'display':'block'
    });
    $('body').css({
        'overflow':'hidden'
    })
}

function closeModal(name){
    let element = 'modal_'+name;
    $('#'+element).css({
        'display':'none'
    });
    $('#background_modals').css({
        'opacity':'0',
        'visibility':'hidden'
    });
    $('body').css({
        'overflow':'visible'
    })
}
