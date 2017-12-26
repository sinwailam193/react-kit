/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appQuery = exports.authUser = exports.logout = exports.LOG_OUT = exports.AUTH_USER = exports.APP_QUERY = undefined;

var _helpers = __webpack_require__(5);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var APP_QUERY = exports.APP_QUERY = "APP_QUERY";
var AUTH_USER = exports.AUTH_USER = "AUTH_USER";
var LOG_OUT = exports.LOG_OUT = "LOG_OUT";

var logout = exports.logout = function logout(res) {
    if (typeof document !== "undefined") {
        (0, _helpers.deleteCookie)("token");
    } else if (res) {
        res.clearCookie("token");
    }
    return { type: LOG_OUT };
};

var authUser = exports.authUser = function authUser() {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState, _ref2) {
            var api = _ref2.api,
                res = _ref2.res;
            var resp;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return api.get("/auth/user").catch(function (err) {
                                return err;
                            });

                        case 2:
                            resp = _context.sent;

                            if (!(resp instanceof Error)) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt("return", dispatch(logout(res)));

                        case 5:

                            dispatch({
                                type: AUTH_USER,
                                user: resp.data
                            });

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
};

var appQuery = exports.appQuery = function appQuery(query) {
    var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState, _ref4) {
            var api = _ref4.api,
                res = _ref4.res;
            var resp;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return api.post("/graphql", { query: query, variables: variables }).catch(function (err) {
                                return err;
                            });

                        case 2:
                            resp = _context2.sent;

                            if (!(resp instanceof Error)) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt("return", dispatch(logout(res)));

                        case 5:

                            dispatch({
                                type: APP_QUERY,
                                payload: resp.data.data
                            });

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x5, _x6, _x7) {
            return _ref3.apply(this, arguments);
        };
    }();
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(APP_QUERY, "APP_QUERY", "/Users/aaronlam/Documents/react-kit/src/actions/authAction.js");

    __REACT_HOT_LOADER__.register(AUTH_USER, "AUTH_USER", "/Users/aaronlam/Documents/react-kit/src/actions/authAction.js");

    __REACT_HOT_LOADER__.register(LOG_OUT, "LOG_OUT", "/Users/aaronlam/Documents/react-kit/src/actions/authAction.js");

    __REACT_HOT_LOADER__.register(logout, "logout", "/Users/aaronlam/Documents/react-kit/src/actions/authAction.js");

    __REACT_HOT_LOADER__.register(authUser, "authUser", "/Users/aaronlam/Documents/react-kit/src/actions/authAction.js");

    __REACT_HOT_LOADER__.register(appQuery, "appQuery", "/Users/aaronlam/Documents/react-kit/src/actions/authAction.js");
}();

;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API_URL = exports.theme = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _styles = __webpack_require__(7);

var _colors = __webpack_require__(24);

var isProd = process.env.NODE_ENV === "production";

var theme = exports.theme = (0, _styles.createMuiTheme)({
    palette: {
        primary: _colors.teal,
        secondary: _extends({}, _colors.blue, {
            A200: "#00B8D4"
        }),
        error: _colors.red
    }
});

var API_URL = exports.API_URL = isProd ? "https://onnez-api.herokuapp.com/" : "http://localhost:3000";
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(isProd, "isProd", "/Users/aaronlam/Documents/react-kit/config.js");

    __REACT_HOT_LOADER__.register(theme, "theme", "/Users/aaronlam/Documents/react-kit/config.js");

    __REACT_HOT_LOADER__.register(API_URL, "API_URL", "/Users/aaronlam/Documents/react-kit/config.js");
}();

;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _app = __webpack_require__(18);

var _app2 = _interopRequireDefault(_app);

var _home = __webpack_require__(41);

var _home2 = _interopRequireDefault(_home);

var _notFound = __webpack_require__(44);

var _notFound2 = _interopRequireDefault(_notFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_extends({}, _app2.default, {
    routes: [_extends({}, _home2.default, {
        path: "/",
        exact: true
    }), _extends({}, _notFound2.default)]
})];
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, "default", "/Users/aaronlam/Documents/react-kit/src/routes.js");
}();

;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generateStore = __webpack_require__(19);

Object.keys(_generateStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _generateStore[key];
    }
  });
});

var _renderer = __webpack_require__(25);

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderer[key];
    }
  });
});

var _cookie = __webpack_require__(33);

Object.keys(_cookie).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cookie[key];
    }
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Icon");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

var _express = __webpack_require__(15);

var _express2 = _interopRequireDefault(_express);

var _expressHttpProxy = __webpack_require__(16);

