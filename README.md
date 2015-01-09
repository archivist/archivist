archivist
=========

# Install

Put .env file with credentials

```
MONGO_URL=***
RS_NAME=***
```

Install Heroku Toolbelt. Then run

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
