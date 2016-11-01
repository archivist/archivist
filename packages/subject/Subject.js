import { ContainerAnnotation } from 'substance'

// class Subject extends ContainerAnnotation {}

// Subject.type = 'subject'

// Subject.define({
//   reference: {type: 'string', default: ''}
// })

/**
  Entity Node.
  Used for highlighting entity references inside documents.
*/

class Subject extends ContainerAnnotation {}

Subject.type = 'subject'

Subject.define({
  "reference": {type: "string", default: ""}
})

export default Subject
