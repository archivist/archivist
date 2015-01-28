archivist
=========

# Install

Put .env file with credentials

```
MONGO_URL=***
RS_NAME=***
```

Install Heroku Toolbelt. Then pull in npm and Substance modules

```
$ npm install
$ substance --update
```

Now you can run the server

```
npm run devmode
```
it'll start server app and recompile js bundle when you change source of platform app

For starting server without watch mode use
```
npm run start
```

You could also prepare compress bundle (js&css) without starting server, use
```
npm run prepare
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
