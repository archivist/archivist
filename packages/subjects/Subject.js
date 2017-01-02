import { DocumentNode } from 'substance'

/*
  Subject node.
  Holds Subject entity.

  Attributes
    - name Subject name
    - workname Working name of subject
    - parent Id of parent subject
    - position Position of subject within it's branch
    - description Subject description
*/
class Subject extends DocumentNode {}

Subject.type = 'subject'

Subject.define({
  name: { type: 'string', default: '' },
  workname: { type: 'string', default: '' },
  parent: { type: 'id', optional: true },
  position: { type: 'number', default: 0 },
  description: { type: 'string', default: '' },
  count: { type: 'number', default: 0 },
  active: { type: 'boolean', default: false },
  expanded: { type: 'boolean', default: false }
})

export default Subject
