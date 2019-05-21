// signupError = document.getElementsByClassName('error');

$('#connexionBtn').click(function () {
    $('#formLogin').removeClass('displayNone');
    $('#formInscription').addClass('displayNone');

    $('#connexionBtn').addClass('activeBtn');
    $('#inscriptionBtn').removeClass('activeBtn');
});

$('#inscriptionBtn').click(function () {
    $('#formInscription').removeClass('displayNone');
    $('#formLogin').addClass('displayNone');

    $('#inscriptionBtn').addClass('activeBtn');
    $('#connexionBtn').removeClass('activeBtn');
});