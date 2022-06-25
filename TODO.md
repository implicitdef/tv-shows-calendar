-   annuler firebase et remplacer par de l'auth fait maison :

    -   step 1 : regarder comment faire email/password proprement en 2022, JWT, etc. comment envoyer les emails, etc.

        utiliser jwt avec cette lib https://github.com/panva/jose/blob/main/docs/classes/jwt_sign.SignJWT.md#readme
        regexp pour email : https://dba.stackexchange.com/questions/68266/what-is-the-best-way-to-store-an-email-address-in-postgresql

-   step 2 : architecturer tout le truc, lister les écrans et endpoints et de quoi j'ai besoin DONE
    -   ecran de signup
        -   form avec email/password
        -   error messages :
            invalid (or alreadyregistered) email or password (tout ça c'est un seul message)
            other error
        -   si success, login et redirection 302 vers la HP
    -   ecran de signin
        -   form avec email/password
        -   error messages :
            wrong email or password
            other error
        -   si success, login et rediriger vers la HP
    -   dans la page [year], check la session et renvoyer des données différentes si besoin
    <!-- - step 3 : il faut brancher un truc de mails, sengrid etc. NON PAS BESOIN DE MAIL -->
-   step 4 : écrire la table SQL -- DONE
-   step 5 : écrire toutes les fonctionnalités, en mode pure fonctions ---- DONE
-   step 6 : écrire tous les components, avec les formulaires et gestion d'erreurs etc.
-   step 6.5 : supprimer tout firebase, même supprimer l'app dans la console web Firebase --- DONE
-   step 7 : brancher tout et tester
-   step 8 : ajuster la TopBar (afficher utilisteur, bouton logout). Avec infos de session venant du backend ! pas besoin de lire le cookie.
-   step 9 : le signup doit poser le JWT
-   step 10 : le form de signin/signup doit rediriger vers la home si successful
-   step 11 : recheck les params du cookie (quand je fais set-cookie).Essayer de le mettre en http only
-   step 12 : pourquoi le cookie n'est pas passé quand je hit sur la home ? Et arrêter de se baser sur le authorization header, ça c'est pour du xhr
-   Brancher le front en mode non-authenticated
-   Puis faire l'auth avec iron session (essayer)
-   Puis faire une passe sur les endpoints, il y en a qui seront devenus inutiles
-   Puis repasser sur les controller pour cleaner un peu, mutualiser des petits trucs
