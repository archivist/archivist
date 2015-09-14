archivist
=========

![archivist](https://cloud.githubusercontent.com/assets/182010/8759794/9cf7d832-2d06-11e5-8653-344672eccc91.jpg)

# Install

Put .env file with credentials

```
ARCHIVIST_HOST=url of your archive
AUTH_SECRET=Secret Key to sign JWT tokens 
ES_HOST=Elastic Search instance url
GOOGLE_CALLBACK=url of Google OAuth callback
GOOGLE_ID=Client ID of your Web application
GOOGLE_SECRET=Client secret of your Web application
INDEX=turn on indexing (true or false)
MAPBOX_MAPID=id of your mapbox map
MAPBOX_TOKEN=mapbox token
MEDIA_HOST=url of your media storage
MONGO_URL=mongodb URI
RS_NAME=replica-set name
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

Repository logo based on [work](https://thenounproject.com/term/documents/54889/) done by [James Cook](https://thenounproject.com/mojocakes/) from the [Noun Project](https://thenounproject.com) which licensed under [CC BY 3.0 US](http://creativecommons.org/licenses/by/3.0/us/).