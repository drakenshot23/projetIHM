function moreSkill(name){
    let element = 'jauge_'+name;
    let score = parseInt($('#'+element).attr("data-score"));

    if (score < 10){
        score = score + 1;
        $('#'+element).attr("data-score",score);
        loadDataJauge(score,name);
    }
}

function lessSkill(name){
    let element = 'jauge_'+name;
    let score = parseInt($('#'+element).attr("data-score"));

    if (score > 0){
        score = score - 1;
        $('#'+element).attr("data-score",score);
        loadDataJauge(score,name);
    }
}

function loadDataJauge(score,name){
    let jauge = 'jauge_full_'+name;
    let p = 'score_'+name;

    if (score < 5)
        $('#'+jauge).removeClass('green_jauge');
    else
        $('#'+jauge).addClass('green_jauge');

    let size = score * 18;
    let top = 180 - size;

    $('#'+p).html(score*10+"%");

    $('#'+jauge).css({
       'height': size+'px',
       'top':top+'px'
    });
}