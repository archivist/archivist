<img align="left" src="https://cloud.githubusercontent.com/assets/182010/9854134/e63973c0-5b0f-11e5-9c18-ac9d22d04083.png" />
Archivist is a full-stack publishing solution involving different technologies to power digital archives.
Archivist originally has been developed for the [Memorial International Society](http://memorial.de/index.php?id=18) to publish interviews of Ost-Arbeiters and WWII prisoners. They are published as full transcriptions (in russian) complete with multimedia sources (audio, video). Editors are able to tag and link subjects, locations, persons and definitions in the text, so that the archive can be queried later in interesting ways. Researchers are able to perform a full-text search, but also filter interviews by related subjects and external entities.  
Read more about Archivst in one of project's mantainers [post on Medium](https://medium.com/p/7019f6408ee6)

<p align="center"><img src="https://cloud.githubusercontent.com/assets/182010/9853503/8a7258f2-5b0c-11e5-837b-cfe37b560e9b.png" /></p>

# Technical overview

Archivist is set of tools which all are communicating with Node.js server API, let's describe data models and each components afterwards.

## Document Models

There are several document models involved: interviews, subjects, entities and users.
Interviews contain the transcripted text plus annotations and metadata, subjects are organized as a tree-structured ontology, and entities are just a list or set of units having additional information. Along with creating interview transcriptions, also the other ontologies are refined and extended. E.g., sometimes the editors merge two subjects or entities into one. Such changes need to have an immediate effect on the interviews, too, e.g., subject/entity references inside document need to be updated to reflect this change.

### Interviews

A custom but pretty conventional type of document, where paragraphs are statements of one person, the interviewer or the interviewee (still you can use it as usual paragraphs). The interview is annotated with basic markup, references to subjects, entities, and editor comments.

Interview model also contains [a lot of metadata properties](https://github.com/archivist/archivist-core/blob/master/interview/nodes/document_node.js).
If you will deceide to change it don't forget to change content of [mongodb empty document](https://github.com/archivist/archivist/blob/master/server/models/document.js#L69).

### Subjects

The whole ontology is stored in [one model](https://github.com/archivist/archivist-core/blob/master/interview/subjects_model.js) having a tree-structure, while nodes are stored inside [mongodb collection with extra information](https://github.com/archivist/archivist/blob/master/server/models/subject.js#L17).
Basicly each subject node have these properties:
- name (used to display subject names in public part of archive)
- workname (used to display subject names in closed part of archive, e.g. Archivist Writer)
- description (subject description, currently it's not display anywhere outside of tree manager)
- parent (reference to the parent node inside tree)
- position (position inside tree leaf)

### Entities

There are different types of entities:
- [locations](https://github.com/archivist/archivist/blob/master/server/models/location.js#L14) (toponyms and prisons, they are different, but both contains geo-locational information)
- [persons](https://github.com/archivist/archivist/blob/master/server/models/person.js#L13)
- [definitions](https://github.com/archivist/archivist/blob/master/server/models/definition.js#L13)

All entities are pretty much independent from each other.

### Users

## Archivist Writer

At the heart of the platform there’s Archivist Writer, a modern web-editor which allows you to annotate your text with basic markup and external data, e.g. you can:

- reference entities inside text 
- mark any piece of text as related to some set of terms from an ontology-tree
- insert timecodes to synchronize text with media source
- leave comments for any piece of text for editors/researches collaboration
- describe the document’s metadata

Some of the interviews from Memorial’s Ost-Arbeiters archive last over 7 hours of time. The resulting documents are typically incredibly large, e.g., more than 10000 paragraphs, having the same amount of annotations and comments attached to it. That’s like a small book, isn’t it? And Archivist Writer was powerful enough to handle it. Amazing!


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
