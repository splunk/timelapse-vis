module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ColumnLayout");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("date-fns");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-context");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-context/GeoJsonProvider");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-context/GeoRegistry");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-core");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-presets/EnterprisePreset");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/WaitSpinner");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-timeline-range-slider");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@splunk/dashboard-context"
var dashboard_context_ = __webpack_require__(3);

// EXTERNAL MODULE: external "@splunk/dashboard-context/GeoJsonProvider"
var GeoJsonProvider_ = __webpack_require__(4);
var GeoJsonProvider_default = /*#__PURE__*/__webpack_require__.n(GeoJsonProvider_);

// EXTERNAL MODULE: external "@splunk/dashboard-context/GeoRegistry"
var GeoRegistry_ = __webpack_require__(5);
var GeoRegistry_default = /*#__PURE__*/__webpack_require__.n(GeoRegistry_);

// EXTERNAL MODULE: external "@splunk/dashboard-core"
var dashboard_core_ = __webpack_require__(6);
var dashboard_core_default = /*#__PURE__*/__webpack_require__.n(dashboard_core_);

// EXTERNAL MODULE: external "@splunk/dashboard-presets/EnterprisePreset"
var EnterprisePreset_ = __webpack_require__(7);
var EnterprisePreset_default = /*#__PURE__*/__webpack_require__.n(EnterprisePreset_);

// EXTERNAL MODULE: external "@splunk/react-ui/ColumnLayout"
var ColumnLayout_ = __webpack_require__(1);
var ColumnLayout_default = /*#__PURE__*/__webpack_require__.n(ColumnLayout_);

// EXTERNAL MODULE: external "@splunk/react-ui/WaitSpinner"
var WaitSpinner_ = __webpack_require__(8);
var WaitSpinner_default = /*#__PURE__*/__webpack_require__.n(WaitSpinner_);

// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(2);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-timeline-range-slider"
var external_react_timeline_range_slider_ = __webpack_require__(9);
var external_react_timeline_range_slider_default = /*#__PURE__*/__webpack_require__.n(external_react_timeline_range_slider_);

// CONCATENATED MODULE: ./src/demodash.js
var demodash = {
  "visualizations": {
    "viz_TUg2KOpr": {
      "type": "viz.line",
      "options": {},
      "dataSources": {
        "primary": "ds_FtRF4MzI"
      }
    }
  },
  "dataSources": {
    "ds_FtRF4MzI": {
      "type": "ds.search",
      "options": {
        "query": "| makeresults count=100 | eval t=86400\n| streamstats sum(t) as t\n| eval _time=_time-t | eval time=_time | fields - time"
      },
      "name": "Confirmed Cases"
    }
  },
  "defaults": {
    "dataSources": {
      "ds.search": {
        "options": {}
      }
    },
    "visualizations": {
      "global": {
        "showLastUpdated": true
      }
    }
  },
  "inputs": {},
  "layout": {
    "type": "absolute",
    "options": {
      "display": "auto-scale"
    },
    "structure": [{
      "item": "viz_TUg2KOpr",
      "type": "block",
      "position": {
        "x": 0,
        "y": 0,
        "w": 1200,
        "h": 510
      }
    }],
    "globalInputs": []
  },
  "description": "",
  "title": "Timelapse"
};
/* harmony default export */ var src_demodash = (demodash);
// CONCATENATED MODULE: ./src/Rangeslider.jsx
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











 //Get the current dashboard ID

var dashboard_id = window.location.pathname.split("/").pop(); //Initialize Variables as empty

var selectedInterval = [];
var disabledIntervals = [];
var timelineInterval = [];
var geoRegistry = GeoRegistry_default.a.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider_default.a()); //Get the Time Ranges from the URL Params

var Rangeslider_search = window.location.search;
var Rangeslider_params = new URLSearchParams(Rangeslider_search);
var rangeStart = Math.round(Date.parse(Rangeslider_params.get('rangeStart')).valueOf() / 1000);
var rangeEnd = Math.round(Date.parse(Rangeslider_params.get('rangeEnd')).valueOf() / 1000);
var definition = "";
timelineInterval = [rangeStart * 1000, rangeEnd * 1000];
selectedInterval = timelineInterval; //SplunkTimeRangeSlider Class

