import React, { Component } from 'react';
import axios from 'axios';

import SearchResult from './SearchResult';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = { value: "", data: [] };

    this.auth = this.props.auth;

    this.search = this.search.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value:  e.target.value})
    this.getData();
  }

  search(e) {
    e.preventDefault();
    this.getData();
  }

  getData() {
    axios.get(`${this.props.url}location=${this.state.value}`)
      .then(res => {
        this.setState({ data: res.data.businesses })
      })
  }

  render() {
    let searchResults = this.state.data ? this.state.data.map(item => {
      return (
        <SearchResult 
          key={ item.id }
          id={ item.id }
          name={ item.name }
          url={ item.url }
          text={ item.snippet_text }
          image={ item.image_url }
          location={ item.location }
          auth= { this.auth }
        />
      )
    }) : '';

    return (
      <div>
        <form action="" onSubmit={ this.search }>
          <div className="form-group row">
            <input 
              className="col-xs-10" 
              type="text"
              name="search"
              onChange={ this.handleChange } />
            <button className="col-xs-2" type="submit">Go</button>
          </div>
        </form>
        <div className="text-center">
          { searchResults }
        </div>
      </div>
    );
  }
}

export default Search;