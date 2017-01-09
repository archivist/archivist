import {TabbedPane} from 'substance'
import forEach from 'lodash/forEach'

class TabbedContext extends TabbedPane {
  render($$) {
    let el = $$('div').addClass('sc-tabbed-pane')
    let tabsEl = $$('div').addClass('se-tabs')
    forEach(this.props.tabs, function(tab) {
      let tabEl = $$('a')
        .addClass("se-tab")
        .attr({
          href: "#",
          "data-id": tab.id,
        })
        .on('click', this.onTabClicked)
      if (tab.id === this.props.activeTab) {
        tabEl.addClass("sm-active")
      }
      tabEl.append(
        $$('div').addClass('se-tab-label').append(
          this.renderIcon($$, tab.id),
          this.renderLabel($$, tab.name)
        )
      )
      tabsEl.append(tabEl)
    }.bind(this))

    el.append(tabsEl)
    // Active content
    el.append(
      $$('div').addClass('se-tab-content').ref('tabContent').append(
        this.props.children
      )
    )
    return el
  }

  renderIcon($$, icon) {
    let iconEl = this.context.iconProvider.renderIcon($$, icon)
    return iconEl
  }

  renderLabel($$, label) {
    return $$('div').addClass('se-label').append(
      this.getLabel(label)
    )
  }

  getLabel(name) {
    let labelProvider = this.context.labelProvider
    return labelProvider.getLabel(name)
  }
}

export default TabbedContext