var Rangeslider_SplunkTimeRangeSliderInput = /*#__PURE__*/function (_React$Component) {
  _inherits(SplunkTimeRangeSliderInput, _React$Component);

  var _super = _createSuper(SplunkTimeRangeSliderInput);

  function SplunkTimeRangeSliderInput(props) {
    var _this;

    _classCallCheck(this, SplunkTimeRangeSliderInput);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "errorHandler", function (_ref) {
      var error = _ref.error;
      return _this.setState({
        error: error
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeCallback", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(selectedInterval) {
        var definition_new, v;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //Update the selectedInterval variable with the new start and end times
                selectedInterval.map(function (d, i) {
                  if (i == 0) {
                    _this.start_range = d.getTime() / 1000;
                  }

                  if (i == 1) {
                    _this.end_range = d.getTime() / 1000;
                  }
                }); //For each dataSource in the dashboard, append a where clause to limit the start/end time

                definition_new = JSON.parse(JSON.stringify(definition));

                for (v in definition.dataSources) {
                  //Currently just modify the range of the search with a new range based on the rangeslider selected start and end
                  definition_new.dataSources[v].options.query = definition_new.dataSources[v].options.query + "| eval time=_time | where time<=" + _this.end_range.toString() + " AND time>=" + _this.start_range.toString() + " | fields - time";
                } //Set the state variable of selectedInterval with the new values


                _this.setState({
                  selectedInterval: selectedInterval
                });

                _this.setState({
                  def: definition_new
                }); //definition = definition_new


                _this.state.hasNotBeenFetched = false;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _this.state = {
      error: false,
      selectedInterval: selectedInterval,
      def: _this.props.dash.props.definition,
      hasNotBeenFetched: true,
      startTime: rangeStart,
      endTime: rangeEnd
    };

    _this.fetchDefinition();

    return _this;
  }

  _createClass(SplunkTimeRangeSliderInput, [{
    key: "fetchDefinition",
    value: function fetchDefinition() {
      var _this2 = this;

      var search = window.location.search;
      var params = new URLSearchParams(search);
      var demo = params.get('demo');
      var dashboardid = params.get('dashboardid');

      if (demo == "true") {
        dashboardid = "thisisonlyademo";
      }

      fetch("/splunkd/services/data/ui/views/".concat(dashboardid, "?output_mode=json"), {
        credentials: 'include'
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
        var def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);

        _this2.setState({
          def: def
        });

        definition = def;

        _this2.setState({
          hasNotBeenFetched: false
        });
      })["catch"](function (e) {
        //If there is an error, and demo==true, apply the demo dashboard.
        if (demo == "true") {
          _this2.setState({
            def: src_demodash
          });

          definition = src_demodash;

          _this2.setState({
            hasNotBeenFetched: false
          });
        }

        console.error('Error during definition retrieval/parsing', e);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var dash = /*#__PURE__*/external_react_default.a.createElement(dashboard_context_["DashboardContextProvider"], {
        geoRegistry: geoRegistry
      }, /*#__PURE__*/external_react_default.a.createElement(dashboard_core_default.a, {
        width: "100%",
        height: "calc(100vh - 78px)",
        definition: this.state.def,
        preset: EnterprisePreset_default.a,
        initialMode: "view"
      }));
      return /*#__PURE__*/external_react_default.a.createElement(ColumnLayout_default.a, null, /*#__PURE__*/external_react_default.a.createElement(ColumnLayout_default.a.Row, null, this.state.selectedInterval.map(function (d, i) {
        if (i == 0) {
          return /*#__PURE__*/external_react_default.a.createElement("span", {
            id: i,
            key: i
          }, /*#__PURE__*/external_react_default.a.createElement("p", null, " Selected Interval: ", Object(external_date_fns_["format"])(d, "MM/dd/yyyy HH:mm"), "  through\xA0"), " ");
        }

        if (i == 1) {
          return /*#__PURE__*/external_react_default.a.createElement("span", {
            id: i,
            key: i
          }, /*#__PURE__*/external_react_default.a.createElement("p", null, Object(external_date_fns_["format"])(d, "MM/dd/yyyy HH:mm")));
        }
      })), /*#__PURE__*/external_react_default.a.createElement(ColumnLayout_default.a.Row, null, /*#__PURE__*/external_react_default.a.createElement(external_react_timeline_range_slider_default.a, {
        error: this.state.error,
        ticksNumber: 36,
        selectedInterval: selectedInterval,
        timelineInterval: timelineInterval,
        onUpdateCallback: this.errorHandler,
        onChangeCallback: this.onChangeCallback,
        disabledIntervals: disabledIntervals
      })), /*#__PURE__*/external_react_default.a.createElement(ColumnLayout_default.a.Row, null, this.state.hasNotBeenFetched ? /*#__PURE__*/external_react_default.a.createElement(WaitSpinner_default.a, {
        size: "large"
      }) : dash));
    }
  }]);

  return SplunkTimeRangeSliderInput;
}(external_react_default.a.Component);

/* harmony default export */ var Rangeslider = __webpack_exports__["default"] = (Rangeslider_SplunkTimeRangeSliderInput);

/***/ })
/******/ ]);