var _expressHttpProxy2 = _interopRequireDefault(_expressHttpProxy);

var _serveFavicon = __webpack_require__(17);

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _reactRouterConfig = __webpack_require__(1);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

var _helpers = __webpack_require__(5);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 4000;
var app = (0, _express2.default)();
var isProd = process.env.NODE_ENV === "production";

if (isProd) {
    app.use(_express2.default.static("public"));
} else {
    var webpack = __webpack_require__(12);
    var webpackConfig = __webpack_require__(45);

    var compiler = webpack(webpackConfig);
    app.use(__webpack_require__(53)(compiler, {
        noInfo: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(__webpack_require__(54)(compiler, { log: false }));
}

// serve favicon
app.use((0, _serveFavicon2.default)("assets/thumbnail.png"));
app.use("/api", (0, _expressHttpProxy2.default)(_config.API_URL, {
    proxyReqOptDecorator: function proxyReqOptDecorator(opts) {
        opts.headers["x-forwarded-host"] = "localhost:" + port;
        return opts;
    }
}));

app.get("*", function (req, res) {
    var store = (0, _helpers.generateStore)(req, res);
    var promises = (0, _reactRouterConfig.matchRoutes)(_routes2.default, req.path).map(function (_ref) {
        var route = _ref.route;
        return route.loadData ? route.loadData(store) : null;
    }).map(function (promise) {
        if (promise) {
            return new Promise(function (resolve) {
                promise.then(resolve).catch(resolve);
            });
        }
        return null;
    });
    return Promise.all(promises).then(function () {
        var context = {};
        var content = (0, _helpers.renderer)(req, store, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});

app.listen(port, function () {
    return console.log("Listening on port " + port);
}); // eslint-disable-line

;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(port, "port", "/Users/aaronlam/Documents/react-kit/server.js");

    __REACT_HOT_LOADER__.register(app, "app", "/Users/aaronlam/Documents/react-kit/server.js");

    __REACT_HOT_LOADER__.register(isProd, "isProd", "/Users/aaronlam/Documents/react-kit/server.js");
}();

;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterConfig = __webpack_require__(1);

var _authAction = __webpack_require__(2);

var _components = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.notFound = function () {
            var _this2;

            return (_this2 = _this).__notFound__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(App, [{
        key: "__notFound__REACT_HOT_LOADER__",
        value: function __notFound__REACT_HOT_LOADER__() {
            return this.__notFound__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var jssStyles = document.getElementById("jss-server-side");
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }
    }, {
        key: "__notFound__REACT_HOT_LOADER__",
        value: function __notFound__REACT_HOT_LOADER__() {
            var _props = this.props,
                routes = _props.route.routes,
                pathname = _props.location.pathname;

            for (var i = 0; i < routes.length - 1; i++) {
                var path = routes[i].path;

                if (path === pathname) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                routes = _props2.route.routes,
                history = _props2.history,
                notFound = this.notFound;

            var isNotFound = notFound();

            return _react2.default.createElement(
                "div",
                { className: "app" },
                isNotFound ? null : _react2.default.createElement(_components.NavBar, { history: history }),
                (0, _reactRouterConfig.renderRoutes)(routes)
            );
        }
    }]);

    return App;
}(_react.Component);

var _default = {
    component: App,
    loadData: function loadData(_ref2) {
        var dispatch = _ref2.dispatch;
        return dispatch((0, _authAction.authUser)());
    }
};
exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(App, "App", "/Users/aaronlam/Documents/react-kit/src/pages/app.js");

    __REACT_HOT_LOADER__.register(_default, "default", "/Users/aaronlam/Documents/react-kit/src/pages/app.js");
}();

;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateStore = undefined;

var _redux = __webpack_require__(6);

var _reduxThunk = __webpack_require__(20);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _axios = __webpack_require__(21);

var _axios2 = _interopRequireDefault(_axios);

var _reducers = __webpack_require__(22);

var _reducers2 = _interopRequireDefault(_reducers);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateStore = exports.generateStore = function generateStore(req, res) {
    var axiosInstance = _axios2.default.create({
        baseURL: _config.API_URL,
        headers: { cookie: req.get("cookie") || "", origin: req.protocol + "://" + req.get("host") }
    });

    var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument({ api: axiosInstance, res: res })));

    return store;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(generateStore, "generateStore", "/Users/aaronlam/Documents/react-kit/src/helpers/generateStore.js");
}();

;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _authReducer = __webpack_require__(23);

var _authReducer2 = _interopRequireDefault(_authReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
    auth: _authReducer2.default
});

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, "default", "/Users/aaronlam/Documents/react-kit/src/reducers/index.js");
}();

