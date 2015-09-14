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

[User schema](https://github.com/archivist/archivist/blob/master/server/models/user.js#L10) is pretty much oriented to store Google profile. However there is one important thing. Each user have *access* and *super* properties. First one it to grant access for the editing, second one is for granting *super access*. Super user can manage users and perform dangerous operations, e.g. merging and removing subjects and entities. 

## Archivist Components

### Archivist Writer

At the heart of the platform there’s Archivist Writer, a modern web-editor which allows you to annotate your text with basic markup and external data, e.g. you can:

- reference entities inside text 
- mark any piece of text as related to some set of terms from an ontology-tree
- insert timecodes to synchronize text with media source
- leave comments for any piece of text for editors/researches collaboration
- describe the document’s metadata

Some of the interviews from Memorial’s Ost-Arbeiters archive last over 7 hours of time. The resulting documents are typically incredibly large, e.g., more than 10000 paragraphs, having the same amount of annotations and comments attached to it.

Archivist Writer protects every request using Archivists [Auth API]().

You can connect any external data storage for referencing, basicly you just need to expose it as JSON REST API. Archivist as platform use [special set of managers for managing data](). 
Archivist Writer is built on top of [Substance library](https://github.com/substance/substance). It's available as part of [Archivist Core]().

If you want to use it in your project you'll probably need to overwrite [writer components](https://github.com/archivist/archivist-core/tree/master/writer/components) as well as [document schema]().

You can learn how to connect Archivist Writer to your application by discover [source code](https://github.com/archivist/archivist/tree/master/src/writer) of Archivist.

### Archivist Reader

Archivist Reader was developed to present interviews in the best possible way.
It makes possible exploring linked resources without losing the place in the interview. You can jump straight to the media source in that places where editors placed timecodes, so you can read and listen or watch the original record. Again without losing position in the text. All resources (locations, persons, etc.) have links to the [resource browser], so you can see a full description of locations and persons etc. as well as access all interviews where a specific entity was mentioned. You can also see every location on a map using our [map browser]().

Topics panel contains index like computed tree of used in concrete interviews subjects.
You can click on each subject or entity and see where it mentioned inside of the document, e.g. it will hightlight exact fragments of text, scrollbar hightlighting will help you to understand where other fragemnts located.

Archivist Reader designed to play videos from [Vimeo online video platform](https://vimeo.com). It uses [Vimeo JS API library Froogaloop](https://github.com/vimeo/player-api/tree/master/javascript) for easiest video control.
For playing audio files Reader use [jPlayer library](https://github.com/happyworm/jPlayer). You will need to upload audio files to your [media server]() in two formats (mp3, ogg) to cover most of the modern browsers compability.

Archivist Reader shared a lot of code with [Archivist Writer](). It is also built on top of [Substance library](https://github.com/substance/substance) and available as part of [Archivist Core]().

Again, if you want to use it in your project you'll need to overwrite [reader components](https://github.com/archivist/archivist-core/tree/master/reader/components) as well as [document schema]().

You can learn how to connect Archivist Reader to your application by discover [source code](https://github.com/archivist/archivist/tree/master/src/reader) of Archivist.

### Archivist Browser

Archivist Browser is the main entry point for your archive.
Here you can see a list of all documents from your archive, perform full-text search queries and filter using the ontology tree.
Archivist Browser connected to our [indexer API]() which is kind of interface for running [ElasticSearch](https://www.elastic.co/) queries. Read more about indexing part of Archivist [below]().
From the result list you are able to jump right into an interview highlighting the subject or entity you were interested in.

If your query matched name of entity (or synonym) which are mentioned in published documents it will tell you that it founds articles about that entity. Article names are links to [resource browser] pages.

Archivist Browser is based on [Lens Browser](http://lens.elifesciences.org/) from [eLife](http://elifesciences.org/) (thanks to eLife to make it [available as an open source project](https://github.com/elifesciences/lens-browser)). It's also available as part of [Archivist Core]().

You can learn a lot from [Archivist Browser source code](https://github.com/archivist/archivist-core/tree/master/browser) and [indexer API](), but from our expierense Elastic Search configurations is too much related to concreate project.

### Resource Browser

This is additional peace to Archivist Browser, it will print you all details related to concreate entity as well as list of documents where this entity mentioned (with counters). From this list you can jump right into a document highlighting the entity you were interested in.

It's very simple application which is built using [Substance light-weight component implementation](https://github.com/substance/substance/blob/master/ui/component.js) inspired by React and Ember.

Checkout [source code](https://github.com/archivist/archivist/tree/master/src/resources).

### Map Browser

Map Browser is a map interface with two clustered layers which represents all records of toponyms and prisons entities. While hovering each point you’ll see the name of location and how often it’s mentioned in documents of your archive, you can click on the exact point and get the full description as well as all referenced documents complete with links to entry point of that entities inside a document.

Map Browser built on top of [mapbox.js library](https://github.com/mapbox/mapbox.js), e.g. you can use your own tiles with the help of [Mapbox platform](https://www.mapbox.com). 
Map Browser use power of [Leaflet.js](http://leafletjs.com/) and it's [marker clustering plugin](https://github.com/Leaflet/Leaflet.markercluster) to let you browse your document collection from geographical perspective. 

Map Browser also built using [Substance components](https://github.com/substance/substance/blob/master/ui/component.js).

Checkout [source code](https://github.com/archivist/archivist/tree/master/src/map).
 
### Archvist Managers

Protected part of Archivist contains set of data managers. All of them built on top of [Backbone.js library](http://backbonejs.org/).
Let's look at them shortly.

#### Documents dashboard

Here you can see a list of documents. You can open exisitng, remove old one or create new document. You'll see when the document was edited last time as well as who edit exactly did it.
Workflow and title filters will help you to find desired document.
Document's workflow include four statuses: *transcripted*, *verified*, *finshed* and *published*. They are defined inside [document schema]() and can be edited inside [Archivist Writer]() along with other metadata.

#### Subjects manager

Subjects manager represents your ontology as a big hierarchical tree with names and counters (you will see number of fragments for each subject summed up by the tree and number of referenced documents). You can manage subjects right here. E.g. you can
- add new subject
- find subject by name
- edit subjects name/workname/description
- move subjects across tree leafs
- request list of referenced documents
- remove subjects
- merge subjects
Last two operations will activate [maintanance mode]().

Subjects manager use [jstree library](https://github.com/vakata/jstree/) for tree editing and represenation of data.

#### Locations managers

Locations managers (toponyms and prisons) consists of list (similar to documents dashboard but with refernce counting and ability to request a list of referenced documents) and map views.
You can add new locations in modal form. Forms are different for toponyms and prisons. However each of these forms contains maps with reversal geocoding for chosing location. You can also add number of synonyms for each location, later this values will be used as synonyms of location name inside [archivist browser]().
All locations without geo coordinates will be placed in list inside map views, so you can easily fix them.

#### Persons manager

Persons manager is very similar to locations lists. You can also filter persons by global property. We used this property to filter out persons which a local to the document, e.g. we don't have enough information about person and it'll be excluded from search index.

#### Definitions manager

Definitions also inherited list view style with modal forms. For Memorial International Memorial's archive we used four different types of definitions: general comments, prison camp reality, abbreveations, language comments. Last two types are excluded from search index.

#### Entity merging manager

This is manager which allows you to merge two entities. Even different types of entities could be merged. This manager available only for super users cause it will activate [maintanance mode]().

#### User manager

This manager used for granting or restriction access to the protected part of Archivist. You can gave access to editing document/entities/subkects or assign super users.

This manager available only for super users.

# Server APIs



# Archivist Core

Available under MIT license.

# Translations

# Coming soon

- Persons index
- Find and replace
- Bug fixes ;)

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

## Gulp

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
