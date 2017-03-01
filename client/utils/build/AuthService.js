'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _auth0Lock = require('auth0-lock');

var _auth0Lock2 = _interopRequireDefault(_auth0Lock);

var _events = require('events');

var _jwtHelper = require('./jwtHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthService = function (_EventEmitter) {
  _inherits(AuthService, _EventEmitter);

  function AuthService(clientId, domain) {
    _classCallCheck(this, AuthService);

    var _this = _possibleConstructorReturn(this, (AuthService.__proto__ || Object.getPrototypeOf(AuthService)).call(this, clientId, domain));

    _this.lock = new _auth0Lock2.default(clientId, domain, {
      auth: {
        redurectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      },
      allowedConnections: ['twitter']
    });

    _this.lock.on('authenticated', _this._doAuthentication.bind(_this));

    _this.login = _this.login.bind(_this);
    return _this;
  }

  _createClass(AuthService, [{
    key: '_doAuthentication',
    value: function _doAuthentication(authResult) {
      var _this2 = this;

      this.setToken(authResult.idToken);
      this.lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) console.log('Error loading the profile', error);else _this2.setProfile(profile);
      });
    }
  }, {
    key: 'login',
    value: function login() {
      this.lock.show();
    }
  }, {
    key: 'loggedIn',
    value: function loggedIn() {
      var token = this.getToken();
      return !!token && !(0, _jwtHelper.isTokenExpired)(token);
    }
  }, {
    key: 'setToken',
    value: function setToken(idToken) {
      localStorage.setItem('id_token', idToken);
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      return localStorage.getItem('id_token');
    }
  }, {
    key: 'setProfile',
    value: function setProfile(profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
      this.emit('profile_updated', profile);
    }
  }, {
    key: 'getProfile',
    value: function getProfile() {
      var profile = localStorage.getItem('profile');
      return profile ? JSON.parse(localStorage.profile) : {};
    }
  }, {
    key: 'logout',
    value: function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
    }
  }]);

  return AuthService;
}(_events.EventEmitter);

exports.default = AuthService;