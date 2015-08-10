module.exports = {
  'index': 'interviews',
  'body': {
    "settings": {
      "analysis": {
        "filter": {
          "trigrams_filter": {
            "type": "ngram",
            "min_gram": 3,
            "max_gram": 3
          },
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
        },
        "tokenizer": {
          "nGram": {
            "type": "nGram",
            "min_gram": 4,
            "max_gram": 20
          }
        }
      }
    },
    "mappings": {
      "interview": {
       "properties": {
         // interview short summary
         "short_summary": { "type": "string", "index" : "analyzed", "analyzer": "analyzer_ru", "search_analyzer": 'snowball', "language": "Russian" },
         "short_summary_en": { "type": "string", "index" : "analyzed", "analyzer": "analyzer_en", "search_analyzer": 'snowball', "language": "English" },
         // title (interviewee name) for exact full-text search (no partial matches)
         "title": { "type": "string", "index" : "analyzed", "analyzer": "analyzer_ru" },
         // The rest are facets which are used for strict match queries or filtering only
         "published_on": { "type": "string", "index" : "not_analyzed"},
         "subjects": { "type": "string", "index": "not_analyzed" },
         "subjects_count": {
            "type": "nested",
            "properties": {
              "id": { "type": "string", "index": "not_analyzed" },
              "count": { "type": "integer" },
              "one": { "type": "integer" },
            }
          },
          "entities": { "type": "string", "index": "not_analyzed" },
          "entities_count": {
            "type": "nested",
            "properties": {
              "id": { "type": "string", "index": "not_analyzed" },
              "count": { "type": "integer" },
              "one": { "type": "integer" },
            }
          }
       }
      },
      "fragment": {
        "_parent": {"type": "interview"},
        "properties": {
          "id": { "type": "string", "index" : "not_analyzed" },
          "type": { "type": "string", "index" : "not_analyzed" },
          "content": { "type": "string", "index" : "analyzed", "analyzer": "analyzer_ru", "search_analyzer": 'snowball', "language": "Russian",  "term_vector": "with_positions_offsets" },
          "position": { "type": "integer", "index": "not_analyzed" },
          "entities": { "type": "string", "index": "not_analyzed" },
          "subjects": {"type" : "string", "index": "not_analyzed"}
        }
      }
    }
  }
};