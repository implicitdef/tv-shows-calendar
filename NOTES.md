# How it works

This repo is the front end (Next.js), backed by SQL database storing the data/

I don't remember how much of it is rendered server side or client side, I hesitated between several versions.

It seems most of it is rendered server side (we receive the HTML with the series and everything from the server)
But if you add a tv show, we fetch in XHR the series, and the DOM seems updated client side.
So it's kind of a mix.

# Feeding the data

The data is fetched and pushed by the "feed" https://github.com/implicitdef/tv-shows-calendar-feed. The feed has to be launched locally, manually, from time to time, when the data gets too stale.

This server exposes an endpoint to POST the latest data (full JSON dump of the latest data). The feed POSTs to this endpoint.

The data, when received, is stored as a new line in a table. Old data is kept just in case.

# Deployment

It's on heroku.
It seems you just have to push to master, Heroku should listen to it.

You can also use the Heroku CLI to manually push, see logs, etc.

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
