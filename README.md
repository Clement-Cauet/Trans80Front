<p align="center">
  <img src="https://github.com/user-attachments/assets/eddb4bcb-71d9-4a49-9a1f-5c4a4179b69d" alt="Trans80 logo" width="200px">
</p>
<h1 align="center">Trans80</h1>

## Description
Trans80 est une application web développée pour faciliter la consultation des horaires de bus du réseau Trans80 dans la région Hauts-de-France. Elle s'appuie sur les données ouvertes au format GTFS pour offrir une expérience fluide et interactive aux usagers des transports en commun.

## Fonctionnalités
- **Affichage des lignes** : Visualisation des lignes de bus du réseau Trans80.
- **Consultation des horaires** : Horaires détaillés des trajets par arrêt.
- **Favoris** : Ajout et gestion de trajets favoris pour un accès rapide.
- **Authentification** : Connexion sécurisée via Keycloak.

<div align="center">
  <img src="https://github.com/user-attachments/assets/18372fa1-3f6c-479d-bec0-04a17bb500b8" width="200px">
  <img src="https://github.com/user-attachments/assets/98e53e34-0823-4ff5-9c72-75e2400497ad" width="200px">
  <img src="https://github.com/user-attachments/assets/d2479405-3810-44b3-974f-1b600bcd0c36" width="200px">
  <img src="https://github.com/user-attachments/assets/f325053c-41c8-4294-b3d7-bd596e0b0794" width="200px">
</div>

## Prérequis
- Node.js (v18 recommandé)
- Angular CLI
- Serveur backend Java Spring Boot opérationnel
- Serveur Keycloak configuré
- Navigateur moderne (Chrome, Firefox, Edge…)

## Installation
- Cloner le projet
```bash
git clone https://github.com/Clement-Cauet/trans80front.git
cd trans80front
```
- Installer les dépendances
```bash
npm start
```
- Lancer l'application en local avec le proxy
```bash
npm start
```

## Technologies utilisées
- Frontend : Angular
- Style : TailwindCSS
- Backend : Java Spring Boot + OneBusAway (données GTFS)
- Authentification : Keycloak
- Données : Format GTFS (General Transit Feed Specification)
