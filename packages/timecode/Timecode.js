import { Fragmenter, PropertyAnnotation } from 'substance'

class Timecode extends PropertyAnnotation {}

Timecode.type = "timecode"

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
Timecode.fragmentation = Fragmenter.ANY

export default Timecode