;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _authAction = __webpack_require__(2);

var INITIAL_STATE = {
    user: null,
    hello: null
};

var _default = function _default() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case _authAction.AUTH_USER:
            return _extends({}, state, { user: action.user });
        case _authAction.LOG_OUT:
            return _extends({}, state, { user: null });
        case _authAction.APP_QUERY:
            return _extends({}, state, action.payload);
        default:
            return state;
    }
};

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(INITIAL_STATE, "INITIAL_STATE", "/Users/aaronlam/Documents/react-kit/src/reducers/authReducer.js");

    __REACT_HOT_LOADER__.register(_default, "default", "/Users/aaronlam/Documents/react-kit/src/reducers/authReducer.js");
}();

;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("material-ui/colors");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderer = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(26);

var _jss = __webpack_require__(27);

var _JssProvider = __webpack_require__(28);

var _JssProvider2 = _interopRequireDefault(_JssProvider);

var _jss2 = __webpack_require__(29);

var _jssPresetDefault = __webpack_require__(30);

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

var _reactRouterDom = __webpack_require__(8);

var _reactRedux = __webpack_require__(9);

var _reactRouterConfig = __webpack_require__(1);

var _reactHelmet = __webpack_require__(10);

var _serializeJavascript = __webpack_require__(31);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _createGenerateClassName = __webpack_require__(32);

var _createGenerateClassName2 = _interopRequireDefault(_createGenerateClassName);

var _styles = __webpack_require__(7);

var _config = __webpack_require__(3);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isProd = process.env.NODE_ENV === "production";

var renderer = exports.renderer = function renderer(req, store, context) {
    if (!isProd) {
        return "\n            <html>\n                <head></head>\n                <body>\n                    <noscript>Need Javascript enabled</noscript>\n                    <div id=\"root\"></div>\n                    <script>window.__INITIAL_STATE__ = " + (0, _serializeJavascript2.default)(store.getState()) + "</script>\n                    <script src=\"vendor.js\"></script>\n                    <script src=\"bundle.js\"></script>\n                </body>\n            </html>\n        ";
    }
    var sheetsRegistry = new _jss.SheetsRegistry();
    var jss = (0, _jss2.create)((0, _jssPresetDefault2.default)());

    jss.options.createGenerateClassName = _createGenerateClassName2.default;

    var content = (0, _server.renderToString)(_react2.default.createElement(
        _JssProvider2.default,
        { registry: sheetsRegistry, jss: jss },
        _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: _config.theme, sheetsManager: new Map() },
            _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _reactRouterDom.StaticRouter,
                    { location: req.path, context: context },
                    _react2.default.createElement(
                        "div",
                        null,
                        (0, _reactRouterConfig.renderRoutes)(_routes2.default)
                    )
                )
            )
        )
    )); // eslint-disable-line

    var helmet = _reactHelmet.Helmet.renderStatic();
    var css = sheetsRegistry.toString();

    return "\n        <html>\n            <head>\n                " + helmet.title.toString() + "\n                " + helmet.meta.toString() + "\n                <link rel=\"stylesheet\" href=\"main.css\">\n                <style id=\"jss-server-side\">" + css + "</style>\n            </head>\n            <body>\n                <div id=\"root\">" + content + "</div>\n                <script>window.__INITIAL_STATE__ = " + (0, _serializeJavascript2.default)(store.getState()) + "</script>\n                <script src=\"vendor.js\"></script>\n                <script src=\"bundle.js\"></script>\n            </body>\n        </html>\n    ";
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(isProd, "isProd", "/Users/aaronlam/Documents/react-kit/src/helpers/renderer.js");

    __REACT_HOT_LOADER__.register(renderer, "renderer", "/Users/aaronlam/Documents/react-kit/src/helpers/renderer.js");
}();

;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/jss");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/JssProvider");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("jss");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("jss-preset-default");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/createGenerateClassName");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteCookie = deleteCookie;
function deleteCookie(cookeName, validDomain) {
    var domanStr = validDomain ? "; domain=" + validDomain : "";
    document.cookie = cookeName + "=; max-age=0; path=/" + domanStr;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(deleteCookie, "deleteCookie", "/Users/aaronlam/Documents/react-kit/src/helpers/cookie.js");
}();

;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navbar = __webpack_require__(35);

Object.keys(_navbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _navbar[key];
    }
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _Icon = __webpack_require__(11);

var _Icon2 = _interopRequireDefault(_Icon);

var _AppBar = __webpack_require__(36);

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Typography = __webpack_require__(37);

var _Typography2 = _interopRequireDefault(_Typography);

