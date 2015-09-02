module.exports = {
  'index': 'entities',
  'body': {
    "settings": {
      "analysis": {
        "filter": {
          "stopwords_ru": {
            "type": "stop",
            "stopwords": ["а","без","более","бы","был","была","были","было","быть","в","вам","вас","весь","во","вот", "все", "всего", "всех", "вы", "где", "да", "даже", "для", "до", "его", "ее", "если", "есть", "еще", "же", "за", "здесь", "и", "из", "или", "им", "их", "к", "как", "ко", "когда", "кто", "ли", "либо", "мне", "может", "мы", "на", "надо", "наш", "не", "него", "нее", "нет", "ни", "них", "но", "ну", "о", "об", "однако", "он", "она", "они", "оно", "от", "очень", "по", "под", "при", "с", "со", "так", "также", "такой", "там", "те", "тем", "то", "того", "тоже", "той", "только", "том", "ты", "у", "уже", "хотя", "чего", "чей", "чем", "что", "чтобы", "чье", "чья", "эта", "эти", "это", "я"],
            "ignore_case": "true"
          },
          "custom_word_delimiter": {
            "type": "word_delimiter",
            "generate_word_parts": "true",
            "generate_number_parts": "true",
            "catenate_words": "true",
            "catenate_numbers": "false",
            "catenate_all": "true",
            "split_on_case_change": "true",
            "preserve_original": "true",
            "split_on_numerics": "false"
          },
          "russian_stop": {
            "type":       "stop",
            "stopwords":  "_russian_"
          },
          "russian_stemmer": {
            "type":       "stemmer",
            "language":   "russian"
          },
          'ru_stemming': {
            'type': 'snowball',
            'language': 'Russian'
          }
        },
        "char_filter": {
          "ru": {
            "type": "mapping",
            "mappings": ['Ё=>Е', 'ё=>е']
          }
        },
        "analyzer": {
          "analyzer_ru": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": ["stopwords_ru", "stop", "custom_word_delimiter", "lowercase", "russian_morphology", "english_morphology"],
            "char_filter": ["ru", "html_strip"]
          },
          "analyzer_en": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": ["stop", "custom_word_delimiter", "lowercase", "english_morphology"],
            "char_filter": ["html_strip"]
          },
          "searcher_ru": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": ["stopwords_ru", "stop", "custom_word_delimiter", "lowercase", "russian_morphology", "english_morphology"],
            "char_filter": ["ru", "html_strip"]
          },
          "russian": {
            "tokenizer":  "standard",
            "filter": [
              "lowercase",
              "russian_stop",
              "russian_stemmer"
            ]
          }
        }
      }
    },
    "mappings": {
      "entity": {
       "properties": {
          "createdAt": {"type": "date", "index": "not_analyzed"},
          "updatedAt": {"type": "date", "index": "not_analyzed"},
          "country": {"type": "string", "index": "not_analyzed"},
          "nearest_locality": {"type": "string", "index": "not_analyzed"},
          "point": {"type" : "geo_point"},
          "name": { "type": "string", "index": "analyzed", "analyzer": "analyzer_ru" },
          "current_name": {"type": "string", "index": "not_analyzed"},
          "description": { "type": "string", "index" : "analyzed", "analyzer": "analyzer_ru", "search_analyzer": 'snowball', "language": "Russian" },
          "type": {"type": "string", "index": "not_analyzed"},
          "prison_type": {"type": "string", "index" :"not_analyzed"},
          "synonyms": { "type": "string", "index": "analyzed", "analyzer": "analyzer_ru" },
          "entity_type": {"type": "string", "index": "not_analyzed"},
          "definition_type": {"type": "string", "index": "not_analyzed"}
        }
      }
    }
  }
};