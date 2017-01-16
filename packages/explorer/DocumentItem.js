import { Component, Grid } from 'substance'
import moment from 'moment'

class DocumentItem extends Component {

  render($$) {
    let item = this.props.item
    let meta = item.meta
    let index = this.props.index
    let config = this.context.config
    //let documentIcon = $$(Icon, {icon: 'fa-file-text-o'})
    
    let urlHelper = this.context.urlHelper
    let url = urlHelper.openDocument(item.documentId)
    let title = $$('a')
      .addClass('se-document-title')
      .attr({href: url, target: '_blank'})
      .append(item.title)

    // Photo badge
    let photo = config.mediaServer + '/photos/' + meta.interviewee_photo
    let photoEl = $$('div').addClass('se-document-photo')
    if(meta.interviewee_photo) {
      photoEl.css({'background-image': 'url(' + photo + ')'})
    }

    let el = $$('div').addClass('sc-document-item se-row').append(
      $$(Grid.Cell, {columns: 2}).addClass('se-photo').append(photoEl),
      $$(Grid.Cell, {columns: 10}).addClass('se-metadata').append(
        this.renderMetaInfo($$),
        title,
        meta.short_summary
      )
    ).on('click', this._loadFragments.bind(this, item.documentId, index))

    if(this.props.active && item.fragments) {
      el.addClass('sm-expanded')
      item.fragments.forEach(fragment => {
        let fragmentIcon = this.renderIcon($$, 'fragment-badge')
        el.append(
          $$(Grid.Row).addClass('se-document-fragment').append(
            $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(fragmentIcon),
            $$(Grid.Cell, {columns: 11}).addClass('se-fragment').append($$('p').setInnerHTML(fragment.content))
          )
        )
      })
    }

    return el;
  }

  renderMetaInfo($$) {
    let item = this.props.item
    let meta = item.meta
    let el = $$('div').addClass('se-meta-info')

    if(meta.project_name) {
      el.append($$('div').addClass('se-project-name').append(meta.project_name))
    }

    if(meta.interview_duration) {
      el.append($$('div').addClass('se-record-duration').append(meta.interview_duration + ' ' + this.getLabel('min-duration')))
    }

    if(meta.interview_date) {
      el.append($$('div').addClass('se-record-date').append(moment(meta.interview_date).format('DD.MM.YYYY')))
    }

    if(meta.record_type) {
      el.append($$('div').addClass('se-record-type').append(this.renderIcon($$, meta.record_type)))
    }

    if(item.count) {
      el.append($$('div').addClass('se-fragments-count').append(item.count + ' ' + this.getLabel('fragment-count')))
    }

    return el
  }

  renderIcon($$, icon) {
    let iconEl = this.context.iconProvider.renderIcon($$, icon)
    return iconEl
  }

  _loadFragments(documentId, index) {
    this.send('loadFragments', documentId, index)
  }
}

export default DocumentItem
