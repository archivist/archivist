import { Component, TextProperty, Icon } from 'substance'
import moment from 'moment/src/moment'


class CommentComponent extends Component {

  render($$) {
    let author = this.props.node.author;
    let date = moment(this.props.createdAt).fromNow();
    let authored = '<strong>' + author + '</strong> ' + date;

    return $$('div')
      .addClass('sc-comment')
      .attr("data-id", this.props.node.id)
      .append(
        $$('div')
          .addClass('se-comment-symbol')
          .attr({contenteditable: false}).append(
            $$(Icon, {icon: "fa-comment"})
          ),
        $$('div')
          .addClass('se-authored')
          .attr('contenteditable', false)
          .html(authored),
        $$('div').addClass('se-body').append(
          $$(TextProperty, {
            doc: this.props.node.getDocument(),
            path: [ this.props.node.id, "content"],
          })
        )
      )
  }

  getDate() {
    let date = this.props.node.createdAt
    let result = this.timeSince(new Date(date)) + ' ago'
    return result
  }
}

export default CommentComponent