import Interview from './Interview'
import MetaNode from './MetaNode'
import InterviewSeed from './InterviewSeed'

import { ParagraphPackage, HeadingPackage, BlockquotePackage, LinkPackage, EmphasisPackage, StrongPackage} from 'substance'
import CommentPackage from '../comment/package'
import MarkPackage from '../mark/package'
import SubjectPackage from '../subject/package'
import PersonPackage from '../person/package'
import DefinitionPackage from '../definition/package'

export default {
  name: 'archivist-interview',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-interview',
      ArticleClass: Interview,
      defaultTextType: 'paragraph'
    })
    config.addNode(MetaNode)
    config.addSeed(InterviewSeed)

    // Import Substance Core packages
    config.import(ParagraphPackage)
    config.import(HeadingPackage)
    config.import(BlockquotePackage)
    config.import(EmphasisPackage)
    config.import(StrongPackage)
    config.import(LinkPackage)

    // Import archivist specific packages
    config.import(CommentPackage)
    config.import(MarkPackage)
    config.import(SubjectPackage)
    config.import(PersonPackage)
    config.import(DefinitionPackage)
  }
}