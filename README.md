<img align="left" src="https://cloud.githubusercontent.com/assets/182010/9854134/e63973c0-5b0f-11e5-9c18-ac9d22d04083.png" />
Archivist is a full-stack publishing solution involving different technologies to power digital archives.
Archivist originally has been developed for the [Memorial International Society](http://memorial.de/index.php?id=18) to publish interviews of Ost-Arbeiters and WWII prisoners. They are published as full transcriptions (in russian) complete with multimedia sources (audio, video). Editors are able to tag and link subjects, locations, persons and definitions in the text, so that the archive can be queried later in interesting ways. Researchers are able to perform a full-text search, but also filter interviews by related subjects and external entities.  
Read more about Archivst in one of project's mantainers [post on Medium](https://medium.com/p/7019f6408ee6)

<p align="center"><img src="https://cloud.githubusercontent.com/assets/182010/9853503/8a7258f2-5b0c-11e5-837b-cfe37b560e9b.png" /></p>

# Install

Put .env file with credentials

Variable name  | Description
------------- | -------------
ARCHIVIST_HOST  | Url of your archive
AUTH_SECRET  | Secret key to sign [JSON Web Tokens (JWT)](http://jwt.io/)
ES_HOST  | Elastic Search instance url
INDEX  | Turn on indexing (true or false)
GOOGLE_CALLBACK  | One of the redirect_uri values obtained from the [Google Developers Console](https://console.developers.google.com/)
GOOGLE_ID  | The client ID you obtain from the [Google Developers Console](https://console.developers.google.com/)
GOOGLE_SECRET  | The client secret you obtained from the [Google Developers Console](https://console.developers.google.com/)
MEDIA_HOST  | Url of your [media storage]()
MAPBOX_MAPID  | Mapbox [map ID](https://www.mapbox.com/help/define-map-id/)
MAPBOX_TOKEN  | Mapbox [access token](https://www.mapbox.com/help/define-access-token/)
MONGO_URL  | MongoDB [connection URI](http://docs.mongodb.org/manual/reference/connection-string/#standard-connection-string-format)
RS_NAME  | MongoDB [replica set](http://docs.mongodb.org/manual/reference/glossary/#term-replica-set) name (optional)

Like this:
```
ARCHIVIST_HOST=localhost:5000
AUTH_SECRET=yourSescret
ES_HOST=http://localhsot:9200
etc
```

Install Heroku Toolbelt or Foreman. Then pull in npm and Substance modules

```
$ npm install
```

Now you can run the server

```
npm run devmode
```

It'll start server app and recompile js bundle when you change source of platform app

For starting server without watch mode use
```
npm run start
```

You could also prepare compress bundle (js&css) without starting server, use
```
npm run prepare
```

# Development

If you want to make changes in some of the modules you need to check them out with git instead of npm and use npm link. Do this:

```bash
$ mkdir archivist-project
$ cd archivist-project

$ git clone https://github.com/substance/archivist.git
$ git clone https://github.com/substance/archivist-composer.git
$ git clone https://github.com/substance/substance.git
$ cd archivist
$ npm install
```

Now npm link stuff:

```bash
$ cd ..
$ cd ../substance
$ sudo npm link
$ cd archivist-composer
$ sudo npm link
$ npm link substance
$ cd ../archivist
$ npm link archivist-composer
```

To make use of the Substance Sublime helpers, make a [Sublime project](http://github.com/substance/sublime) and add all three folders to it. Then you can press `ctrl+shift+s` to bring up a nice git status dialog.

Rebundling of the composer happens automatically when you do npm install. For manual rebundling do:

```bash
$ gulp bundle-composer
```


# Deploy

```
$ git checkout release
```

```
$ git merge master
```

> There might be conflicts, merge carefully. We will try to achieve a setup where the assets are the only difference.

```
$ substance --bundle
```

Commit all changes.

```
$ git push heroku release:master
```

Try everything out. If something is obviously broken you can fix it and try again.

```
$ git push origin release
```

<p align="center"><img src="https://cloud.githubusercontent.com/assets/182010/8759794/9cf7d832-2d06-11e5-8653-344672eccc91.jpg" /></p>

Repository logo based on [work](https://thenounproject.com/term/documents/54889/) done by [James Cook](https://thenounproject.com/mojocakes/) from the [Noun Project](https://thenounproject.com) which licensed under [CC BY 3.0 US](http://creativecommons.org/licenses/by/3.0/us/).