var _Toolbar = __webpack_require__(38);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _IconButton = __webpack_require__(39);

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = __webpack_require__(40);

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = exports.NavBar = function (_Component) {
    _inherits(NavBar, _Component);

    function NavBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NavBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            anchorEl: null
        }, _this.handleMenu = function () {
            var _this2;

            return (_this2 = _this).__handleMenu__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.handleClose = function () {
            var _this3;

            return (_this3 = _this).__handleClose__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NavBar, [{
        key: "__handleClose__REACT_HOT_LOADER__",
        value: function __handleClose__REACT_HOT_LOADER__() {
            return this.__handleClose__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: "__handleMenu__REACT_HOT_LOADER__",
        value: function __handleMenu__REACT_HOT_LOADER__() {
            return this.__handleMenu__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: "__handleMenu__REACT_HOT_LOADER__",
        value: function __handleMenu__REACT_HOT_LOADER__(e) {
            this.setState({ anchorEl: e.currentTarget });
        }
    }, {
        key: "__handleClose__REACT_HOT_LOADER__",
        value: function __handleClose__REACT_HOT_LOADER__(name) {
            var _this4 = this;

            return function () {
                var history = _this4.props.history;

                if (name) {
                    history.push("/" + name);
                }
                _this4.setState({ anchorEl: null });
            };
        }
    }, {
        key: "render",
        value: function render() {
            var anchorEl = this.state.anchorEl,
                handleMenu = this.handleMenu,
                handleClose = this.handleClose;

            var open = Boolean(anchorEl);

            return _react2.default.createElement(
                _AppBar2.default,
                { position: "static", color: "primary" },
                _react2.default.createElement(
                    _Toolbar2.default,
                    null,
                    _react2.default.createElement(
                        _Typography2.default,
                        { type: "title", color: "inherit", id: "logo-container" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/", href: "/", className: "link" },
                            "onNez"
                        )
                    ),
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            "aria-owns": anchorEl ? "menu-appbar" : null,
                            "aria-haspopup": "true",
                            onClick: handleMenu,
                            color: "contrast"
                        },
                        _react2.default.createElement(
                            _Icon2.default,
                            null,
                            "account_circle"
                        )
                    ),
                    _react2.default.createElement(
                        _Menu2.default,
                        {
                            id: "menu-appbar",
                            getContentAnchorEl: null,
                            anchorEl: anchorEl,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "center"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "center"
                            },
                            open: open,
                            onRequestClose: handleClose()
                        },
                        _react2.default.createElement(
                            _Menu.MenuItem,
                            { onClick: handleClose("profile") },
                            "Profile"
                        ),
                        _react2.default.createElement(
                            _Menu.MenuItem,
                            { onClick: handleClose("account") },
                            "My Account"
                        )
                    )
                )
            );
        }
    }]);

    return NavBar;
}(_react.Component);

;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(NavBar, "NavBar", "/Users/aaronlam/Documents/react-kit/src/pages/components/navbar.js");
}();

;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("material-ui/AppBar");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Typography");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Toolbar");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("material-ui/IconButton");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Menu");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(10);

var _reactRedux = __webpack_require__(9);

var _Icon = __webpack_require__(11);

var _Icon2 = _interopRequireDefault(_Icon);

var _graphql = __webpack_require__(42);

