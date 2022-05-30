# Usage


    # en local
    yarn dev


## Various useful commands for local postgres

    brew info postgres

    brew services restart postgresql

    sudo -u eletallieur psql postgres

        # pour lister les dbs
        \l
        
        # pour se connecter à la DB tv_shows_calendar
        \c tv_shows_calendar

        # pour lister les tables
        \d

    tail -f /usr/local/var/log/postgres.log