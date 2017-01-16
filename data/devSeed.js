'use strict';

var JSONConverter = require('substance').JSONConverter;
var documentHelpers = require('substance').documentHelpers;
var Configurator = require('../packages/common/ServerConfigurator');
var InterviewPackage = require('../dist/archivist/archivist.cjs').InterviewPackage;

var configurator = new Configurator().import(InterviewPackage);
var converter = new JSONConverter();
var changes = {}
for (var i = 1; i < 7; i++) {
  var article = configurator.createArticle();
  var doc = converter.importDocument(article, require('./snapshots/doc' + i));
  changes['change' + i] = documentHelpers.getChangeFromDocument(doc);
}

// App seed
var devSeed = {
  users: {
    'testuser': {
      userId: 'testuser',
      name: 'Test User',
      loginKey: '1234',
      email: 'test@example.com',
      password: '$2a$10$jMNvFQrz7iRDRv3dczKBJOvnZkQWFNJ0r1YsjE/FgqkIw/zv7DbMW',
      access: true,
      super: true
    },
    'testuser2': {
      userId: 'testuser2',
      name: 'Test User 2',
      loginKey: '12345',
      email: 'test2@example.com',
      password: '$2a$10$jMNvFQrz7iRDRv3dczKBJOvnZkQWFNJ0r1YsjE/FgqkIw/zv7DbMW',
      access: true,
      super: false
    },
    'testuser3': {
      userId: 'testuser3',
      name: '',
      loginKey: '123456',
      email: 'test3@example.com',
      password: '$2a$10$jMNvFQrz7iRDRv3dczKBJOvnZkQWFNJ0r1YsjE/FgqkIw/zv7DbMW',
      access: false,
      super: false
    }
  },
  sessions: {
  },
  documents: {
    'interview-1': {
      "documentId": "interview-1",
      "schemaName": "archivist-interview",
      "schemaVersion": "1.0.0",
      "info": {
        "title": "Бобровская Вера Ивановна",
        "userId": "testuser",
        "updatedAt": "2016-09-14T15:57:41.299Z"
      },
      "version": 1,
      "title": "Бобровская Вера Ивановна",
      "meta": {
        "summary": "Остарбайтер, узница концентрационных лагерей. Угнана в Польшу с Украины в 1943 году. Работала на военном заводе в г. Освенциме. Находилась в концлагерях Аушвиц (Освенцим) и Маутхаузен.",
        "state": "finished",
        "published": true,
        "collection": "Выжившие в Маутхаузене"
      },
      "annotations": null,
      "updatedAt": "2016-09-14T15:57:41.299Z",
      "updatedBy": "testuser",
      "userId": "testuser"
    },
    'interview-2': {
      "documentId": "interview-2",
      "schemaName": "archivist-interview",
      "schemaVersion": "1.0.0",
      "info": {
        "title": "Егоренков Пётр Михайлович",
        "userId": "testuser",
        "updatedAt": "2016-09-14T15:57:41.299Z",
        "updatedBy": "testuser2"
      },
      "meta": {
        "summary": "Остарбайтер. Родился 22 февраля 1921 года в с. Младенск Жиздринского р-на Калужской обл. В середине 1930-х уехал из голодной деревни в Москву, бродяжничал. В 1940 году призван в армию, в 1941 попал в плен под Орлом. Находился в лагере для военнопленных в г. Брук (Австрия), в тюрьме г. Грац (Австрия) и других тюрьмах. В 1942—1945 гг. — узник Маутхаузена.",
        "state": "verified",
        "published": false,
        "collection": "Выжившие в Маутхаузене"
      },
      "version": 1,
      "title": "Егоренков Пётр Михайлович",
      "annotations": null,
      "updatedAt": "2016-09-14T15:57:41.299Z",
      "updatedBy": "testuser2",
      "userId": "testuser"
    },
    'interview-3': {
      "documentId": "interview-3",
      "schemaName": "archivist-interview",
      "schemaVersion": "1.0.0",
      "info": {
        "title": "Кравченко Сергей Игнатьевич",
        "userId": "testuser",
        "updatedAt": "2016-09-14T15:57:41.299Z"
      },
      "meta": {
        "summary": "Остарбайтер. Родился 25 сентября 1923 г. в Черкасской области на Украине. Угнан в Австрию в июле-августе 1942 г. Попал в рабочий лагерь в Лимберге, где работал в каменоломне. Весной 1944 г. вместе с другом бежал. Недалеко от Вены был пойман и отправлен в штрафлагерь Ланцендорф. В конце лета 1944 г. возвращён в Лимберг, где и работал до освобождения. Осенью 1945 г. в составе кавалерийского полка сопровождал партию лошадей в Советский Союз. После возвращения в СССР работал электролизником на алюминиевом заводе в г.Сталинск (нынешний Новокузнецк), а потом в г.Волгограде.",
        "state": "finished",
        "published": true,
        "collection": "Выжившие в Маутхаузене"
      },
      "version": 1,
      "title": "Кравченко Сергей Игнатьевич",
      "annotations": null,
      "updatedAt": "2016-09-14T15:57:41.299Z",
      "updatedBy": "testuser",
      "userId": "testuser"
    },
    'interview-4': {
      "documentId": "interview-4",
      "schemaName": "archivist-interview",
      "schemaVersion": "1.0.0",
      "info": {
        "title": "Панченко Фёдор Савельевич",
        "userId": "testuser2",
        "updatedAt": "2016-09-14T15:57:41.299Z",
        "updatedBy": "testuser2"
      },
      "version": 1,
      "title": "Панченко Фёдор Савельевич",
      "meta": {
        "summary": "Военнопленный, остарбайтер, узник концлагерей. Родился в 1923 году в Харьковской области. В 1941 году был взят в плен под Миргородом, бежал. В 1942 году был угнан в Германию, работал на металлургическом комбинате, бежал. Был схвачен железнодорожной полицией, возвращён в рабочий лагерь и снова бежал. В 1944 году был арестован гестапо и отправлен сначала в Освенцим, затем в Маутхаузен и Линц III, где находился до освобождения американскими войсками. Осенью 1945 года, после госпиталя, вернулся домой. Долго не мог устроиться на работу. Впоследствии работал на Харьковском тракторном заводе. На момент интервью жил с супругой в Харькове.",
        "state": "transcripted",
        "published": false,
        "collection": "Выжившие в Маутхаузене"
      },
      "annotations": null,
      "updatedAt": "2016-09-14T15:57:41.299Z",
      "updatedBy": "testuser2",
      "userId": "testuser2"
    },
    'interview-5': {
      "documentId": "interview-5",
      "schemaName": "archivist-interview",
      "schemaVersion": "1.0.0",
      "info": {
        "title": "Веселовская Татьяна Игнатьевна",
        "userId": "testuser2",
        "updatedAt": "2016-09-14T15:57:41.299Z"
      },
      "version": 1,
      "title": "Веселовская Татьяна Игнатьевна",
      "meta": {
        "summary": "остабрайтер. Род. в 1928, предположительно в г. Москве. Позднее оказалась в детском доме пгт. Новотроицкого (Украина). Вместе с младшей сестрой была направлена в детдом г. Геническа (Украина), оттуда в 1941/1942 уехала в Германию. Работала на различных производствах и в частной сфере в г. Дюссельдорф. В 1945 г. вернулась в СССР.",
        "state": "finished",
        "published": true,
        "collection": "Коллекция №1"
      },
      "annotations": null,
      "updatedAt": "2016-09-14T15:57:41.299Z",
      "updatedBy": "testuser2",
      "userId": "testuser2"
    },
    'interview-6': {
      "documentId": "interview-6",
      "schemaName": "archivist-interview",
      "schemaVersion": "1.0.0",
      "info": {
        "title": "Толкачёва (урожд. Тесличенко) Таиса Васильевна",
        "userId": "testuser2",
        "updatedAt": "2016-09-14T15:57:41.299Z"
      },
      "version": 1,
      "title": "Толкачёва (урожд. Тесличенко) Таиса Васильевна",
      "meta": {
        "summary": "Остарбайтер. Родилась в 1924 г. в Геническе. В 1942 г. была угнана в Германию. Работала при военном заводе «Братьев Тилль» (г. Зеебах) всё время пребывания в Германии. По возвращении в СССР не испытывала никаких трудностей из-за своего прошлого.",
        "state": "finished",
        "published": true,
        "collection": "Internationales Sklaven-und Zwangsarbeiter Befragungsprojekt"
      },
      "annotations": null,
      "updatedAt": "2016-09-14T15:57:41.299Z",
      "updatedBy": "testuser2",
      "userId": "testuser2"
    }
  },
  changes: {
    'interview-1': [changes.change1],
    'interview-2': [changes.change2],
    'interview-3': [changes.change3],
    'interview-4': [changes.change4],
    'interview-5': [changes.change5],
    'interview-6': [changes.change6]
  },
  entities: {
    'entity-1': {
      'entityId': 'entity-1',
      'name': 'Жуков Георгий Константинович',
      'synonyms': [],
      'description':'<p id="p_b41ad8a6f269186cf022d1f2553ea51b">(1896–1974), советский военачальник, маршал Советского Союза. С июня 1945 г. – главнокомандующий Группы советских оккупационных войск в Германии (ГСОВГ), глава Советской военной администрации в Германии (СВАГ), в июле 1945 г. – член союзнического Контрольного совета по управлению Германией.</p>',
      'created': new Date(),
      'edited': new Date(),
      'updatedBy': 'testuser2',
      'userId': 'testuser2',
      'entityType': 'person',
      'data': {
        'name': 'Жуков Георгий Константинович',
        'description':'<p id="p_b41ad8a6f269186cf022d1f2553ea51b">(1896–1974), советский военачальник, маршал Советского Союза. С июня 1945 г. – главнокомандующий Группы советских оккупационных войск в Германии (ГСОВГ), глава Советской военной администрации в Германии (СВАГ), в июле 1945 г. – член союзнического Контрольного совета по управлению Германией.</p>',
        'global': true
      }
    },
    'entity-2': {
      'entityId': 'entity-2',
      'name': 'Молотов Вячеслав Михайлович',
      'synonyms': [],
      'description':'<p id="p_6b8a1568c841c7ee311317bb2c717b44">(1890-1986), советский политический и государственный деятель, председатель Совета Народных Комиссаров СССР (1930-1941), нарком иностранных дел СССР (1939-1946), заместитель председателя Государственного Комитета Обороны (1941-1945). </p>',
      'created': new Date(),
      'edited': new Date(),
      'updatedBy': 'testuser',
      'userId': 'testuser',
      'entityType': 'person',
      'data': {
        'name': 'Жуков Георгий Константинович',
        'description':'<p id="p_6b8a1568c841c7ee311317bb2c717b44">(1890-1986), советский политический и государственный деятель, председатель Совета Народных Комиссаров СССР (1930-1941), нарком иностранных дел СССР (1939-1946), заместитель председателя Государственного Комитета Обороны (1941-1945). </p>',
        'global': true
      }
    },
    'entity-3': {
      'entityId': 'entity-3',
      'name': 'Сталинградская битва',
      'description':'<p id="p_f2b9909d2a91d920d1a725762ef468da">(17 июля 1942 г. — 2 февраля 1943 г.), боевые действия советских войск по обороне г. Сталинграда и разгрому крупной стратегической немецкой группировки в междуречье Дона и Волги в ходе Великой Отечественной войны.</p>',
      'synonyms': ['Сталинградская битва', 'Сталинград', 'После провала под Сталинградом', 'бои', 'битва под Сталинградом'],
      'created': new Date(),
      'edited': new Date(),
      'updatedBy': 'testuser',
      'userId': 'testuser',
      'entityType': 'definition',
      'data': {
        'title': 'Сталинградская битва',
        'synonyms': ['Сталинградская битва', 'Сталинград', 'После провала под Сталинградом', 'бои', 'битва под Сталинградом'],
        'definitionType': 'общий комментарий',
        'description': '<p id="p_f2b9909d2a91d920d1a725762ef468da">(17 июля 1942 г. — 2 февраля 1943 г.), боевые действия советских войск по обороне г. Сталинграда и разгрому крупной стратегической немецкой группировки в междуречье Дона и Волги в ходе Великой Отечественной войны.</p>'
      }
    },
    'entity-4': {
      'entityId': 'entity-4',
      'name': 'Голодомор',
      'description':'<p id="p_79dba2d75e567364085cfc36cc31da28">название массового голода на Украине в 1932-1933-х гг.</p>',
      'synonyms': ['Голодомор'],
      'created': new Date(),
      'edited': new Date(),
      'updatedBy': 'testuser2',
      'userId': 'testuser2',
      'entityType': 'definition',
      'data': {
        'title': 'Голодомор',
        'synonyms': ['Голодомор'],
        'definitionType': 'общий комментарий',
        'description': '<p id="p_79dba2d75e567364085cfc36cc31da28">название массового голода на Украине в 1932-1933-х гг.</p>'
      }
    }
  }
};

module.exports = devSeed;