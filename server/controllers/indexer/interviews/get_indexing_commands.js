var cheerio = require('cheerio');
var _ = require('underscore');
global.$ = cheerio.load('', {decodeEntities: false});
var getSubjectTree = require('./get_subject_tree');

function _indexMeta(interview, commands, subjectTree) {
  // calculate stats for subjects
  var subjectsCount = {};
  function _updateCounter(id) {
    if (!subjectsCount[id]) {
      subjectsCount[id] = 1;
    } else {
      subjectsCount[id]++;
    }
  }
  function _countSubject(id) {
    var node = subjectTree.get(id);
    while(node) {
      _updateCounter(node.id);
      node = subjectTree.getParent(node.id);
    }
  }
  var subjectRefs = interview.getIndex('type').get('subject_reference');
  _.each(subjectRefs, function(ref) {
    _.each(ref.target, function(id) {
      _countSubject(id);
    });
  });
  var subjects = Object.keys(subjectsCount);
  subjectsCount = _.map(subjectsCount, function(count, id) {
    return {
      id: id,
      count: count,
      one: 1
    };
  });
  // calculate stats for entities
  var entitiesCount = {};
  var entityRefs = interview.getIndex('type').get('entity_reference');
  _.each(entityRefs, function(ref) {
    var id = ref.target;
    entitiesCount[ref.target] = (entitiesCount[id] || 0) + 1;
  });
  var entities = Object.keys(entitiesCount);
  entitiesCount = _.map(entitiesCount, function(count, id) {
    return {
      id: id,
      count: count,
      one: 1
    };
  });

  var documentNode = interview.get('document');
  var command = { "index" : {
    _index: 'interviews',
    _type: 'interview',
    _id: interview.id,
  }};
  var data = {
    "summary": documentNode.short_summary,
    "summary_en": documentNode.short_summary_en,
    "title": documentNode.title,
    "published_on": documentNode.published_on,
    "subjects": subjects,
    "subjects_count": subjectsCount,
    "entities": entities,
    "entities_count": entitiesCount,
  };
  commands.push(command);
  commands.push(data);
}

function indexMeta(interview, commands, cb) {
  getSubjectTree(function(err, subjectTree) {
    if (err) return cb(err);
    _indexMeta(interview, commands, subjectTree);
    cb(null);
  });
}

function indexFragments(interview, commands, cb) {
  var htmlExporter = new interview.constructor.HtmlExporter({
    skipTypes: {
      'timecode': true
    },
    exportAnnotationFragments: true,
    containerId: 'content'
  });
  htmlExporter.initialize(interview);

  var content = interview.get('content');
  var nodeIds = content.nodes;

  nodeIds.forEach(function(nodeId, pos) {
    var node = interview.get(nodeId);
    if (!node) {
      throw new Error("Corrupted interview json. Node does not exist " + nodeId);
    }
    var type = node.type;
    var nodeContent = node.content;
    if (!nodeContent) {
      return;
    }
    var nodeHtml = htmlExporter.convertNode(node).html();

    var entityFacets = [];
    var subjectFacets = [];
    var path = [node.id, 'content'];
    var annotations = interview.getIndex('annotations').get(path);
    _.each(annotations, function(anno) {
      if (anno.type === "entity_reference") {
        var id = anno.target;
        entityFacets.push(id);
      }
    });
    var annotationFragments = interview.containerAnnotationIndex.getFragments(path, 'content');
    _.each(annotationFragments, function(annoFragment) {
      var anno = annoFragment.anno;
      if (anno.type === "subject_reference") {
        _.each(anno.target, function(id) {
          subjectFacets.push(id);
        });
      }
    });
    subjectFacets = _.uniq(subjectFacets);

    var entryId = nodeId;
    var command = { "index" : {
      _index: 'interviews',
      _type: 'fragment',
      _parent: interview.id,
      _id: entryId,
    }};
    var data = {
      id: nodeId,
      type: type,
      content: nodeHtml,
      position: pos,
      subjects: subjectFacets,
      entities: entityFacets
    };
    commands.push(command);
    commands.push(data);
  });

  cb(null);
}

/**
 * @param interview Interview instance
 * @param mode Use 'meta' if you want to update the meta data ('interview' type) only.
 * @return an array of commands that can be used with `client.bulk()`
 */
module.exports = function getIndexingCommands(interview, mode, cb) {
  if (arguments.length === 2) {
    cb = arguments[1];
    mode = "all";
  }
  var commands = [];
  function _finally(err) {
    if (err) return cb(err);
    cb(null, commands);
  }
  if (mode === "meta") {
    indexMeta(interview, commands, _finally);
  } else {
    indexMeta(interview, commands, function(err) {
      if (err) return cb(err);
      indexFragments(interview, commands, _finally);
    });
  }
};
