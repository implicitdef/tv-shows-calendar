### How to work locally

`yarn server:compile-w` in a tab

`yarn server:run-w` in the other

### How to imitate the production behavior locally

`yarn build-and-run-like-prod` rebuilds everything, and run it, with prod settings

(still uses the local server and DB)

### How to view production logs

`heroku logs -a tv-shows-calendar --tail`

### How to deploy to heroku

    # Start by push to Github just to be sure to keep everything in sync
    git push
    # Login dans la CLI de Heroku 
    heroku login
    # Check if you have "heroku" remote configured
    git remote -v
    # If you don't have "heroku" remote, configure it with this command :
    heroku git:remote -a tv-shows-calendar
    # Push to Heroku to do the deploy
    # This will take a few minutes
    git push heroku
    

### How is the deployement wired up ?

- Domain name www.implicitdef.com is on Namecheap
- In Namecheap settings, we're hitting on Cloudflare's DNS
- In Cloudflare's settings, www.implicitdef.com/tv-shows-calendar is redirected to https://tv-shows-calendar.herokuapp.com/
- https://tv-shows-calendar.herokuapp.com/ is a Heroku app, deployed locally from the heroku CLI
- Heroku executes the script 'heroku-postbuild' in package.json (by convention), then 'heroku-run' (because of the Procfile).


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
