--------------------------------

Dockerfile

Le conteneur est configuré pour inclure les éléments suivants :

    Fichier Dockerfile : Contient les instructions pour construire l'image Docker.
    Fichier package.json et package-lock.json : Spécifie les dépendances de l'application Node.js et leurs versions.
    Fichier index.js : Fichier principal de l'application Node.js.
    Dossier /data : Contient les données nécessaires à l'application.


Construisez l'Image Docker :

    docker build -t mon-projet-node .

Exécution du Conteneur

Une fois que l'image Docker est construite, vous pouvez l'exécuter avec les commandes suivantes :

    docker run -d -p 3000:3000 mon-projet-node


Cela démarre un conteneur basé sur votre image Docker et expose le port 3000 de ce conteneur sur le port 3000 de votre machine hôte.

Accès à l'Application

    Vous pouvez accéder à votre application en ouvrant un navigateur web et en naviguant vers l'URL suivante : http://localhost:3000.


--------------------------------

Docker-compose.yml

Le fichier docker-compose.yml contient la configuration suivante pour les services :
Service Redis Insight

    Image : redislabs/redisinsight:latest
    Ports : Mapping du port 8001 de l'hôte au port 8001 du conteneur
    Dépendances : Dépend du service Redis pour fonctionner
    Redémarrage Automatique : Toujours redémarré en cas de problème
    Volumes : Montage d'un volume local pour stocker la configuration de Redis Insight

Service Redis

    Image : redis:latest
    Ports : Mapping du port 6379 de l'hôte au port 6379 du conteneur
    Volumes : Montage d'un volume local pour stocker les données de Redis

Service HAProxy

    Construction : Utilise un Dockerfile local (Dockerfile-haproxy) pour configurer HAProxy
    Ports : Mapping du port 3000 de l'hôte au port 3000 du conteneur
    Dépendances : Dépend des services motus_app_1 et motus_app_2 pour distribuer le trafic

Démarrez les Services avec Docker Compose :

    docker-compose up

Accédez à l'Interface de Redis Insight :

    Ouvrez un navigateur web et accédez à l'URL suivante : http://localhost:8001 pour accéder à l'interface de Redis Insight.





--------------------------------------

score.js

Le code utilise les modules express et body-parser pour créer un serveur Express et analyser les données JSON dans les requêtes.
Endpoints de l'API

L'application expose deux endpoints de l'API :

    POST /setscore : Permet d'enregistrer le score d'un joueur. Il attend un objet JSON contenant les propriétés player (nom du joueur) et score (score du joueur). Une fois reçu, il enregistre le score dans un fichier plat.
    GET /getscore : Permet de récupérer le score d'un joueur. Il renvoie le score du joueur stocké dans le fichier plat.

Installation des Dépendances

    Initialisez un Projet Node.js :

    Si vous n'avez pas déjà un projet Node.js, créez-en un en exécutant npm init dans un nouveau répertoire.

    Installez les Dépendances :

    Installez les dépendances nécessaires en exécutant la commande suivante :

        npm install express body-parser

    Une fois les dépendances installées, vous pouvez exécuter l'application avec la commande suivante :

        node index.js


Utilisation de l'API


Vous pouvez interagir avec l'API en utilisant des requêtes HTTP POST et GET. Voici quelques exemples :

    Enregistrer le Score :

        curl -X POST -H "Content-Type: application/json" -d '{"player": "Alice", "score": 100}' http://localhost:3001/setscore

    Récupérer le Score :

        curl http://localhost:3001/getscore


------------------------------

Score.html


Ce fichier HTML, score.html, est une page de score pour le jeu MOTUS. Voici un bref aperçu de son contenu et de son utilisation :
Description

La page de score affiche les informations de score pour le jeu MOTUS. Elle contient les éléments suivants :

    Un titre indiquant "Page de score MOTUS".
    Une section <div> avec l'ID "scoreInfo" où les informations de score seront affichées.
    Un lien "Retourner à la page principale" qui redirige vers la page principale du jeu MOTUS.
    Un lien vers le script JavaScript script.js qui gère le comportement de la page.


-----------------------------

haproxy.cfg


Ce fichier de configuration HAProxy détaille la mise en place de la répartition de charge pour le service MOTUS. Voici une explication détaillée du contenu du fichier et comment l'utiliser :
Description

