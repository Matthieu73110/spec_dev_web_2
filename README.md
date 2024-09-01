# Markdown App

Groupe de projet : Matthieu Fanget, BenYamineALI Ali, Pierre Boscus, Aymeric Surre

## Description du projet

Markdown App est une application web permettant de créer, éditer et organiser des fichiers Markdown. Elle offre diverses fonctionnalités telles que la gestion des fichiers sous forme d'une arborescence, l'ajout de blocs personnalisés, la gestion des raccourcis, ainsi que l'import/export d'images et de blocs. 

Cependant, en raison de contraintes de temps, nous n'avons pas pu pleinement intégrer la gestion de l'arborescence des fichiers avec le reste de l'application. Cette fonctionnalité est partiellement implémentée et nécessite des améliorations pour une intégration complète.

Nous avons utilisé des outils d'assistance à la programmation tels que ChatGPT et GitHub Copilot pour certaines parties du code, notamment l'arborescence des fichiers et le style de l'application.

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé les éléments suivants :

- Node.js (version 14.x ou supérieure)
- npm (version 6.x ou supérieure) ou yarn

## Installation

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

Installez les dépendances nécessaires avec npm ou yarn :

```bash
npm install
```

ou

```bash
yarn install
```

## Lancer l'application

Pour démarrer l'application en mode développement, utilisez la commande suivante :

```bash
npm start
```

ou

```bash
yarn start
```

Cette commande démarre un serveur de développement et ouvre l'application dans votre navigateur par défaut. L'application sera accessible à l'adresse `http://localhost:3000`.

### Autres commandes utiles

- **Build de l'application pour la production :**

```bash
npm run build
```

ou

```bash
yarn build
```

Cette commande compile l'application en mode production dans le dossier `build`.

- **Analyse du bundle de production :**

```bash
npm run analyze
```

ou

```bash
yarn analyze
```

Cette commande permet d'analyser la taille du bundle généré pour l'application.

## Contributions et Remerciements

Ce projet a été développé en équipe, et nous avons utilisé des outils d'assistance à la programmation tels que ChatGPT et GitHub Copilot pour certaines parties du code, en particulier pour l'implémentation de l'arborescence des fichiers et l'harmonisation du style avec React-Bootstrap ainsi que ce readme.

Bien que nous n'ayons pas réussi à finaliser l'intégration complète de l'arborescence avec le reste de l'application, ce projet constitue une base solide pour des développements futurs.
