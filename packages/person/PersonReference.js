import { Annotation, Fragmenter } from 'substance'

class PersonReference extends Annotation {}

PersonReference.define({
  type: "person",
  reference: { type: 'string', default: 'example' }
})

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
PersonReference.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default PersonReference