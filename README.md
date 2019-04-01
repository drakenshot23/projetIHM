# Projet IHM

## Description

## Installation
- Cloner le projet sur votre machine
```bash
git clone
```
- Installer [https://www.enterprisedb.com/downloads/](PostgreSQL)
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
- Lancer les migrations
```bash
python manage.py migrate
```
- Lancer le serveur
```bash
python manage.py runserver
```
