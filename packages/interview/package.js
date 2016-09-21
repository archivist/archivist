import Interview from './Interview'
import MetaNode from './MetaNode'
import InterviewSeed from './InterviewSeed'

import { ParagraphPackage, HeadingPackage, BlockquotePackage, ListPackage, LinkPackage, EmphasisPackage, StrongPackage} from 'substance'
import CommentPackage from '../comment/package'
import MarkPackage from '../mark/package'

export default {
  name: 'archivist-interview',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-interview',
      ArticleClass: Interview,
      defaultTextType: 'paragraph'
    });
    config.addNode(MetaNode)
    config.addSeed(InterviewSeed)

    // Import Substance Core packages
    config.import(ParagraphPackage)
    config.import(HeadingPackage)
    config.import(BlockquotePackage)
    config.import(ListPackage)
    config.import(EmphasisPackage)
    config.import(StrongPackage)
    config.import(LinkPackage)

    // Import note specific packages
    config.import(CommentPackage)
    config.import(MarkPackage)
  }
}