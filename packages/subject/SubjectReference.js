import { ContainerAnnotation } from 'substance'

/**
  SubjectReference Node.
  Used for highlighting subject references inside documents.
*/

class SubjectReference extends ContainerAnnotation {}

SubjectReference.define({
  "type": 'subject',
  "reference": {type: ["string"], default: []}
})

export default SubjectReference
