import { Annotation, Fragmenter } from 'substance'

class DefinitionReference extends Annotation {}

DefinitionReference.define({
  type: "definition",
  reference: { type: 'string', default: 'example' }
})

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
DefinitionReference.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default DefinitionReference