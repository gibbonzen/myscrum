# donOt : Gestion de projet AGILE

# AGILE SUR PROJET :

Pour tout le monde :
+ Backlog
+ SPRINT
+ Fonctionnalités chiffrées
+ Décompte des temps passés de manière automatique (avec indicateur couleur pour afficher l’état d’avancement vert, orange rouge ?
+ Attribution (assign to) 
+ icones pour tous les membres / customisation
+ compte rendu d'activités (CRA) par utilisateur/ dev

Pour le responsable :
Les documents principaux à générés :
+ Compte rendu de début de SPRINT = liste des fonctionnalités à faire et en cours au début du SPRINT -> envoi d’un mail par la suite
+ Rétrospective de fin de SPRINT = liste des fonctionnalités finies dans ce SPRINT, encore en cours et liste des fonctionnalités RAJOUTEES (avec également leur statut "fini" ou "en cours") ->	Envoi d’un mail par la suite

+ Il faudrait envoyer automatiquement un mail de validation pour chaque fonctionnalités rajoutées au pilote métier et au responsable projet. Le mail permettant de valider tous les ajouts par une action du valideur : bouton "valider" sur le mail.

Features en vrac :
+ Utilisateurs sans password ni droits particuliers
+ Notifications "push" et "email" paramétrables
+ Widget/ Post-it affichant la tâche "en cours" (déduction auto du temps en progressbar) et permettant de switcher sur une autre tâche assignée (stop du décompte de la précédente tâche et début du décompte sur la nouvelle).
+ Création des tâches "tests", "documentation" et "vérification" automatique au passage à "done" d'une tâche
+ Flaguer les tâches de retour en [RETOUR] (indicateurs). 

# Contraintes/ Solutions
+ Pas de serveur : chaque utilisateur à son "installation". 
+ Pas de base de données, mais un filer dispo -> Synchronisation GIT
+ L'application doit rester disponible même hors connexion :
  - Travailler en local
  - Synchronisation quand la connexion est retrouvée
+ Les donuts sont liées (parent -> enfant) :
  - Hiérarchie 1 = Fonctionnalité (donut)
  - H2 = Tâche (sugar)
  - H3 = Retour (topping)
  
# IHM
+ Espace "My donOt"
+ Espace "Sprints"
+ Backlog ?
+ Settings
+ Reports ? 
+ Historique ?