var _authAction = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Home);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
            var _this2;

            return (_this2 = _this).__onClick__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.head = function () {
            var _this3;

            return (_this3 = _this).__head__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Home, [{
        key: "__head__REACT_HOT_LOADER__",
        value: function __head__REACT_HOT_LOADER__() {
            return this.__head__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: "__onClick__REACT_HOT_LOADER__",
        value: function __onClick__REACT_HOT_LOADER__() {
            return this.__onClick__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: "__onClick__REACT_HOT_LOADER__",
        value: function __onClick__REACT_HOT_LOADER__() {
            this.props.appQuery(_graphql.helloWorld);
        }
    }, {
        key: "__head__REACT_HOT_LOADER__",
        value: function __head__REACT_HOT_LOADER__() {
            return _react2.default.createElement(
                _reactHelmet.Helmet,
                null,
                _react2.default.createElement(
                    "title",
                    null,
                    "Home Page"
                ),
                _react2.default.createElement("meta", { property: "og:title", content: "Users App" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            var head = this.head;


            return _react2.default.createElement(
                "div",
                { className: "home" },
                head(),
                _react2.default.createElement(
                    "h3",
                    null,
                    "Welcome on Heroku!!"
                ),
                _react2.default.createElement(
                    "a",
                    { href: "api/auth/facebook" },
                    "click"
                ),
                _react2.default.createElement(
                    _Icon2.default,
                    { color: "accent" },
                    "settings_bluetooth"
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

var maptStateToProps = function maptStateToProps(_ref2) {
    var auth = _ref2.auth;
    return { auth: auth };
};

var _default = {
    component: (0, _reactRedux.connect)(maptStateToProps, { appQuery: _authAction.appQuery })(Home)
};
exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Home, "Home", "/Users/aaronlam/Documents/react-kit/src/pages/home.js");

    __REACT_HOT_LOADER__.register(maptStateToProps, "maptStateToProps", "/Users/aaronlam/Documents/react-kit/src/pages/home.js");

    __REACT_HOT_LOADER__.register(_default, "default", "/Users/aaronlam/Documents/react-kit/src/pages/home.js");
}();

;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helloworld = __webpack_require__(43);

Object.keys(_helloworld).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helloworld[key];
    }
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var helloWorld = exports.helloWorld = "\n    query HelloWorld {\n        hello {\n            text\n        }\n    }\n";
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(helloWorld, "helloWorld", "/Users/aaronlam/Documents/react-kit/src/graphql/helloworld.js");
}();

;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
    _inherits(NotFound, _Component);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    _createClass(NotFound, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "h1",
                null,
                "Ooops, route not found."
            );
        }
    }]);

    return NotFound;
}(_react.Component);

var _default = {
    component: NotFound
};
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(NotFound, "NotFound", "/Users/aaronlam/Documents/react-kit/src/pages/notFound.js");

    __REACT_HOT_LOADER__.register(_default, "default", "/Users/aaronlam/Documents/react-kit/src/pages/notFound.js");
}();

;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var prod = process.env.NODE_ENV === "production";
var path = __webpack_require__(46);
var webpack = __webpack_require__(12);
var merge = __webpack_require__(47);
var baseConfig = __webpack_require__(48);
var SWPrecacheWebpackPlugin = __webpack_require__(52);

var plugins = [new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" })];

var prodApp = ["babel-polyfill", "./src/index.js"];

var config = {
    // Tell webpack the root file of our
    // server application
    entry: {
        app: prod ? prodApp : ["babel-polyfill", "webpack-hot-middleware/client?reload=true&noInfo=true&quiet=true", "react-hot-loader/patch", "./src/index.js"],
        vendor: ["axios", "react", "react-dom", "react-router", "react-router-dom", "react-router-config", "react-helmet", "redux", "redux-thunk", "react-redux", "redux-devtools-extension", "material-ui"]
    },
    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/",
        hotUpdateChunkFilename: "hot-update.js",
        hotUpdateMainFilename: "hot-update.json"
    },
    devtool: prod ? false : "#inline-source-map",
    plugins: prod ? [].concat(plugins, [new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }), new SWPrecacheWebpackPlugin({
        cacheId: "v1" + new Date().getTime().toString(),
        filename: "service-worker.js",
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [{
            urlPattern: "/",
            handler: "networkFirst"
        }, {
            urlPattern: /\/(users|admins)/,
            handler: "networkFirst"
        }]
    }), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })]) : [].concat(plugins, [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]),
    cache: true,
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: "file-loader",
                options: {
                    outputPath: "assets/"
                }
            }]
        }]
    }
};

module.exports = merge(baseConfig, config);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(prod, "prod", "/Users/aaronlam/Documents/react-kit/webpack.client.js");

    __REACT_HOT_LOADER__.register(plugins, "plugins", "/Users/aaronlam/Documents/react-kit/webpack.client.js");

    __REACT_HOT_LOADER__.register(prodApp, "prodApp", "/Users/aaronlam/Documents/react-kit/webpack.client.js");

    __REACT_HOT_LOADER__.register(config, "config", "/Users/aaronlam/Documents/react-kit/webpack.client.js");
}();

;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prod = process.env.NODE_ENV === "production";
var ExtractTextPlugin = __webpack_require__(49);
var OptimizeCssAssetsPlugin = __webpack_require__(50);
var cssnano = __webpack_require__(51);

module.exports = {
    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [{
            test: /\.js?$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: prod ? ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?importLoaders=1", "postcss-loader"]
            }) : ["style-loader?sourceMap=true", "css-loader?importLoaders=1", "postcss-loader"]
        }]
    },
    plugins: prod ? [new ExtractTextPlugin({
        filename: "main.css"
    }), new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    })] : []
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(prod, "prod", "/Users/aaronlam/Documents/react-kit/webpack.base.js");
}();

;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("optimize-css-assets-webpack-plugin");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("cssnano");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("sw-precache-webpack-plugin");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ })
/******/ ]);