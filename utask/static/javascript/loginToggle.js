let connexionBtn = document.getElementById('connexion-btn');
let inscriptionBtn = document.getElementById('inscription-btn');
let connexionForm = "<form action=\"/login\" method=\"post\">\n" +
    "                {% csrf_token %}\n" +
    "                <label for=\"email\" class=\"loginlbl\">Email</label><br />\n" +
    "                <input type=\"text\" class=\"round-input\" placeholder=\"exemple@mail.com\"><br />\n" +
    "                <label for=\"password\" class=\"passwordlbl\">Mot de passe</label><br />\n" +
    "                <input type=\"text\" class=\"round-input\" placeholder=\"********\"><br />\n" +
    "                <input type=\"submit\" class=\"primary-btn\" value=\"Connexion\">\n" +
    "            </form>";
let


connexionBtn.addEventListener('click', function () {
   alert('connexion');
});

inscriptionBtn.addEventListener('click', function () {
   alert('inscription');
});