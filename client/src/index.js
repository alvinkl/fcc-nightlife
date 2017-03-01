import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthService from '../utils/build/AuthService'


const auth = new AuthService('ixXUVnBXsIMmScQsfOmIGoRUBG5DqIpI', 'alvinkl.au.auth0.com');


ReactDOM.render(
  <App auth={ auth }/>,
  document.getElementById('root')
);
