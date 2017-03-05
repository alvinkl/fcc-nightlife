import React, { Component, PropTypes } from 'react';

const style = {
  color: { "backgroundColor": "lightblue" }
}

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.auth = this.props.auth

    this.state = { reserved: false, isLoggedIn: this.auth.loggedIn() }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.isLoggedIn) this.setState({ reserved: !this.state.reserved });
    else this.auth.login();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-10">
          <div className="card card-outline-primary mb-3 text-center" style={ this.state.reserved ? style.color : {} }>
            <a href={ this.props.url }>
              <div className="card-block">
                <div className="row">
                  <div className="col-xs-4">
                    <img src={ this.props.image } alt=""/>
                  </div>
                  <div className="col-xs-8">
                    <blockquote className="card-blockquote">
                      <p>"{ this.props.text }"</p>
                      <footer>{ this.props.name }</footer>
                    </blockquote>
                    </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-xs-2">
          <button className={ `btn ${this.state.reserved? "btn-danger" : "btn-success"}` } onClick={ this.handleClick }>{ this.state.reserved ? "reserved" : "reserve" }</button>
        </div>

      </div>
    );
  }
} 

SearchResult.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.object
};

export default SearchResult;