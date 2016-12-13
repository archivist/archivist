import { ContainerAnnotation } from 'substance'

/**
  Subject Node.
  Used for highlighting subject references inside documents.
*/

class Subject extends ContainerAnnotation {}

Subject.define({
  "type": 'subject',
  "reference": {type: ["string"], default: []}
})

export default Subject
