import { Fragmenter, PropertyAnnotation } from 'substance'

class PrisonReference extends PropertyAnnotation {}

PrisonReference.define({
  type: "prison",
  reference: { type: 'string', optional: true }
})

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
PrisonReference.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default PrisonReference