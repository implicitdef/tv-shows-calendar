-   prettier : augmenter l'espacement à 4
-   annuler firebase et remplacer par de l'auth fait maison :

    -   step 1 : regarder comment faire email/password proprement en 2022, JWT, etc. comment envoyer les emails, etc.
        https://www.authgear.com/post/web-application-authentication-best-practices
        https://www.authgear.com/post/authentication-security-password-reset-best-practices-and-more

        save the salt with the hash
        pbkdf2 !
        https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback

        https://security.stackexchange.com/questions/17994/with-pbkdf2-what-is-an-optimal-hash-size-in-bytes-what-about-the-size-of-the-s

        iron-session

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
-   step 5 : écrire toutes les fonctionnalités, en mode pure fonctions
-   step 6 : écrire tous les components, avec les formulaires et gestion d'erreurs etc.
-   step 6.5 : supprimer tout firebase, même supprimer l'app dans la console web Firebase
-   step 7 : brancher tout et tester

-   Brancher le front en mode non-authenticated
-   Puis faire l'auth avec iron session (essayer)
-   Puis faire une passe sur les endpoints, il y en a qui seront devenus inutiles
-   Puis repasser sur les controller pour cleaner un peu, mutualiser des petits trucs
