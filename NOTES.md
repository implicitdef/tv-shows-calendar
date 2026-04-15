# 2026-04 notes after deletion from Heroku

I was stilled billed 7$ a month for this app on Heroku, so I deleted it completely from Heroku. I've also removed my credit card from Heroku so they can't bill me anything.
It was a basic web dyno and no add-ons, so I don't know how it worked without the database. Maybe I was using the postgresql on digital ocean.

# 2025-12 THIS PROJECT NEEDS A NEXT.JS UPDATE (SECURITY REASONS)

Around that time there was a big next.js vulnerability found, here's some text about it :

```
 If you are using Next.js, every version between Next.js 15 and 16 is affected, and we recommend immediately updating to the latest Next.js versions containing the appropriate fixes (15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, 16.0.7).
```

DO NOT REDEPLOY THIS PROJECT WITHOUT UPGRADING (which might be a lot of work)

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

# TODOs / bugs

I've seen a weird bug with the search, I was typing and the results kept popping and changing unexpectedly. Like I was querying on each letter and the results were coming in random order.

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
