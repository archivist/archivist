import { Fragmenter, PropertyAnnotation } from 'substance'

class ToponymReference extends PropertyAnnotation {}

ToponymReference.define({
  type: "toponym",
  reference: { type: 'string', optional: true }
})

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
ToponymReference.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default ToponymReference