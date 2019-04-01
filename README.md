# Projet IHM

## Description
Application de gestion de projets pour la licence PRISM.
## Installation
- Cloner le projet sur votre machine
```bash
git clone https://github.com/drakenshot23/projetIHM.git
```
- Installer [PostgreSQL](https://www.enterprisedb.com/downloads/)
- Creer l'environnement virtuel
```bash
python -m venv .venv
```
- Demarrer l'environnement virtuel (Windows)
```bash
.venv\Scripts\activate.bat
```
- (Unix)
```bash
source .venv/bin/activate
```
- Creer une base de donnees sur pgAdmin
- Renseigner les informations sur la connection a la base de donnees dans le fichier settings.py
```python
DATABASES = {     'default': {         'ENGINE': 'django.db.backends.postgresql',         'NAME': 'utaskdb',         'USER': 'robert',         'PASSWORD': 'robert',         'HOST': '127.0.0.1',         'PORT': '5432',     } }
```
- Lancer les migrations
```bash
python manage.py migrate
```
- Lancer le serveur
```bash
python manage.py runserver
```
