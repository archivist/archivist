import { Fragmenter, PropertyAnnotation } from 'substance'

class PersonReference extends PropertyAnnotation {}

PersonReference.define({
  type: "person",
  reference: { type: 'string', optional: true }
})

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
PersonReference.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default PersonReference