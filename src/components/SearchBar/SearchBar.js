import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
    };

    this.sortByOptions = {
      "Mejor coincidencia": "best_match",
      "Mejor evaluado": "rating",
      "Mas reseñas": "review_count",
    };
    this.getSortByClass = this.getSortByClass.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? "active" : "";
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption });
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleSearch(e) {
    const { term, location, sortBy } = this.state;
    this.props.searchYelp(term, location, sortBy);
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
          key={sortByOptionValue}
        >
          {sortByOption}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Restaurantes" />
          <input onChange={this.handleLocationChange} placeholder="¿Donde?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Buscar</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
