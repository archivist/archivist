var maintenance = require('./maintenance.js')
  , indexQueue = require('./queue.js');

module.exports = function(schema, options) {
  options = options || {};


/** 
 * Merge Entities
 *
 * @param {string} entityId - Id of entity to merge
 * @param {string} newEntityId - Id of entity to merge into
 * @param {callback} cb - The callback that handles the results 
 */

schema.statics.merge = function(entityId, newEntityId, cb) {
  var self = this;
  
  console.log("Let's merge " + entityId + " into " + newEntityId + "!");

  function updateDocsAndMergeEntities(cb) {
    self.propagateChange(entityId, {mode: "replace", newReferenceId: newEntityId}, function(err) {
      if (err) return cb(err);
      self.findByIdAndRemove(entityId, function (err, entity) {
        if (err) return cb(err)
        self.incrementDBVersion(function(err) {
          if (err) return cb(err)
          indexQueue.add({type: 'entity', op: 'remove', id: entityId});
          cb(err);
        });
      });
    });
  }

  maintenance.beginTransaction(function(err) {
    if (err) return cb(err);

    updateDocsAndMergeEntities(function(err) {
      if (err) {
        maintenance.cancelTransaction(function(terr) {
          if (terr) return cb(terr);
          cb(err);
        });          
      } else {
        maintenance.commitTransaction(cb);
      }
    });
  });
}
}