import { PropertyAnnotation, Fragmenter } from 'substance'

class Xref extends PropertyAnnotation {}

Xref.define({
  type: 'xref',
  content: { type: 'string', optional: true }
})

// in presence of overlapping annotations will try to render this as one element
Xref.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

export default Xref
