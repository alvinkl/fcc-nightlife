import React, { Component } from 'react';
import axios from 'axios';

import Search from './components/Search';


class App extends Component {
  constructor(props) {
    super(props);
    this.url = "http://localhost:3100/api/";
  }

  componentWillMount() {
    this.loadData();
  }

  loadData(){
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1>Plans tonight?</h1>
          <p>See which bars are hoppin' tonight and RSVP ahead of time!</p>
          <br/>
          <p>Remember: take a cab and drink responsibly.</p>
          <Search url={ this.url }/>
        </div>
      </div>
    );
  }
}

export default App;
