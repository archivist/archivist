import { Button, Component, Input } from 'substance'

class SearchBar extends Component {

  render($$) {
    let el = $$('div').addClass('sc-searchbar')

    let inputSearch = $$(Input, {placeholder: this.getLabel('searchbar-placeholder'), value: this.props.value})
      .ref('searchInput')
      .addClass('se-search-input')
      .on('keypress', this._onSearchKeyPress)

    let submitBtn = $$(Button, {style: 'outline', label: 'searchbar-submit', icon: 'searchbar-search'})
      .addClass('se-search-submit')
      .on('click', this._onSearch)

    el.append(
      inputSearch,
      submitBtn
    )

    return el
  }

  _onSearchKeyPress(e) {
    // Perform search query on pressing enter
    if (e.which === 13 || e.keyCode === 13) {
      let searchValue = this.refs['searchInput'].val()
      this.send('search', searchValue)
      return false;
    }
  }

  _onSearch() {
    let searchValue = this.refs['searchInput'].val()
    this.send('search', searchValue)
  }
}

export default SearchBar