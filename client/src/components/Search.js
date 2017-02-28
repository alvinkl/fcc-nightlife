import React, { Component } from 'react';
import axios from 'axios';

import SearchResult from './SearchResult';

class Search extends Component {

  constructor() {
    super();

    this.state = { value: "" };

    this.search = this.search.bind(this);
    this.getData = this.getData.bind(this);
  }

  search(e) {
    e.preventDefault();
    let value = e.target.search.value;
    this.setState({ value: value, data: [] })
    this.getData();
  }

  getData() {
    axios.get(`${this.props.url}location=${this.state.value}`)
      .then(res => {
        console.log(res.data);
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