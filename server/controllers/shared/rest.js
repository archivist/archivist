var System = require('../../models/system.js')
  , elasticsearch = require('elasticsearch')
  , ESconfig = require('../indexer/config')
  , entityIndex = require('../indexer/entities/op')
  , util = require('../api/utils.js')
  , async = require('async')
  , _ = require('underscore');

module.exports = function(schema, options) {
  options = options || {};


  /** 
   * Creates record from JSON
   *
   * @param {string} data - JSON represenation of new record
   * @param {string} user - JSON represenation of user record
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.add = function(data, user, cb) {
    var client = new elasticsearch.Client(_.clone(ESconfig));

    var self = this;
    data.edited = user.iss;
    data.created = user.iss;

    new self(data).save(function(err, record) {
      if (err) return cb(err);
      entityIndex.index(client, record, false, function(err){
        cb(err, record);
      });
    })
  }

  /** 
   * Updates record unique JSON
   *
   * @param {string} id - The unique id of target record
   * @param {string} data - JSON with updated properties
   * @param {string} user - JSON represenation of user record
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.change = function(id, data, user, cb) {
    var client = new elasticsearch.Client(_.clone(ESconfig));

    var self = this;

    data.edited = user.iss;
    data.updatedAt = new Date;

    delete data.__v;
    self.findByIdAndUpdate(id, { $set: data }, { upsert: true, new: true }, function (err, record) {
      if (err) return cb(err);
      self.incrementDBVersion(function(err) {
        if (err) return cb(err)
        entityIndex.index(client, record, true, function(err){
          cb(err, record);
        });
      });
    });
  }

  /** 
   * Gets record by unique id 
   *
   * @param {string} id - The unique id of target record
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.getRecord = function(id, cb) {
    this.findById(id, function(err, record) {
      cb(err, record);
    });
  }

  /** 
   * List records
   *
   * @param {string} opt - The query options from request
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.list = function(opt, cb) {
    var self = this,
        query = util.getQuery(opt.query),
        options = util.getOptions(opt);
    
    self.count(query, function(err, counter) {
      if (err) return cb(err);
      self
        .find(query, null, options)
        .populate('edited', 'name')
        .exec(function(err, records) {
          cb(err, [{total_entries: counter}, records]);
        });
    });
  }

  /** 
   * Removes record by unique id 
   *
   * @param {string} id - The unique id of target record
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.delete = function(id, cb) {
    var client = new elasticsearch.Client(_.clone(ESconfig));

    var self = this;
    // Unsave op (needs to be wrapped in a transaction)
    this.propagateChange(id, {mode: "delete"}, function(err) {
      if (err) return cb(err);
      self.findByIdAndRemove(id, function (err) {
        if (err) return cb(err);
        entityIndex.remove(id, function(){
          self.incrementDBVersion(cb);
        })
      });
    });
  };

  /** 
   * Updates references in a document, either removing them or replacing them with a new id
   *
   * @param {string} docId - Substance document as JSON
   * @param {string} id - entity to be updated
   * @param {object} options - mode = delete|replace, replace mode has entityId
   */
   
  schema.statics.updateForDoc = function(docId, id, opt, cb) {
    var Document = require('../../models/document.js');
    Document.getRecord(docId, function(err, doc) {
      if (err) return cb(err);

      console.log("docid;", docId, "referenceId", id, "options", opt);
      var hasChanged = false;
      _.each(doc.nodes, function(node) {

        if (node.type === options.referenceType) {

          if (_.isArray(node.target)) {
            // Skip nodes subject refs that don't have targets
            if (!node.target) return;
            var pos = node.target.indexOf(id);
            if (pos > -1) {
              if (opt.mode === "delete") {
                node.target.splice(pos, 1);
              } else {
                node.target[pos] = opt.newReferenceId;
                node.target = _.uniq(node.target);
              }
              hasChanged = true;
            }
          } else {
            if (id === node.target) {
              hasChanged = true;
              if (opt.mode === "delete") {
                delete doc.nodes[node.id];
              } else {
                node.target = opt.newReferenceId;
              }
            }
          }
        }
      });

      if (hasChanged) {
        var user = {name: 'Archivist'}
        Document.change(docId, doc, user, function(err) {
          cb(err);
        });
      } else {
        console.log(docId, 'did not change... move along');
        cb(null);
      }
    });
  }

  /** 
   * Updates references in a document, either removing them or replacing them with a new id
   *
   * @param {string} data - entity to be updated
   * @param {object} options - mode = delete|replace, replace mode has newId
   */
   
  schema.statics.propagateChange = function(id, opt, cb) {
    var self = this;
    var Document = require('../../models/document.js');
    
    Document.find({}, 'id', {}, function(err, documents) {
      async.each(documents, function(doc, cb) {
        self.updateForDoc(doc._id, id, opt, cb);
      }, function(err) {
        console.log('done with everything yay!');
        cb(err);
      });
    });
  };

  /**
   * Increment entity db version variable
   *
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.incrementDBVersion = function(cb) {
    System.findOneAndUpdate({name: options.systemCounter}, { $inc: {'version': 1 }}, {new: true, upsert: true}, function(err, variable) {
      cb(err, variable);
    });
  };

  /**
   * Get entity db version variable
   *
   * @param {callback} cb - The callback that handles the results 
   */

  schema.statics.getDBVersion = function(cb) {
    System.findOne({name: options.systemCounter}, function(err, variable) {
      if (err) return err;
      cb(err, variable.get('version'));
    });
  };
}