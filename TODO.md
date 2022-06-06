- annuler firebase et remplacer par de l'auth fait maison :
    - step 1 : regarder comment faire email/password proprement en 2022, JWT, etc. comment envoyer les emails, etc. 
        https://www.authgear.com/post/web-application-authentication-best-practices
        https://www.authgear.com/post/authentication-security-password-reset-best-practices-and-more

        save the salt with the hash
        pbkdf2 !
        https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback

        iron-session

    - step 2 : architecturer tout le truc, lister les écrans et endpoints et de quoi j'ai besoin
        - ecran de signup
            - form avec email/password
            - error messages :
                email already registered (osef si c'est pas secure)
                invalid email or password
                other error
            - si succcess, login et rediriger vers la HP
        - ecran de signin
            - form avec email/password
            - error messages :
                wrong email or password
                other error
            - si success, login et rediriger vers la HP
        - dans la page [year], check la session et renvoyer des données différentes si besoin
    - step 3 : il faut brancher un truc de mails, sengrid etc.
    - step 4 : écrire la table SQL
    - step 5 : écrire toutes les fonctionnalités, en mode pure fonctions
    - step 6 : écrire tous les components, avec les formulaires et gestion d'erreurs etc.
    - step 6.5 : supprimer tout firebase, même supprimer l'app dans la console
    - step 7 : brancher tout et tester
- Brancher le front en mode non-authenticated
- Puis faire l'auth avec iron session (essayer)
- Puis faire une passe sur les endpoints, il y en a qui seront devenus inutiles
- Puis repasser sur les controller pour cleaner un peu, mutualiser des petits trucs

