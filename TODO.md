- revoir toute l'archi : séparer proprement server et frontend, sans rien en commun (ni version de node, de yarn, ni webpack, ni package.json). Comme ça on peux bosser un peu plus efficacement, et updater un côté sans casser l'autre.
    Pour faire ça il va falloir refaire tout le projet from scratch dans un autre dossier je pense

- traiter TODOs dans le code
- côté server, essayer de se débarasser de l'archi old schoold controller/services, essayer de tout mettre direct dans le controller, quitte à séparer en plusieurs controlleurs. Je pense que ça devrait rendre le code beaucoup plus limpide.
- repasser sur le code, revoir certains nommages, voir si je peux faire plus clair/plus simple

- upgrader les dépendances
- redux : upgrader avec redux-toolkit
- ptêt refaire certains trucs avec des hooks au lieu de redux (la search par exemple ?).
- ptêt voir si je peux pas bricoler une alternative à redux moi-même (avec juste un état, et les actions seraient directement des fonctions, ça marcheraient non ?)
- voir si on peut pas externaliser la creation de compte avec un truc genre Firebase (mais garder quand même mon backend, car c'est bien de m'entrainer là dessus aussi)
- rebosser un peu le css, essayer de passer à un container non-fluide
- optimiser perfs des appels, se démerder pour quel la page initiale puisse être rapide même si je mets pleins de série par défaut.
- optimiser perfs : essayer d'importer que ce que j'ai besoin de bootstrap (la grid)
- optimiser perfs : cf les warnings quand on build comme en prod
- ptet afficher un loader discret pour quand les series se rechargent
- feature : faire que les séries puissent être cherchées/ajoutés/supprimés en localstorage si on est pas connecté (but : que je puisse montrer mon projet facilement lors des entretiens)
- un jour faire un affichage décent sur mobile
- ...
