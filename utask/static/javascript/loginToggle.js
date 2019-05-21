connexionBtn = document.getElementById('connexionBtn');
inscriptionBtn = document.getElementById('inscriptionBtn');
formLogin = document.getElementById('formLogin');
formInscription = document.getElementById('formInscription');

connexionBtn.addEventListener('click', function () {
    formLogin.classList.remove('displayNone');
    formInscription.classList.add('displayNone');

    connexionBtn.classList.add('activeBtn');
    inscriptionBtn.classList.remove('activeBtn');

});

inscriptionBtn.addEventListener('click', function () {
    formInscription.classList.remove('displayNone');
    formLogin.classList.add('displayNone');

    inscriptionBtn.classList.add('activeBtn');
    connexionBtn.classList.remove('activeBtn');
});