Le fichier de configuration HAProxy est utilisé pour configurer la répartition de charge entre plusieurs instances du service MOTUS. Il utilise le protocole HTTP pour diriger le trafic vers les différentes instances en fonction des règles spécifiées.
Utilisation

    Emplacement du Fichier :

    Placez ce fichier de configuration dans le répertoire de votre application HAProxy.

    Détails de la Configuration :

        Defaults : Spécifie les paramètres par défaut pour les sections frontend et backend.

        Frontend motus_frontend : Configure le frontend avec la liaison sur le port 3001. Il utilise des ACL pour identifier les chemins d'accès spécifiques et diriger le trafic vers les backends correspondants.

        Backend motus_backend : Configure le backend pour le service MOTUS. Il utilise l'algorithme de répartition de charge "roundrobin" pour équilibrer la charge entre les serveurs. Les serveurs sont définis avec leurs adresses et ports respectifs, et HAProxy effectue des vérifications de santé périodiques (option httpchk) pour s'assurer qu'ils sont opérationnels.

        Backend anotherport_backend : Configure un autre backend pour un service sur un port différent. Il suit une structure similaire à motus_backend, mais avec des adresses de serveur et des ports différents.

    Utilisation :

        Lancement de HAProxy : Assurez-vous que HAProxy est installé sur votre système, puis lancez-le en utilisant ce fichier de configuration. Par exemple : haproxy -f haproxy.cfg.

        Test de la Configuration : Vérifiez que HAProxy démarre sans erreur et écoute sur le port spécifié (3001 dans cet exemple).

        Accès au Service MOTUS : Une fois HAProxy en cours d'exécution, vous pouvez accéder au service MOTUS en utilisant l'URL correspondante sur le port 3001 de votre machine.

------------------------------

Dockerfile

Le Dockerfile inclut les éléments suivants :

    Dockerfile : Contient les instructions pour construire l'image Docker.
    package.json et package-lock.json : Spécifie les dépendances de l'application Node.js et leurs versions.
    index.js : Fichier principal de l'application Node.js.
    /data : Contient les données nécessaires à l'application.

Construire l'Image Docker

bash

docker build -t mon-projet-node .


-----------------------------

auth.js


Cette application gère l'authentification des utilisateurs via OAuth2/OpenID. Elle permet aux utilisateurs de se connecter, de s'inscrire et de jouer à un jeu après authentification.
Configuration Requise

    Node.js
    MongoDB (pour le stockage des informations d'authentification)
    Redis (optionnel, pour la mise en cache)


Utilisation

Lancez l'application en exécutant la commande suivante :

    node auth.js

    Accédez à l'application dans votre navigateur web en naviguant vers l'URL suivante : http://localhost:3005.

Endpoints de l'API

L'application expose les endpoints suivants :

    GET /session : Affiche le contenu de la session utilisateur.
    GET /login.html : Affiche le formulaire de connexion.
    POST /login : Traite le formulaire de connexion et redirige vers la page du jeu en cas de succès.
    GET /register.html : Affiche le formulaire d'inscription.
    POST /register : Traite le formulaire d'inscription et enregistre un nouvel utilisateur.
    GET /game : Affiche la page principale du jeu après authentification.
    GET /callback : Endpoint de redirection depuis le serveur d'authentification. Génère un token JWT et redirige vers la page du jeu avec le token.

-----------------------------

login.html

Le fichier HTML login.html est fourni pour permettre aux utilisateurs de se connecter à l'application. Il contient un formulaire de connexion avec les champs username et password.
Utilisation du Fichier HTML de Login

    Ouvrez le fichier login.html dans un navigateur web.
    Remplissez les champs Username et Password avec vos informations de connexion.
    Cliquez sur le bouton Login pour vous connecter à l'application.


-----------------------------

register.html

Fichier HTML de Register

Le fichier HTML register.html permet aux utilisateurs de s'inscrire à l'application. Il contient un formulaire d'inscription avec les champs username, password et confirmPassword.




-----------------------------

index.js

Dockerfile

Le Dockerfile est inclus dans le répertoire du projet. Il contient les instructions pour construire l'image Docker de l'application.
Construire l'Image Docker

bash

docker build -t motus-app .

Installation des Dépendances

Assurez-vous d'avoir Node.js installé sur votre machine. Ensuite, exécutez la commande suivante pour installer les dépendances nécessaires :

bash

npm install

Configuration

L'application utilise un fichier de liste de mots français pour générer les mots pour le jeu MOTUS. Ce fichier est stocké dans le répertoire /data.
Lancement de l'Application

Une fois les dépendances installées, vous pouvez démarrer l'application en utilisant la commande suivante :

bash

npm start

L'application sera accessible à l'adresse http://localhost:3000.
Endpoints de l'API

L'application expose plusieurs endpoints de l'API pour interagir avec elle :

    /word : Renvoie un mot aléatoire pour le jeu MOTUS.
    /port : Affiche le port sur lequel l'application est en cours d'exécution.
    /health : Vérifie l'état de santé de l'application.

Middleware d'Authentification

Le middleware requireAuth vérifie si l'utilisateur est authentifié avant de lui permettre d'accéder à la route protégée /game.
Authentification

L'application redirige les utilisateurs non authentifiés vers le serveur d'authentification pour démarrer le processus d'authentification OAuth2/OpenID.
Accès au Jeu MOTUS

Une fois authentifié, les utilisateurs peuvent accéder au jeu MOTUS en naviguant vers l'URL http://localhost:3000/game.