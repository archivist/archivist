import { Fragmenter, PropertyAnnotation} from 'substance'

class DefinitionReference extends PropertyAnnotation {}

DefinitionReference.define({
  type: "definition",
  reference: { type: 'string', optional: true }
})

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
DefinitionReference.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default DefinitionReference