var Substance = require('substance');

var DocumentNode = Substance.Document.Node.extend({
  name: "document",
  properties: {
    // General stuff
    "guid": "string",
    "creator": "string",
    "title": "string",
    "abstract": "string",
    "abstract_en": "string",
    "created_at": "string",
    "updated_at": "string",
    "published_on": "string",

    // Project related
    "project_name": "string",
    "project_location": "string", // points to an entity id
    "conductor": "string",
    "operator": "string",
    "sound_operator": "string",
    "record_type": "string", // "video" or "audio"
    "media_id": "string",
    "interview_location": "string",
    "interview_date": "string",
    "persons_present": "string",
    "interview_duration": "number",

    // Subject related
    "interviewee_bio": "string",
    "interviewee_category": "string",
    "interviewee_forced_labor_type": "string",
    "interviewee_prisons": ["array", "string"],
    "interviewee_waypoints": ["array", "waypoint"],

    // Workflow
    "transcripted": "boolean",
    "verified": "boolean",
    "finished": "boolean"
  },

  getWaypoints: function() {
    return this.interviewee_waypoints.map(function(waypointId) {
      return this.getDocument().get(waypointId);
    }.bind(this));
  }
});

module.exports = DocumentNode;