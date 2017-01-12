import { Button, Component, ScrollPane } from 'substance'

class InfoContext extends Component {
  getInitialState() {
    return {
      'teaserAbstract': true
    }
  }

  render($$) {
    let config = this.context.config
    let doc = this.context.doc
    let metadata = doc.getDocumentMeta()

    let infoPanel = $$(ScrollPane).ref('panelEl')

    let photo = metadata.interviewee_photo
    if(photo) {
      infoPanel.append(
        $$('div').addClass('se-meta-photo').append(
          $$('img').attr({src: config.mediaServer + '/photos/' + photo})
        )
      )
    }

    let abstract = metadata.abstract
    let abstractEl = this.renderAbstract($$, abstract)
    infoPanel.append(abstractEl)

    let bio = metadata.interviewee_bio
    infoPanel.append(
      $$('div').addClass('se-meta-bio').append(
        $$('div').addClass('se-section-title').append(
          this.getLabel('meta-bio-section')
        ),
        $$('div').addClass('se-bio').append(bio)
      )
    )

    let el = $$('div').addClass('sc-context-panel').append(
      infoPanel
    )

    return el
  }

  renderAbstract($$, abstract) {
    let el = $$('div').addClass('se-meta-abstract')
    
    if(this.state.teaserAbstract) {
      let teaser = abstract.split('\n').shift()
      el.append(
        teaser,
        $$(Button, {style: 'outline', label: 'expand-abstract'}).addClass('se-abstract-toggle')
          .on('click', this._toggleAbstract)
      )
    } else {
      el.append(
        $$('div').addClass('se-abstract-full')
          .setInnerHTML('<p>' + abstract.split('\n').join('</p><p>') + '</p>'),
        $$(Button, {style: 'outline', label: 'collapse-abstract'}).addClass('se-abstract-toggle')
          .on('click', this._toggleAbstract)
      )
    }

    return el
  }

  _toggleAbstract() {
    let toogleState = this.state.teaserAbstract
    this.extendState({
      'teaserAbstract': !toogleState
    })
  }
}

export default InfoContext
