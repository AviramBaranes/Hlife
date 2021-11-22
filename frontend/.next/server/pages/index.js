(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "./components/UI/Backdrop/Backdrop.tsx":
/*!*********************************************!*\
  !*** ./components/UI/Backdrop/Backdrop.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_components_Backdrop_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/components/Backdrop.module.scss */ "./styles/components/Backdrop.module.scss");
/* harmony import */ var _styles_components_Backdrop_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_components_Backdrop_module_scss__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\UI\\Backdrop\\Backdrop.tsx";


const Backdrop = props => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    style: {
      background: props.background || ''
    },
    className: (_styles_components_Backdrop_module_scss__WEBPACK_IMPORTED_MODULE_1___default().backdrop),
    onClick: () => props.onClose()
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 10
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Backdrop);

/***/ }),

/***/ "./components/UI/Modal/Modal.tsx":
/*!***************************************!*\
  !*** ./components/UI/Modal/Modal.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Backdrop_Backdrop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Backdrop/Backdrop */ "./components/UI/Backdrop/Backdrop.tsx");
/* harmony import */ var _styles_components_Modal_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../styles/components/Modal.module.scss */ "./styles/components/Modal.module.scss");
/* harmony import */ var _styles_components_Modal_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_components_Modal_module_scss__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\UI\\Modal\\Modal.tsx";




const ModalOverlay = ({
  children,
  yPosition
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_components_Modal_module_scss__WEBPACK_IMPORTED_MODULE_3___default().modal),
    style: {
      top: yPosition
    },
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_components_Modal_module_scss__WEBPACK_IMPORTED_MODULE_3___default().content),
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 5
  }, undefined);
};

const Modal = ({
  children,
  yPosition,
  onClose
}) => {
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1___default().createPortal( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Backdrop_Backdrop__WEBPACK_IMPORTED_MODULE_2__.default, {
      onClose: onClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ModalOverlay, {
      yPosition: yPosition,
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, undefined)]
  }, void 0, true), document.getElementById('overlays'));
};

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./components/UI/SVGs/title-line.tsx":
/*!*******************************************!*\
  !*** ./components/UI/SVGs/title-line.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\UI\\SVGs\\title-line.tsx";


function Line() {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("svg", {
    width: "163",
    height: "27",
    viewBox: "0 0 163 27",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("path", {
      d: "M6.5 20.5C108.5 3.3 148.667 5.33333 156 8.5",
      stroke: "var(--primary-color)",
      strokeWidth: "12",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (Line);

/***/ }),

/***/ "./components/home/DailyMission.tsx":
/*!******************************************!*\
  !*** ./components/home/DailyMission.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/pages/home.module.scss */ "./styles/pages/home.module.scss");
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _redux_slices_loading_loadingSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/slices/loading/loadingSlice */ "./redux/slices/loading/loadingSlice.tsx");
/* harmony import */ var _redux_slices_messages_messagesSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../redux/slices/messages/messagesSlice */ "./redux/slices/messages/messagesSlice.tsx");
/* harmony import */ var _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/axios/axiosInstance */ "./utils/axios/axiosInstance.tsx");
/* harmony import */ var _utils_errors_handleRequestErrors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/errors/handleRequestErrors */ "./utils/errors/handleRequestErrors.tsx");
/* harmony import */ var _UI_Modal_Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../UI/Modal/Modal */ "./components/UI/Modal/Modal.tsx");


var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\home\\DailyMission.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const DailyMission = ({
  trainingDayName,
  exercises,
  time,
  workoutName
}) => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const {
    0: showModal,
    1: setShowModal
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    0: completedExercises,
    1: setCompletedExercises
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(exercises === null || exercises === void 0 ? void 0 : exercises.reduce((prev, curr) => _objectSpread(_objectSpread({}, prev), {}, {
    [curr.name]: false
  }), {}));
  const today = new Date();
  const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  async function completeBtnClickedHandler() {
    if (trainingDayName === 'aerobic' || trainingDayName === 'X') {
      dispatch(_redux_slices_loading_loadingSlice__WEBPACK_IMPORTED_MODULE_4__.loadingAction.setToTrue());

      try {
        const {
          data
        } = await _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__.default.post('/program-exec/', {
          isAerobic: trainingDayName === 'aerobic'
        });
        dispatch(_redux_slices_loading_loadingSlice__WEBPACK_IMPORTED_MODULE_4__.loadingAction.setToFalse());
        dispatch(_redux_slices_messages_messagesSlice__WEBPACK_IMPORTED_MODULE_5__.messagesActions.newMessage({
          messageTitle: 'Execution Submitted',
          message: data
        }));
        next_router__WEBPACK_IMPORTED_MODULE_1___default().reload();
      } catch (err) {
        err;
        (0,_utils_errors_handleRequestErrors__WEBPACK_IMPORTED_MODULE_7__.handleAxiosError)(err, dispatch, 'Failed to submit');
      }
    } else {
      setShowModal(true);
    }
  }

  function inputChangeHandler(e) {
    const {
      id,
      checked
    } = e.target;
    setCompletedExercises(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [id]: checked
    }));
  }

  async function submitFormHandler(e) {
    e.preventDefault();

    try {
      const {
        data
      } = await _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__.default.post('/program-exec/', {
        exercises: completedExercises
      });
      dispatch(_redux_slices_loading_loadingSlice__WEBPACK_IMPORTED_MODULE_4__.loadingAction.setToFalse());
      dispatch(_redux_slices_messages_messagesSlice__WEBPACK_IMPORTED_MODULE_5__.messagesActions.newMessage({
        messageTitle: 'Execution Submitted',
        message: data
      }));
      next_router__WEBPACK_IMPORTED_MODULE_1___default().reload();
    } catch (err) {
      (0,_utils_errors_handleRequestErrors__WEBPACK_IMPORTED_MODULE_7__.handleAxiosError)(err, dispatch, 'Failed to submit');
    } finally {
      setShowModal(false);
    }
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().DailyMission),
    children: [showModal && workoutName && (exercises === null || exercises === void 0 ? void 0 : exercises.length) && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_Modal_Modal__WEBPACK_IMPORTED_MODULE_8__.default, {
      onClose: () => setShowModal(false),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().DailyMissionModal),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().ModalTitle),
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
              children: workoutName
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 99,
              columnNumber: 17
            }, undefined), " (", trainingDayName, ")"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("time", {
            children: date
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h4", {
          children: "Exercises: "
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("form", {
          onSubmit: submitFormHandler,
          children: [exercises.map((exercise, i) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().Form),
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
              onChange: inputChangeHandler,
              type: "checkbox",
              id: exercise.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 107,
              columnNumber: 19
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().Exercise),
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                htmlFor: exercise.name,
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                  children: "Name: "
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 114,
                  columnNumber: 23
                }, undefined), exercise.name]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 113,
                columnNumber: 21
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [exercise.description && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                    children: "Description: "
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 120,
                    columnNumber: 27
                  }, undefined), exercise.description]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 119,
                  columnNumber: 25
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                    children: "Reps: "
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 125,
                    columnNumber: 25
                  }, undefined), exercise.reps]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 124,
                  columnNumber: 23
                }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                    children: "Sets: "
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 129,
                    columnNumber: 25
                  }, undefined), exercise.sets]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 128,
                  columnNumber: 23
                }, undefined), exercise.muscles && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                    children: "Muscles: "
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 135,
                    columnNumber: 27
                  }, undefined), exercise.muscles.join(', ')]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 134,
                  columnNumber: 25
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 117,
                columnNumber: 21
              }, undefined)]
            }, exercise.name + i, true, {
              fileName: _jsxFileName,
              lineNumber: 112,
              columnNumber: 19
            }, undefined)]
          }, exercise.name + i, true, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 17
          }, undefined)), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
            className: "success-button",
            type: "submit",
            children: "Submit"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 143,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
      children: "Daily Mission:"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      children: [workoutName ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
            children: "Workout: "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 155,
            columnNumber: 15
          }, undefined), workoutName, " (", trainingDayName, ")"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 154,
          columnNumber: 13
        }, undefined), time && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
            children: "Time: "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 160,
            columnNumber: 17
          }, undefined), time, " (minutes)"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 159,
          columnNumber: 15
        }, undefined)]
      }, void 0, true) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
          children: "Workout: "
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 167,
          columnNumber: 13
        }, undefined), "Rest Day (X)"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 166,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
          children: "Max Points: "
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 171,
          columnNumber: 11
        }, undefined), "10"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 170,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
      className: "primary-button",
      onClick: completeBtnClickedHandler,
      children: "Complete"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 93,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (DailyMission);

/***/ }),

/***/ "./components/home/DetailedExercise.tsx":
/*!**********************************************!*\
  !*** ./components/home/DetailedExercise.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/pages/home.module.scss */ "./styles/pages/home.module.scss");
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_2__);


var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\home\\DetailedExercise.tsx";



const DetailedExercise = ({
  workoutName,
  exercises,
  trainingDayName,
  time,
  description
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    "data-testid": "workout-modal",
    className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_2___default().TomorrowMissionModal),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_2___default().ModalTitle),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
          children: workoutName
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, undefined), " (", trainingDayName, ")"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("time", {
        children: time
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, undefined), description && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
      children: description
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 23
    }, undefined), exercises && !!exercises.length && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h4", {
        children: "Exercises:"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
        children: exercises.map((exercise, i) => {
          var _exercise$muscles;

          return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                  children: "Name:"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 38,
                  columnNumber: 21
                }, undefined), " ", exercise.name]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 37,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                  children: "Reps:"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 41,
                  columnNumber: 21
                }, undefined), " ", exercise.reps]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 40,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                  children: "Sets:"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 44,
                  columnNumber: 21
                }, undefined), " ", exercise.sets]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 43,
                columnNumber: 19
              }, undefined), exercise.description && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                  children: "Description:"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 48,
                  columnNumber: 23
                }, undefined), " ", exercise.description]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 47,
                columnNumber: 21
              }, undefined), !!((_exercise$muscles = exercise.muscles) !== null && _exercise$muscles !== void 0 && _exercise$muscles.length) && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                  children: "Muscles:"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 53,
                  columnNumber: 23
                }, undefined), " ", exercise.muscles.join(', ')]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 52,
                columnNumber: 21
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 36,
              columnNumber: 17
            }, undefined)
          }, exercise.name + i, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 15
          }, undefined);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 11
      }, undefined)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (DetailedExercise);

/***/ }),

/***/ "./components/home/ExecutionsGraph.tsx":
/*!*********************************************!*\
  !*** ./components/home/ExecutionsGraph.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "d3");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(d3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/pages/home.module.scss */ "./styles/pages/home.module.scss");
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/dates/dateToString */ "./utils/dates/dateToString.tsx");
/* harmony import */ var _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/axios/axiosInstance */ "./utils/axios/axiosInstance.tsx");
/* harmony import */ var _utils_errors_handleRequestErrors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/errors/handleRequestErrors */ "./utils/errors/handleRequestErrors.tsx");
/* harmony import */ var _UI_Modal_Modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../UI/Modal/Modal */ "./components/UI/Modal/Modal.tsx");
/* harmony import */ var _DetailedExercise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DetailedExercise */ "./components/home/DetailedExercise.tsx");

var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\home\\ExecutionsGraph.tsx";









const colors = ['#D9EFE0', '#B4E0C1', '#8ED0A2', '#68C083', '#30A954'];
const defaultExecutions = [{
  date: new Date(),
  rate: 0
}];

const ExecutionsGraph = ({
  weeklyExecutions
}) => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const updatedData = weeklyExecutions.length ? weeklyExecutions : defaultExecutions;
  const {
    0: executionsData,
    1: setExecutionsData
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(updatedData);
  const {
    0: hasExecutions,
    1: setHasExecutions
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!!weeklyExecutions.length);
  const {
    0: selectElActive,
    1: setSelectElActive
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: graphToDisplay,
    1: setGraphToDisplay
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('bar');
  const {
    0: showMonth,
    1: setShowMonth
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: showModal,
    1: setShowModal
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: currentWorkout,
    1: setCurrentWorkout
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const dimensions = {
    height: 280,
    width: 320,
    marginLeft: 50,
    marginTop: 10,
    marginRight: 25,
    marginBottom: 40
  };
  const pieDimensions = {
    height: 200,
    width: 310,
    radius: 105
  };
  const graphWidth = dimensions.width - dimensions.marginLeft - dimensions.marginRight;
  const graphHeight = dimensions.height - dimensions.marginTop - dimensions.marginBottom;
  const barRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const pieRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    0: date,
    1: setDate
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(getScaleTimeDomain());
  const {
    0: selectedBarChart,
    1: setSelectedBarChart
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: selectedPieChart,
    1: setSelectedPieChart
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: barGraph,
    1: setBarGraph
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: pieGraph,
    1: setPieGraph
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: avg,
    1: setAvg
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);

  function getScaleTimeDomain() {
    let domain = d3__WEBPACK_IMPORTED_MODULE_2__.extent(executionsData.map(item => new Date(item.date)));

    if (domain[0] === domain[1]) {
      const date = new Date(domain[0]);
      const date2 = new Date(date.setDate(date.getDate() + 1));
      domain = d3__WEBPACK_IMPORTED_MODULE_2__.extent([date, date2]);
      domain[0] = new Date(domain[0].setDate(domain[0].getDate() - 2));
      domain[1] = new Date(domain[1].setDate(domain[1].getDate() + 2));
      return domain;
    }

    domain[0] = new Date(domain[0].setDate(domain[0].getDate() - 1));
    domain[1] = new Date(domain[1].setDate(domain[1].getDate() + 1));
    return domain;
  }

  const arcPath = d3__WEBPACK_IMPORTED_MODULE_2__.arc().outerRadius(pieDimensions.radius).innerRadius(pieDimensions.radius / 2);

  const pieTweenEnter = d => {
    const i = d3__WEBPACK_IMPORTED_MODULE_2__.interpolate(d.endAngle, d.startAngle);
    return function (t) {
      d.startAngle = i(t);
      return arcPath(d);
    };
  };

  const pieTweenExit = d => {
    const i = d3__WEBPACK_IMPORTED_MODULE_2__.interpolate(d.startAngle, d.endAngle);
    return function (t) {
      d.startAngle = i(t);
      return arcPath(d);
    };
  };

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!hasExecutions && selectedBarChart) {
      selectedBarChart.style('height', 0);
      selectedBarChart.style('visibility', 'hidden');
    }

    if (hasExecutions && selectedBarChart) {
      selectedBarChart.style('height', 280);
      selectedBarChart.style('visibility', 'visible');
    }

    if (!hasExecutions && selectedPieChart) {
      selectedPieChart.style('height', 0);
      selectedPieChart.style('visibility', 'hidden');
    }

    if (hasExecutions && selectedPieChart) {
      selectedPieChart.style('height', 320);
      selectedPieChart.style('visibility', 'visible');
    }
  }, [hasExecutions, selectedBarChart, selectedPieChart]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAvg(+(executionsData.reduce((prev, curr) => prev += curr.rate, 0) / executionsData.length).toFixed(2)); //dates title

    setDate(getScaleTimeDomain());
  }, [executionsData]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (graphToDisplay !== 'bar') return;

    if (!selectedBarChart) {
      setSelectedBarChart(d3__WEBPACK_IMPORTED_MODULE_2__.select(barRef.current));
    } else {
      if (!barGraph) {
        const graph = selectedBarChart.append('g').attr('transform', `translate(${dimensions.marginLeft},${dimensions.marginTop})`);
        setBarGraph(graph);
      } else {
        //scales
        const y = d3__WEBPACK_IMPORTED_MODULE_2__.scaleLinear().domain([0, 100]).range([graphHeight, 0]);
        const x = d3__WEBPACK_IMPORTED_MODULE_2__.scaleTime().range([0, graphWidth]).domain(getScaleTimeDomain()); //axis

        const xAxis = d3__WEBPACK_IMPORTED_MODULE_2__.axisBottom(x).ticks(executionsData.length > 7 ? 8 : executionsData.length + 1).tickFormat(d3__WEBPACK_IMPORTED_MODULE_2__.timeFormat('%b %d'));
        const yAxis = d3__WEBPACK_IMPORTED_MODULE_2__.axisLeft(y).ticks(4).tickFormat(d => `${d}%`);
        selectedBarChart.select('.xAxis').remove();
        selectedBarChart.select('.yAxis').remove();
        selectedBarChart.append('g').attr('class', 'xAxis').attr('transform', `translate(${dimensions.marginLeft},${graphHeight + dimensions.marginTop})`).call(xAxis).selectAll('text').attr('transform', 'rotate(-40)').attr('text-anchor', 'end').attr('font-size', '10px');
        selectedBarChart.append('g').attr('class', 'yAxis').attr('transform', `translate(${dimensions.marginLeft},${dimensions.marginTop})`).call(yAxis); //update graph (enter,remove and update)

        const rects = barGraph.selectAll('rect').data(executionsData);
        rects.exit().transition().duration(300).attr('height', 0).attr('y', graphHeight).remove();
        const updatedRects = rects.attr('height', 0).attr('y', graphHeight).attr('x', d => showMonth ? x(new Date(d.date)) - 2 : x(new Date(d.date)) - 10).attr('width', showMonth ? 4 : 20).style('cursor', d => d.workout ? 'pointer' : 'default').attr('fill', d => `${d.rate === 100 ? 'var(--primary-color)' : 'var(--text-color)'}`);
        updatedRects.transition().duration(700).delay((_, i) => (i + 1) * 70).ease(d3__WEBPACK_IMPORTED_MODULE_2__.easeElastic).attr('y', d => y(d.rate)).attr('height', d => graphHeight - y(d.rate));
        updatedRects.on('click', (e, d) => {
          setShowModal(true);
          setCurrentWorkout(d.workout);
        });
        const enterRects = rects.enter().append('rect').style('cursor', d => d.workout ? 'pointer' : 'default').attr('fill', d => `${d.rate === 100 ? 'var(--primary-color)' : 'var(--text-color)'}`).attr('x', d => showMonth ? x(new Date(d.date)) - 2 : x(new Date(d.date)) - 10).attr('width', showMonth ? 4 : 20).attr('height', 0).attr('y', graphHeight);
        enterRects.transition().duration(700).delay((_, i) => (i + 1) * 70).ease(d3__WEBPACK_IMPORTED_MODULE_2__.easeElastic).attr('y', d => y(d.rate)).attr('height', d => graphHeight - y(d.rate));
        enterRects.on('click', (e, d) => {
          setShowModal(true);
          setCurrentWorkout(d.workout);
        });
      }
    }
  }, [selectedBarChart, executionsData, barGraph, graphToDisplay]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (graphToDisplay !== 'pie') return;

    if (!selectedPieChart) {
      setSelectedPieChart(d3__WEBPACK_IMPORTED_MODULE_2__.select(pieRef.current));
    } else {
      if (!pieGraph) {
        const graph = selectedPieChart.append('g').attr('transform', `translate(${pieDimensions.radius + 3},${2 * pieDimensions.radius + dimensions.marginTop - 5})`);
        setPieGraph(graph);
      } else {
        const rates = executionsData.map(item => item.rate);
        const dataForPieGraph = [{
          amount: 0,
          name: 'under 25%'
        }, {
          amount: 0,
          name: 'under 50%'
        }, {
          amount: 0,
          name: 'under 75%'
        }, {
          amount: 0,
          name: 'under 100%'
        }, {
          amount: 0,
          name: '100%'
        }];
        rates.forEach(rate => {
          if (rate < 25) {
            dataForPieGraph[0].amount++;
          } else if (rate < 50) {
            dataForPieGraph[1].amount++;
          } else if (rate < 75) {
            dataForPieGraph[2].amount++;
          } else if (rate < 100) {
            dataForPieGraph[3].amount++;
          } else {
            dataForPieGraph[4].amount++;
          }
        });
        const pie = d3__WEBPACK_IMPORTED_MODULE_2__.pie().value(d => d.amount);
        const colorsScale = d3__WEBPACK_IMPORTED_MODULE_2__.scaleOrdinal().domain(['under 25%', 'under 50%', 'under 75%', 'under 100%', '100%']).range(colors); //update graph (enter,remove and update)

        const paths = pieGraph.selectAll('path').data(pie(dataForPieGraph)).attr('stroke', 'black').attr('stroke-width', 1).attr('d', arcPath).attr('fill', d => colorsScale(d.data.name));
        paths.transition().duration(2700).ease(d3__WEBPACK_IMPORTED_MODULE_2__.easeElastic.amplitude(0.5)).attrTween('d', pieTweenEnter);
        paths.exit().transition().duration(450).attrTween('d', pieTweenExit).remove();
        paths.enter().append('path').attr('stroke', 'black').attr('stroke-width', 1).attr('d', arcPath).attr('fill', d => colorsScale(d.data.name)).transition().duration(2700).ease(d3__WEBPACK_IMPORTED_MODULE_2__.easeElastic.amplitude(0.5)).attrTween('d', pieTweenEnter); //legend

        const pieLegend = selectedPieChart.selectAll('.legend').data(pie(dataForPieGraph)).enter().append('g').attr('transform', (_, i) => `translate(${pieDimensions.radius * 2 - 20},${i * 25 + 10})`).attr('class', 'legend');
        pieLegend.append('rect').attr('width', 15).attr('height', 15).attr('fill', d => colorsScale(d.data.name));
        pieLegend.append('text').text(d => d.data.name).style('font-size', 10).style('font-weight', 1).style('stroke', 'var(--text-color)').style('stroke-width', 1).attr('y', 11).attr('x', 20);
      }
    }
  }, [selectedPieChart, executionsData, pieGraph, graphToDisplay]);

  function changeGraphHandler(e) {
    if (!e.target.checked) setGraphToDisplay('bar');
    if (e.target.checked) setGraphToDisplay('pie');
  }

  function getDateForWeek(weeksNumber) {
    const currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() - 7 * weeksNumber));
  }

  async function selectWeekHandler(e) {
    const {
      value
    } = e.target;
    const isMonthSelected = +value === 5;
    isMonthSelected ? setShowMonth(true) : setShowMonth(false);
    setSelectElActive(value !== '');

    try {
      const range = isMonthSelected ? 'month' : 'week';
      const date = isMonthSelected ? (0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_4__.dateToString)(new Date()) : (0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_4__.dateToString)(getDateForWeek(+value));
      const {
        data,
        status
      } = await _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_5__.default.get(`/program-exec/by-range/${range}/${date}`);

      if (status === 204) {
        setExecutionsData(defaultExecutions);
        setHasExecutions(false);
        return;
      }

      setHasExecutions(true);
      setExecutionsData(data.map(item => {
        let execution = {
          date: item.date,
          rate: item.executionRate
        };
        if (item.workoutId) execution.workout = item.workoutId;
        return execution;
      }));
    } catch (err) {
      (0,_utils_errors_handleRequestErrors__WEBPACK_IMPORTED_MODULE_6__.handleAxiosError)(err, dispatch, 'Fetching Executions Failed');
    }
  }

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().ExecutionsGraph),
    children: [showModal && currentWorkout && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_Modal_Modal__WEBPACK_IMPORTED_MODULE_7__.default, {
      onClose: () => setShowModal(false),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DetailedExercise__WEBPACK_IMPORTED_MODULE_8__.default, {
        time: `${Math.floor(currentWorkout.time / 60)}:${String(currentWorkout.time % 60).padStart(2, '0')} (h)`,
        trainingDayName: currentWorkout.trainingDayName,
        workoutName: currentWorkout.name,
        description: currentWorkout.description,
        exercises: currentWorkout.exercises
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 451,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 450,
      columnNumber: 9
    }, undefined), hasExecutions && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      children: [!!executionsData.length && date[0] && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().GraphTitle),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
          children: "Your weekly Executions:"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 466,
          columnNumber: 15
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("time", {
          children: (0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_4__.dateToString)(date[0])
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 467,
          columnNumber: 15
        }, undefined), " to", ' ', /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("time", {
          children: (0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_4__.dateToString)(date[1])
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 468,
          columnNumber: 15
        }, undefined), avg && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: ["Average:", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
            children: [" ", avg]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 472,
            columnNumber: 19
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 470,
          columnNumber: 17
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 465,
        columnNumber: 13
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().Checkbox),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: graphToDisplay === 'bar' ? 'pie' : 'bar'
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 479,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
          className: "Checkbox",
          type: "checkbox",
          id: "changeGraph",
          onChange: changeGraphHandler
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 480,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
          className: "SwitchLabel",
          htmlFor: "changeGraph"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 486,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 478,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 463,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("svg", {
      "data-testid": "bar-chart",
      display: graphToDisplay === 'bar' ? 'block' : 'none',
      height: dimensions.height,
      width: dimensions.width,
      ref: barRef
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 490,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("svg", {
      "data-testid": "pie-chart",
      display: graphToDisplay === 'pie' ? 'block' : 'none',
      height: pieDimensions.height,
      width: pieDimensions.width,
      ref: pieRef
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 497,
      columnNumber: 7
    }, undefined), !hasExecutions && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
      className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().NoExecutions),
      children: "No execution have been declared during this week..."
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 506,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_9___default().Input),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "input-container",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("select", {
          onChange: selectWeekHandler,
          id: "weekSelect",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: "",
            style: {
              display: 'none'
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 513,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: 0,
            children: "this week"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 514,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: 1,
            children: "1 week ago"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 515,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: 2,
            children: "2 weeks ago"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 516,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: 3,
            children: "3 weeks ago"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 517,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: 4,
            children: "4 weeks ago"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 518,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("option", {
            value: 5,
            children: "whole month"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 519,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 512,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
          className: selectElActive ? 'Active' : '',
          htmlFor: "weekSelect",
          children: "Select week"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 521,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 511,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 510,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 448,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (ExecutionsGraph);

/***/ }),

/***/ "./components/home/TomorrowMission.tsx":
/*!*********************************************!*\
  !*** ./components/home/TomorrowMission.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/pages/home.module.scss */ "./styles/pages/home.module.scss");
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _public_icons_plus_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../public/icons/plus-icon.svg */ "./public/icons/plus-icon.svg");
/* harmony import */ var _UI_Modal_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UI/Modal/Modal */ "./components/UI/Modal/Modal.tsx");
/* harmony import */ var _DetailedExercise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DetailedExercise */ "./components/home/DetailedExercise.tsx");


var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\home\\TomorrowMission.tsx";







const TomorrowMission = ({
  trainingDayName,
  exercises,
  time,
  workoutName
}) => {
  const {
    0: showModal,
    1: setShowModal
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const today = new Date();
  const tomorrow = today.getDate() + 1 + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_6___default().TomorrowMission),
    children: [showModal && (exercises === null || exercises === void 0 ? void 0 : exercises.length) && workoutName && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_Modal_Modal__WEBPACK_IMPORTED_MODULE_4__.default, {
      onClose: () => setShowModal(false),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DetailedExercise__WEBPACK_IMPORTED_MODULE_5__.default, {
        exercises: exercises,
        time: tomorrow,
        trainingDayName: trainingDayName,
        workoutName: workoutName
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
      children: "Tomorrow Mission:"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      children: [workoutName ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
            children: "Workout: "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 51,
            columnNumber: 15
          }, undefined), workoutName, " (", trainingDayName, ")"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 13
        }, undefined), time && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
            children: "Time: "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 17
          }, undefined), time, " (minutes)"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 15
        }, undefined)]
      }, void 0, true) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
          children: "Workout: "
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 13
        }, undefined), "Rest Day (X)"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
          children: "Max Points: "
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, undefined), "10"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        children: "(You already did and declared your workout for today)"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, undefined), !!(exercises !== null && exercises !== void 0 && exercises.length) && workoutName && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
      className: "skip-button",
      onClick: () => setShowModal(true),
      children: ["More", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        children: _public_icons_plus_icon_svg__WEBPACK_IMPORTED_MODULE_3__.default && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
          src: _public_icons_plus_icon_svg__WEBPACK_IMPORTED_MODULE_3__.default,
          width: 12.5,
          height: 12.5,
          alt: "plus icon"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 15
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (TomorrowMission);

/***/ }),

/***/ "./components/home/UserScore.tsx":
/*!***************************************!*\
  !*** ./components/home/UserScore.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../.././styles/pages/home.module.scss */ "./styles/pages/home.module.scss");
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _UI_SVGs_title_line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UI/SVGs/title-line */ "./components/UI/SVGs/title-line.tsx");

var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\components\\home\\UserScore.tsx";




const UserScore = ({
  grade
}) => {
  const {
    0: displayedScore,
    1: setDisplayedScore
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.floor(grade * 0.8));
  const {
    0: displayAnimation,
    1: setDisplayAnimation
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (displayedScore >= grade) {
      setDisplayAnimation(true);
      setTimeout(() => {
        setDisplayAnimation(false);
      }, 400);
      return;
    }

    setTimeout(() => {
      setDisplayedScore(prev => ++prev);
    }, 3000 / grade);
  }, [displayedScore]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_3___default().UserScore),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
      children: "Current Score:"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: displayAnimation ? (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_3___default().AnimationStart) : (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_3___default().AnimationEnd),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        children: displayedScore
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_SVGs_title_line__WEBPACK_IMPORTED_MODULE_2__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (UserScore);

/***/ }),

/***/ "./node_modules/next/dist/client/image.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/image.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = Image;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/head */ "../next-server/lib/head"));

var _toBase = __webpack_require__(/*! ../next-server/lib/to-base-64 */ "../next-server/lib/to-base-64");

var _imageConfig = __webpack_require__(/*! ../next-server/server/image-config */ "../next-server/server/image-config");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

if (true) {
  ;
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['default', defaultLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];

function isStaticRequire(src) {
  return src.default !== undefined;
}

function isStaticImageData(src) {
  return src.src !== undefined;
}

function isStaticImport(src) {
  return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}

const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":["localhost"]} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];

    for (let match; match = viewportWidthRe.exec(sizes); match) {
      percentSizes.push(parseInt(match[2]));
    }

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout, sizes);
  const last = widths.length - 1;
  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({
      src,
      quality,
      width: widths[last]
    })
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load((0, _extends2.default)({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
} // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.


function removePlaceholder(img, placeholder) {
  if (placeholder === 'blur' && img) {
    const handleLoad = () => {
      if (!img.src.startsWith('data:')) {
        const p = 'decode' in img ? img.decode() : Promise.resolve();
        p.catch(() => {}).then(() => {
          img.style.filter = 'none';
          img.style.backgroundSize = 'none';
          img.style.backgroundImage = 'none';
        });
      }
    };

    if (img.complete) {
      // If the real image fails to load, this will still remove the placeholder.
      // This is the desired behavior for now, and will be revisited when error
      // handling is worked on for the image component itself.
      handleLoad();
    } else {
      img.onload = handleLoad;
    }
  }
}

function Image(_ref) {
  let {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    loader = defaultImageLoader,
    placeholder = 'empty',
    blurDataURL
  } = _ref,
      all = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "objectFit", "objectPosition", "loader", "placeholder", "blurDataURL"]);
  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';

  if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  let staticSrc = '';

  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
    }

    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;

    if (!layout || layout !== 'fill') {
      height = height || staticImageData.height;
      width = width || staticImageData.width;

      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
      }
    }
  }

  src = typeof src === 'string' ? src : staticSrc;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);

  if (true) {
    if (!src) {
      throw new Error(`Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify({
        width,
        height,
        quality
      })}`);
    }

    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(`Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(String).join(',')}.`);
    }

    if (typeof widthInt !== 'undefined' && isNaN(widthInt) || typeof heightInt !== 'undefined' && isNaN(heightInt)) {
      throw new Error(`Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`);
    }

    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`);
    }

    if (priority && loading === 'lazy') {
      throw new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`);
    }

    if (placeholder === 'blur') {
      if (layout !== 'fill' && (widthInt || 0) * (heightInt || 0) < 1600) {
        console.warn(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`);
      }

      if (!blurDataURL) {
        const VALID_BLUR_EXT = ['jpeg', 'png', 'webp']; // should match next-image-loader

        throw new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`);
      }
    }
  }

  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src && src.startsWith('data:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  const [setRef, isIntersected] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px',
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = (0, _extends2.default)({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  }, placeholder === 'blur' ? {
    filter: 'blur(20px)',
    backgroundSize: 'cover',
    backgroundImage: `url("${blurDataURL}")`
  } : undefined);

  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && layout !== 'fill') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else {
    // <Image src="i.png" />
    if (true) {
      throw new Error(`Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`);
    }
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    role: "presentation",
    src: `data:image/svg+xml;base64,${(0, _toBase.toBase64)(sizerSvg)}`
  }) : null) : null, !isVisible && /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
    src,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes,
    loader
  }), {
    decoding: "async",
    style: imgStyle,
    className: className
  }))), /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    className: className,
    ref: element => {
      setRef(element);
      removePlaceholder(element, placeholder);
    },
    style: imgStyle
  })), priority ?
  /*#__PURE__*/
  // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src // @ts-ignore: imagesrcset is not yet in the link element type
    ,
    imagesrcset: imgAttributes.srcSet // @ts-ignore: imagesizes is not yet in the link element type
    ,
    imagesizes: imgAttributes.sizes
  })) : null);
} //BUILT IN LOADERS


function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width];
  let paramsString = '';

  if (quality) {
    params.push('q=' + quality);
  }

  if (params.length) {
    paramsString = '?' + params.join('&');
  }

  return `${root}${normalizeSrc(src)}${paramsString}`;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (true) {
    const missingValues = []; // these should always be provided but make sure they are

    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');

    if (missingValues.length > 0) {
      throw new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
        src,
        width,
        quality
      })}`);
    }

    if (src.startsWith('//')) {
      throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc;

      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
      }

      if (!configDomains.includes(parsedSrc.hostname)) {
        throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`);
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/pages/home.module.scss */ "./styles/pages/home.module.scss");
/* harmony import */ var _styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_home_DailyMission__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/home/DailyMission */ "./components/home/DailyMission.tsx");
/* harmony import */ var _components_home_ExecutionsGraph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/home/ExecutionsGraph */ "./components/home/ExecutionsGraph.tsx");
/* harmony import */ var _components_home_TomorrowMission__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/home/TomorrowMission */ "./components/home/TomorrowMission.tsx");
/* harmony import */ var _components_home_UserScore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/home/UserScore */ "./components/home/UserScore.tsx");
/* harmony import */ var _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/axios/axiosInstance */ "./utils/axios/axiosInstance.tsx");
/* harmony import */ var _utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/dates/dateToString */ "./utils/dates/dateToString.tsx");
/* harmony import */ var _utils_protectedRoutes_protectedRoutes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/protectedRoutes/protectedRoutes */ "./utils/protectedRoutes/protectedRoutes.tsx");
/* harmony import */ var _utils_axios_getHeaders__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/axios/getHeaders */ "./utils/axios/getHeaders.tsx");


var _jsxFileName = "D:\\Programming\\CV\\Hlife\\frontend\\pages\\index.tsx";











const Home = ({
  grade,
  workoutName,
  time,
  exercises,
  trainingDayName,
  executionDeclared,
  weeklyExecutions
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("title", {
        children: "Home"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
        name: "description",
        content: "Displaying program executions in a graph"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_UserScore__WEBPACK_IMPORTED_MODULE_5__.default, {
      grade: grade
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
      className: (_styles_pages_home_module_scss__WEBPACK_IMPORTED_MODULE_10___default().ExecutionSection),
      children: [!executionDeclared ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_DailyMission__WEBPACK_IMPORTED_MODULE_2__.default, {
        trainingDayName: trainingDayName,
        workoutName: workoutName,
        time: time,
        exercises: exercises
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_TomorrowMission__WEBPACK_IMPORTED_MODULE_4__.default, {
        workoutName: workoutName,
        trainingDayName: trainingDayName,
        exercises: exercises,
        time: time
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_home_ExecutionsGraph__WEBPACK_IMPORTED_MODULE_3__.default, {
        weeklyExecutions: weeklyExecutions
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ __webpack_exports__["default"] = (Home);
const getServerSideProps = async ctx => {
  const {
    destination,
    grade
  } = await (0,_utils_protectedRoutes_protectedRoutes__WEBPACK_IMPORTED_MODULE_8__.default)(ctx);

  if (destination === '/') {
    try {
      const headers = (0,_utils_axios_getHeaders__WEBPACK_IMPORTED_MODULE_9__.getHeaders)(ctx);
      const props = {
        grade,
        trainingDayName: 'X',
        executionDeclared: false,
        time: null,
        weeklyExecutions: []
      };

      const mutateProps = async (url, executionDeclared) => {
        const {
          data
        } = await _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__.default.get(url, {
          headers
        });
        const {
          exercises,
          name,
          trainingDayName,
          time
        } = data;

        if (name && trainingDayName) {
          props.workoutName = name;
          props.trainingDayName = trainingDayName;
          props.time = time || null;
          props.exercises = exercises;
        }

        props.executionDeclared = executionDeclared;
      }; // if status = 200 execution already declared and taking data for tomorrow mission
      // else execution is not declared yet so taking data for today mission


      try {
        await _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__.default.get(`/program-exec/${(0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_7__.dateToString)(new Date())}`, {
          headers
        });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await mutateProps(`/program-exec/exercises-to-do/${(0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_7__.dateToString)(tomorrow)}`, true);
      } catch {
        await mutateProps('/program-exec/exercises-to-do/', false);
      } finally {
        const {
          data,
          status
        } = await _utils_axios_axiosInstance__WEBPACK_IMPORTED_MODULE_6__.default.get(`/program-exec/by-range/week/${(0,_utils_dates_dateToString__WEBPACK_IMPORTED_MODULE_7__.dateToString)(new Date())}`, {
          headers
        });

        if (status === 204) {
          props.weeklyExecutions = [];
        } else if (status === 200) {
          let weeklyExecutions = data.map(item => {
            let execution = {
              date: item.date,
              rate: item.executionRate
            };
            if (item.workoutId) execution.workout = item.workoutId;
            return execution;
          });
          props.weeklyExecutions = weeklyExecutions;
        }
      }

      return {
        props
      };
    } catch (err) {
      return {
        redirect: {
          destination: '/error-occur',
          permanent: false
        }
      };
    }
  } else {
    return {
      redirect: {
        destination,
        permanent: false
      }
    };
  }
};

/***/ }),

/***/ "./redux/slices/errors/errorsSlice.tsx":
/*!*********************************************!*\
  !*** ./redux/slices/errors/errorsSlice.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "errorsActions": function() { return /* binding */ errorsActions; }
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "@reduxjs/toolkit");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  newError: false,
  errorTitle: "",
  errorMessage: "",
  errorStatusCode: ""
};
const errorSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "errors",
  initialState,
  reducers: {
    newError(state, {
      payload
    }) {
      state.newError = true;
      state.errorTitle = payload.errorTitle;
      state.errorMessage = payload.errorMessage;
      state.errorStatusCode = payload.errorStatusCode || null;
    },

    errorConfirmed(state) {
      state.newError = false;
      state.errorTitle = "";
      state.errorMessage = "";
      state.errorStatusCode = "";
    }

  }
});
const errorsActions = errorSlice.actions;
/* harmony default export */ __webpack_exports__["default"] = (errorSlice.reducer);

/***/ }),

/***/ "./redux/slices/loading/loadingSlice.tsx":
/*!***********************************************!*\
  !*** ./redux/slices/loading/loadingSlice.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadingAction": function() { return /* binding */ loadingAction; }
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "@reduxjs/toolkit");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  loading: false
};
const loadingSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: 'loadingSlice',
  initialState,
  reducers: {
    setToTrue(state) {
      state.loading = true;
    },

    setToFalse(state) {
      state.loading = false;
    }

  }
});
/* harmony default export */ __webpack_exports__["default"] = (loadingSlice.reducer);
const loadingAction = loadingSlice.actions;

/***/ }),

/***/ "./redux/slices/messages/messagesSlice.tsx":
/*!*************************************************!*\
  !*** ./redux/slices/messages/messagesSlice.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "messagesActions": function() { return /* binding */ messagesActions; }
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "@reduxjs/toolkit");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  newMessage: false,
  messageTitle: "",
  message: ""
};
const messageSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "messages",
  initialState,
  reducers: {
    newMessage(state, {
      payload
    }) {
      state.newMessage = true;
      state.messageTitle = payload.messageTitle;
      state.message = payload.message;
    },

    messageConfirmed(state) {
      state.newMessage = false;
      state.messageTitle = "";
      state.message = "";
    }

  }
});
/* harmony default export */ __webpack_exports__["default"] = (messageSlice.reducer);
const messagesActions = messageSlice.actions;

/***/ }),

/***/ "./utils/axios/axiosInstance.tsx":
/*!***************************************!*\
  !*** ./utils/axios/axiosInstance.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const baseURL = "http://localhost:8080";
const axiosInstance = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
  baseURL,
  withCredentials: true
});
/* harmony default export */ __webpack_exports__["default"] = (axiosInstance);

/***/ }),

/***/ "./utils/axios/getHeaders.tsx":
/*!************************************!*\
  !*** ./utils/axios/getHeaders.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHeaders": function() { return /* binding */ getHeaders; }
/* harmony export */ });
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nookies */ "nookies");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_0__);

const getHeaders = ctx => {
  const cookies = (0,nookies__WEBPACK_IMPORTED_MODULE_0__.parseCookies)(ctx);
  return {
    Cookie: `_csrf=${cookies._csrf}; jon=${cookies.jon}; XSRF-TOKEN=${cookies['XSRF_TOKEN']};`
  };
};

/***/ }),

/***/ "./utils/dates/dateToString.tsx":
/*!**************************************!*\
  !*** ./utils/dates/dateToString.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateToString": function() { return /* binding */ dateToString; }
/* harmony export */ });
const dateToString = date => {
  try {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  } catch (err) {
    throw err;
  }
};

/***/ }),

/***/ "./utils/errors/handleRequestErrors.tsx":
/*!**********************************************!*\
  !*** ./utils/errors/handleRequestErrors.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleAxiosError": function() { return /* binding */ handleAxiosError; }
/* harmony export */ });
/* harmony import */ var _redux_slices_errors_errorsSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../redux/slices/errors/errorsSlice */ "./redux/slices/errors/errorsSlice.tsx");
/* harmony import */ var _redux_slices_loading_loadingSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../redux/slices/loading/loadingSlice */ "./redux/slices/loading/loadingSlice.tsx");


const handleAxiosError = (err, dispatch, errorTitle) => {
  dispatch(_redux_slices_loading_loadingSlice__WEBPACK_IMPORTED_MODULE_1__.loadingAction.setToFalse());
  const {
    status
  } = err.response;
  let errorMessage = '';

  if (status === 422) {
    errorMessage = err.response.data.data[0].msg;
  } else if (status === 403) {
    errorMessage = err.response.data;
  }

  dispatch(_redux_slices_errors_errorsSlice__WEBPACK_IMPORTED_MODULE_0__.errorsActions.newError({
    errorTitle,
    errorMessage
  }));
};

/***/ }),

/***/ "./utils/protectedRoutes/protectedRoutes.tsx":
/*!***************************************************!*\
  !*** ./utils/protectedRoutes/protectedRoutes.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nookies */ "nookies");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _axios_axiosInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../axios/axiosInstance */ "./utils/axios/axiosInstance.tsx");



const protectRouteHandler = async ctx => {
  try {
    const cookies = (0,nookies__WEBPACK_IMPORTED_MODULE_0__.parseCookies)(ctx);
    const {
      data
    } = await _axios_axiosInstance__WEBPACK_IMPORTED_MODULE_1__.default.get('/auth/isUser', {
      headers: {
        Cookie: `_csrf=${cookies._csrf}; jon=${cookies.jon}; XSRF-TOKEN=${cookies['XSRF_TOKEN']};`
      }
    });
    const {
      isAuthenticated,
      hasProgram,
      hasInitialStats,
      hasGoals,
      hasAllWorkouts,
      grade
    } = data;
    const returnValue = {
      destination: '/auth/login',
      grade: null
    }; // case cookie deleted

    if (hasProgram) {
      return {
        destination: '/',
        grade
      };
    }

    if (!isAuthenticated) {
      returnValue.destination = '/auth/login';
    } else if (!hasGoals) {
      returnValue.destination = '/auth/registration/set-goals';
    } else if (!hasInitialStats) {
      returnValue.destination = '/auth/registration/set-initial-stats';
    } else if (!cookies.choseWorkout) {
      returnValue.destination = '/auth/registration/choose-workout';
    } else if (!hasAllWorkouts) {
      returnValue.destination = '/auth/registration/create-workout';
    } else if (!hasProgram) {
      returnValue.destination = '/auth/registration/schedule-program';
    } else {
      returnValue.destination = '/';
    }

    return returnValue;
  } catch (err) {
    return {
      destination: '/auth/login',
      grade: null
    };
  }
};

/* harmony default export */ __webpack_exports__["default"] = (protectRouteHandler);

/***/ }),

/***/ "./public/icons/plus-icon.svg":
/*!************************************!*\
  !*** ./public/icons/plus-icon.svg ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"src":"/_next/static/image/public/icons/plus-icon.18e46bbfa44de388026c38f00afdd67b.svg","height":24,"width":24});

/***/ }),

/***/ "./styles/components/Backdrop.module.scss":
/*!************************************************!*\
  !*** ./styles/components/Backdrop.module.scss ***!
  \************************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"backdrop": "Backdrop_backdrop__26BnV",
	"fade-in": "Backdrop_fade-in__1ss0z"
};


/***/ }),

/***/ "./styles/components/Modal.module.scss":
/*!*********************************************!*\
  !*** ./styles/components/Modal.module.scss ***!
  \*********************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"modal": "Modal_modal__20krN",
	"slide-down": "Modal_slide-down__1Khlo"
};


/***/ }),

/***/ "./styles/pages/home.module.scss":
/*!***************************************!*\
  !*** ./styles/pages/home.module.scss ***!
  \***************************************/
/***/ (function(module) {

// Exports
module.exports = {
	"UserScore": "home_UserScore__smGlG",
	"AnimationStart": "home_AnimationStart__U6X_l",
	"AnimationEnd": "home_AnimationEnd__21YCd",
	"ExecutionSection": "home_ExecutionSection__SYa7S",
	"DailyMission": "home_DailyMission__1Lx3l",
	"TomorrowMission": "home_TomorrowMission__maW70",
	"DailyMissionModal": "home_DailyMissionModal__3lkfi",
	"TomorrowMissionModal": "home_TomorrowMissionModal__1KCby",
	"Form": "home_Form__37sNE",
	"Exercise": "home_Exercise__1u8z3",
	"ModalTitle": "home_ModalTitle__1VAeM",
	"GraphTitle": "home_GraphTitle__P2QiP",
	"Checkbox": "home_Checkbox__1t_-s",
	"NoExecutions": "home_NoExecutions__3JuHL",
	"Input": "home_Input__1xyII",
	"ExecutionsGraph": "home_ExecutionsGraph__1V1yY"
};


/***/ }),

/***/ "./node_modules/next/image.js":
/*!************************************!*\
  !*** ./node_modules/next/image.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/image */ "./node_modules/next/dist/client/image.js")


/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = require("@reduxjs/toolkit");;

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/***/ (function(module) {

"use strict";
module.exports = require("d3");;

/***/ }),

/***/ "../next-server/lib/head":
/*!****************************************************!*\
  !*** external "next/dist/next-server/lib/head.js" ***!
  \****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head.js");;

/***/ }),

/***/ "../next-server/lib/to-base-64":
/*!**********************************************************!*\
  !*** external "next/dist/next-server/lib/to-base-64.js" ***!
  \**********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/to-base-64.js");;

/***/ }),

/***/ "../next-server/server/image-config":
/*!***************************************************************!*\
  !*** external "next/dist/next-server/server/image-config.js" ***!
  \***************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/image-config.js");;

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = require("nookies");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-dom");;

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-redux");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL2Zyb250ZW5kLy4vY29tcG9uZW50cy9VSS9CYWNrZHJvcC9CYWNrZHJvcC50c3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9jb21wb25lbnRzL1VJL01vZGFsL01vZGFsLnRzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvVUkvU1ZHcy90aXRsZS1saW5lLnRzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvaG9tZS9EYWlseU1pc3Npb24udHN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vY29tcG9uZW50cy9ob21lL0RldGFpbGVkRXhlcmNpc2UudHN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vY29tcG9uZW50cy9ob21lL0V4ZWN1dGlvbnNHcmFwaC50c3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9jb21wb25lbnRzL2hvbWUvVG9tb3Jyb3dNaXNzaW9uLnRzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvaG9tZS9Vc2VyU2NvcmUudHN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLmpzIiwid2VicGFjazovL2Zyb250ZW5kLy4vcGFnZXMvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vcmVkdXgvc2xpY2VzL2Vycm9ycy9lcnJvcnNTbGljZS50c3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9yZWR1eC9zbGljZXMvbG9hZGluZy9sb2FkaW5nU2xpY2UudHN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vcmVkdXgvc2xpY2VzL21lc3NhZ2VzL21lc3NhZ2VzU2xpY2UudHN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vdXRpbHMvYXhpb3MvYXhpb3NJbnN0YW5jZS50c3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi91dGlscy9heGlvcy9nZXRIZWFkZXJzLnRzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3V0aWxzL2RhdGVzL2RhdGVUb1N0cmluZy50c3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi91dGlscy9lcnJvcnMvaGFuZGxlUmVxdWVzdEVycm9ycy50c3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi91dGlscy9wcm90ZWN0ZWRSb3V0ZXMvcHJvdGVjdGVkUm91dGVzLnRzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3B1YmxpYy9pY29ucy9wbHVzLWljb24uc3ZnIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3R5bGVzL2NvbXBvbmVudHMvQmFja2Ryb3AubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zdHlsZXMvY29tcG9uZW50cy9Nb2RhbC5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3N0eWxlcy9wYWdlcy9ob21lLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2Zyb250ZW5kLy4vbm9kZV9tb2R1bGVzL25leHQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvZXh0ZXJuYWwgXCJAcmVkdXhqcy90b29sa2l0XCIiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwiZDNcIiIsIndlYnBhY2s6Ly9mcm9udGVuZC9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvaGVhZC5qc1wiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi90by1iYXNlLTY0LmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL2ltYWdlLWNvbmZpZy5qc1wiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwibmV4dC9oZWFkXCIiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwibm9va2llc1wiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9mcm9udGVuZC9leHRlcm5hbCBcInJlYWN0LWRvbVwiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly9mcm9udGVuZC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIl0sIm5hbWVzIjpbIkJhY2tkcm9wIiwicHJvcHMiLCJiYWNrZ3JvdW5kIiwiY2xhc3NlcyIsIm9uQ2xvc2UiLCJNb2RhbE92ZXJsYXkiLCJjaGlsZHJlbiIsInlQb3NpdGlvbiIsInRvcCIsIk1vZGFsIiwiUmVhY3REb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiTGluZSIsIkRhaWx5TWlzc2lvbiIsInRyYWluaW5nRGF5TmFtZSIsImV4ZXJjaXNlcyIsInRpbWUiLCJ3b3Jrb3V0TmFtZSIsImRpc3BhdGNoIiwidXNlRGlzcGF0Y2giLCJzaG93TW9kYWwiLCJzZXRTaG93TW9kYWwiLCJ1c2VTdGF0ZSIsImNvbXBsZXRlZEV4ZXJjaXNlcyIsInNldENvbXBsZXRlZEV4ZXJjaXNlcyIsInJlZHVjZSIsInByZXYiLCJjdXJyIiwibmFtZSIsInRvZGF5IiwiRGF0ZSIsImRhdGUiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImNvbXBsZXRlQnRuQ2xpY2tlZEhhbmRsZXIiLCJsb2FkaW5nQWN0aW9uIiwiZGF0YSIsImF4aW9zSW5zdGFuY2UiLCJpc0Flcm9iaWMiLCJtZXNzYWdlc0FjdGlvbnMiLCJtZXNzYWdlVGl0bGUiLCJtZXNzYWdlIiwicm91dGVyIiwiZXJyIiwiaGFuZGxlQXhpb3NFcnJvciIsImlucHV0Q2hhbmdlSGFuZGxlciIsImUiLCJpZCIsImNoZWNrZWQiLCJ0YXJnZXQiLCJzdWJtaXRGb3JtSGFuZGxlciIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibWFwIiwiZXhlcmNpc2UiLCJpIiwiZGVzY3JpcHRpb24iLCJyZXBzIiwic2V0cyIsIm11c2NsZXMiLCJqb2luIiwiRGV0YWlsZWRFeGVyY2lzZSIsImNvbG9ycyIsImRlZmF1bHRFeGVjdXRpb25zIiwicmF0ZSIsIkV4ZWN1dGlvbnNHcmFwaCIsIndlZWtseUV4ZWN1dGlvbnMiLCJ1cGRhdGVkRGF0YSIsImV4ZWN1dGlvbnNEYXRhIiwic2V0RXhlY3V0aW9uc0RhdGEiLCJoYXNFeGVjdXRpb25zIiwic2V0SGFzRXhlY3V0aW9ucyIsInNlbGVjdEVsQWN0aXZlIiwic2V0U2VsZWN0RWxBY3RpdmUiLCJncmFwaFRvRGlzcGxheSIsInNldEdyYXBoVG9EaXNwbGF5Iiwic2hvd01vbnRoIiwic2V0U2hvd01vbnRoIiwiY3VycmVudFdvcmtvdXQiLCJzZXRDdXJyZW50V29ya291dCIsImRpbWVuc2lvbnMiLCJoZWlnaHQiLCJ3aWR0aCIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkJvdHRvbSIsInBpZURpbWVuc2lvbnMiLCJyYWRpdXMiLCJncmFwaFdpZHRoIiwiZ3JhcGhIZWlnaHQiLCJiYXJSZWYiLCJ1c2VSZWYiLCJwaWVSZWYiLCJzZXREYXRlIiwiZ2V0U2NhbGVUaW1lRG9tYWluIiwic2VsZWN0ZWRCYXJDaGFydCIsInNldFNlbGVjdGVkQmFyQ2hhcnQiLCJzZWxlY3RlZFBpZUNoYXJ0Iiwic2V0U2VsZWN0ZWRQaWVDaGFydCIsImJhckdyYXBoIiwic2V0QmFyR3JhcGgiLCJwaWVHcmFwaCIsInNldFBpZUdyYXBoIiwiYXZnIiwic2V0QXZnIiwiZG9tYWluIiwiZDMiLCJpdGVtIiwiZGF0ZTIiLCJhcmNQYXRoIiwib3V0ZXJSYWRpdXMiLCJpbm5lclJhZGl1cyIsInBpZVR3ZWVuRW50ZXIiLCJkIiwiZW5kQW5nbGUiLCJzdGFydEFuZ2xlIiwidCIsInBpZVR3ZWVuRXhpdCIsInVzZUVmZmVjdCIsInN0eWxlIiwidG9GaXhlZCIsImN1cnJlbnQiLCJncmFwaCIsImFwcGVuZCIsImF0dHIiLCJ5IiwicmFuZ2UiLCJ4IiwieEF4aXMiLCJ0aWNrcyIsInRpY2tGb3JtYXQiLCJ5QXhpcyIsInNlbGVjdCIsInJlbW92ZSIsImNhbGwiLCJzZWxlY3RBbGwiLCJyZWN0cyIsImV4aXQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJ1cGRhdGVkUmVjdHMiLCJ3b3Jrb3V0IiwiZGVsYXkiLCJfIiwiZWFzZSIsIm9uIiwiZW50ZXJSZWN0cyIsImVudGVyIiwicmF0ZXMiLCJkYXRhRm9yUGllR3JhcGgiLCJhbW91bnQiLCJmb3JFYWNoIiwicGllIiwidmFsdWUiLCJjb2xvcnNTY2FsZSIsInBhdGhzIiwiYXR0clR3ZWVuIiwicGllTGVnZW5kIiwidGV4dCIsImNoYW5nZUdyYXBoSGFuZGxlciIsImdldERhdGVGb3JXZWVrIiwid2Vla3NOdW1iZXIiLCJjdXJyZW50RGF0ZSIsInNlbGVjdFdlZWtIYW5kbGVyIiwiaXNNb250aFNlbGVjdGVkIiwiZGF0ZVRvU3RyaW5nIiwic3RhdHVzIiwiZXhlY3V0aW9uIiwiZXhlY3V0aW9uUmF0ZSIsIndvcmtvdXRJZCIsIk1hdGgiLCJmbG9vciIsIlN0cmluZyIsInBhZFN0YXJ0IiwiZGlzcGxheSIsIlRvbW9ycm93TWlzc2lvbiIsInRvbW9ycm93IiwicGx1c0ljb24iLCJVc2VyU2NvcmUiLCJncmFkZSIsImRpc3BsYXllZFNjb3JlIiwic2V0RGlzcGxheWVkU2NvcmUiLCJkaXNwbGF5QW5pbWF0aW9uIiwic2V0RGlzcGxheUFuaW1hdGlvbiIsInNldFRpbWVvdXQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImV4cG9ydHMiLCJJbWFnZSIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMiIsIl9leHRlbmRzMiIsIl9yZWFjdCIsIl9oZWFkIiwiX3RvQmFzZSIsIl9pbWFnZUNvbmZpZyIsIl91c2VJbnRlcnNlY3Rpb24iLCJnbG9iYWwiLCJfX05FWFRfSU1BR0VfSU1QT1JURUQiLCJWQUxJRF9MT0FESU5HX1ZBTFVFUyIsInVuZGVmaW5lZCIsImxvYWRlcnMiLCJNYXAiLCJpbWdpeExvYWRlciIsImNsb3VkaW5hcnlMb2FkZXIiLCJha2FtYWlMb2FkZXIiLCJkZWZhdWx0TG9hZGVyIiwiVkFMSURfTEFZT1VUX1ZBTFVFUyIsImlzU3RhdGljUmVxdWlyZSIsInNyYyIsImRlZmF1bHQiLCJpc1N0YXRpY0ltYWdlRGF0YSIsImlzU3RhdGljSW1wb3J0IiwiZGV2aWNlU2l6ZXMiLCJjb25maWdEZXZpY2VTaXplcyIsImltYWdlU2l6ZXMiLCJjb25maWdJbWFnZVNpemVzIiwibG9hZGVyIiwiY29uZmlnTG9hZGVyIiwicGF0aCIsImNvbmZpZ1BhdGgiLCJkb21haW5zIiwiY29uZmlnRG9tYWlucyIsInByb2Nlc3MiLCJpbWFnZUNvbmZpZ0RlZmF1bHQiLCJhbGxTaXplcyIsInNvcnQiLCJhIiwiYiIsImdldFdpZHRocyIsImxheW91dCIsInNpemVzIiwidmlld3BvcnRXaWR0aFJlIiwicGVyY2VudFNpemVzIiwibWF0Y2giLCJleGVjIiwicHVzaCIsInBhcnNlSW50Iiwic21hbGxlc3RSYXRpbyIsIm1pbiIsIndpZHRocyIsImZpbHRlciIsInMiLCJraW5kIiwiU2V0IiwidyIsImZpbmQiLCJwIiwiZ2VuZXJhdGVJbWdBdHRycyIsInVub3B0aW1pemVkIiwicXVhbGl0eSIsInNyY1NldCIsImxhc3QiLCJnZXRJbnQiLCJkZWZhdWx0SW1hZ2VMb2FkZXIiLCJsb2FkZXJQcm9wcyIsImxvYWQiLCJnZXQiLCJyb290IiwiRXJyb3IiLCJWQUxJRF9MT0FERVJTIiwicmVtb3ZlUGxhY2Vob2xkZXIiLCJpbWciLCJwbGFjZWhvbGRlciIsImhhbmRsZUxvYWQiLCJzdGFydHNXaXRoIiwiZGVjb2RlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjYXRjaCIsInRoZW4iLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRJbWFnZSIsImNvbXBsZXRlIiwib25sb2FkIiwiX3JlZiIsInByaW9yaXR5IiwibG9hZGluZyIsImNsYXNzTmFtZSIsIm9iamVjdEZpdCIsIm9iamVjdFBvc2l0aW9uIiwiYmx1ckRhdGFVUkwiLCJhbGwiLCJyZXN0Iiwic3RhdGljU3JjIiwic3RhdGljSW1hZ2VEYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIndpZHRoSW50IiwiaGVpZ2h0SW50IiwicXVhbGl0eUludCIsImluY2x1ZGVzIiwiaXNOYU4iLCJjb25zb2xlIiwid2FybiIsIlZBTElEX0JMVVJfRVhUIiwiaXNMYXp5Iiwic2V0UmVmIiwiaXNJbnRlcnNlY3RlZCIsInVzZUludGVyc2VjdGlvbiIsInJvb3RNYXJnaW4iLCJkaXNhYmxlZCIsImlzVmlzaWJsZSIsIndyYXBwZXJTdHlsZSIsInNpemVyU3R5bGUiLCJzaXplclN2ZyIsImltZ1N0eWxlIiwicG9zaXRpb24iLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJib3hTaXppbmciLCJwYWRkaW5nIiwiYm9yZGVyIiwibWFyZ2luIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsInF1b3RpZW50IiwicGFkZGluZ1RvcCIsIm92ZXJmbG93IiwiaW1nQXR0cmlidXRlcyIsImNyZWF0ZUVsZW1lbnQiLCJhbHQiLCJyb2xlIiwidG9CYXNlNjQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWNvZGluZyIsInJlZiIsImVsZW1lbnQiLCJrZXkiLCJyZWwiLCJhcyIsImhyZWYiLCJpbWFnZXNyY3NldCIsImltYWdlc2l6ZXMiLCJub3JtYWxpemVTcmMiLCJzbGljZSIsInBhcmFtcyIsInBhcmFtc1N0cmluZyIsIm1pc3NpbmdWYWx1ZXMiLCJwYXJzZWRTcmMiLCJVUkwiLCJlcnJvciIsImhvc3RuYW1lIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNlbGYiLCJjYiIsInN0YXJ0Iiwibm93IiwiZGlkVGltZW91dCIsInRpbWVSZW1haW5pbmciLCJtYXgiLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJjbGVhclRpbWVvdXQiLCJfcmVxdWVzdElkbGVDYWxsYmFjayIsImhhc0ludGVyc2VjdGlvbk9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJpc0Rpc2FibGVkIiwidW5vYnNlcnZlIiwidmlzaWJsZSIsInNldFZpc2libGUiLCJ1c2VDYWxsYmFjayIsImVsIiwidGFnTmFtZSIsIm9ic2VydmUiLCJpZGxlQ2FsbGJhY2siLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJvYnNlcnZlciIsImVsZW1lbnRzIiwiY3JlYXRlT2JzZXJ2ZXIiLCJzZXQiLCJkZWxldGUiLCJzaXplIiwiZGlzY29ubmVjdCIsIm9ic2VydmVycyIsImluc3RhbmNlIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJpbnRlcnNlY3Rpb25SYXRpbyIsIkhvbWUiLCJleGVjdXRpb25EZWNsYXJlZCIsImdldFNlcnZlclNpZGVQcm9wcyIsImN0eCIsImRlc3RpbmF0aW9uIiwicHJvdGVjdFJvdXRlSGFuZGxlciIsImhlYWRlcnMiLCJnZXRIZWFkZXJzIiwibXV0YXRlUHJvcHMiLCJ1cmwiLCJyZWRpcmVjdCIsInBlcm1hbmVudCIsImluaXRpYWxTdGF0ZSIsIm5ld0Vycm9yIiwiZXJyb3JUaXRsZSIsImVycm9yTWVzc2FnZSIsImVycm9yU3RhdHVzQ29kZSIsImVycm9yU2xpY2UiLCJjcmVhdGVTbGljZSIsInJlZHVjZXJzIiwic3RhdGUiLCJwYXlsb2FkIiwiZXJyb3JDb25maXJtZWQiLCJlcnJvcnNBY3Rpb25zIiwiYWN0aW9ucyIsInJlZHVjZXIiLCJsb2FkaW5nU2xpY2UiLCJzZXRUb1RydWUiLCJzZXRUb0ZhbHNlIiwibmV3TWVzc2FnZSIsIm1lc3NhZ2VTbGljZSIsIm1lc3NhZ2VDb25maXJtZWQiLCJiYXNlVVJMIiwiQXhpb3MiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb29raWVzIiwicGFyc2VDb29raWVzIiwiQ29va2llIiwiX2NzcmYiLCJqb24iLCJkZCIsIm1tIiwieXl5eSIsInJlc3BvbnNlIiwibXNnIiwiaXNBdXRoZW50aWNhdGVkIiwiaGFzUHJvZ3JhbSIsImhhc0luaXRpYWxTdGF0cyIsImhhc0dvYWxzIiwiaGFzQWxsV29ya291dHMiLCJyZXR1cm5WYWx1ZSIsImNob3NlV29ya291dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDOzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLHVCQUF1QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTs7QUFJQSxNQUFNQSxRQUFRLEdBQUlDLEtBQUQsSUFBMEI7QUFDekMsc0JBQU87QUFBSyxTQUFLLEVBQUU7QUFBQ0MsZ0JBQVUsRUFBQ0QsS0FBSyxDQUFDQyxVQUFOLElBQW9CO0FBQWhDLEtBQVo7QUFBaUQsYUFBUyxFQUFFQyx5RkFBNUQ7QUFBOEUsV0FBTyxFQUFFLE1BQU1GLEtBQUssQ0FBQ0csT0FBTjtBQUE3RjtBQUFBO0FB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QUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xCQSwyR0FBK0M7Ozs7Ozs7Ozs7OztBQ0EvQyw4Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxnQzs7Ozs7Ozs7Ozs7QUNBQSwrRDs7Ozs7Ozs7Ozs7QUNBQSxxRTs7Ozs7Ozs7Ozs7QUNBQSwwRTs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxtRCIsImZpbGUiOiJwYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kczsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsImltcG9ydCBjbGFzc2VzIGZyb20gXCIuLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9CYWNrZHJvcC5tb2R1bGUuc2Nzc1wiO1xyXG5cclxudHlwZSBCYWNrZHJvcFByb3BzID0geyBvbkNsb3NlOiBGdW5jdGlvbjsgYmFja2dyb3VuZD86IHN0cmluZyB9O1xyXG5cclxuY29uc3QgQmFja2Ryb3AgPSAocHJvcHM6IEJhY2tkcm9wUHJvcHMpID0+IHtcclxuICByZXR1cm4gPGRpdiBzdHlsZT17e2JhY2tncm91bmQ6cHJvcHMuYmFja2dyb3VuZCB8fCAnJ319IGNsYXNzTmFtZT17Y2xhc3Nlcy5iYWNrZHJvcH0gb25DbGljaz17KCkgPT4gcHJvcHMub25DbG9zZSgpfSAvPjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tkcm9wO1xyXG4iLCJpbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3REb20gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4uL0JhY2tkcm9wL0JhY2tkcm9wJztcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4uLy4uLy4uL3N0eWxlcy9jb21wb25lbnRzL01vZGFsLm1vZHVsZS5zY3NzJztcblxudHlwZSBCYWNrZHJvcFByb3BzID0geyBvbkNsb3NlOiBGdW5jdGlvbiB9O1xudHlwZSBNb2RhbE92ZXJsYXlQcm9wcyA9IHsgeVBvc2l0aW9uPzogc3RyaW5nIH07XG50eXBlIE1vZGFsUHJvcHMgPSBCYWNrZHJvcFByb3BzICYgTW9kYWxPdmVybGF5UHJvcHM7XG5cbmNvbnN0IE1vZGFsT3ZlcmxheTogUmVhY3QuRkM8TW9kYWxPdmVybGF5UHJvcHM+ID0gKHsgY2hpbGRyZW4sIHlQb3NpdGlvbiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMubW9kYWx9IHN0eWxlPXt7IHRvcDogeVBvc2l0aW9uIH19PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuY29udGVudH0+e2NoaWxkcmVufTwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgTW9kYWw6IFJlYWN0LkZDPE1vZGFsUHJvcHM+ID0gKHsgY2hpbGRyZW4sIHlQb3NpdGlvbiwgb25DbG9zZSB9KSA9PiB7XG4gIHJldHVybiBSZWFjdERvbS5jcmVhdGVQb3J0YWwoXG4gICAgPD5cbiAgICAgIDxCYWNrZHJvcCBvbkNsb3NlPXtvbkNsb3NlfSAvPlxuICAgICAgPE1vZGFsT3ZlcmxheSB5UG9zaXRpb249e3lQb3NpdGlvbn0+e2NoaWxkcmVufTwvTW9kYWxPdmVybGF5PlxuICAgIDwvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheXMnKSBhcyBIVE1MRGl2RWxlbWVudFxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBMaW5lKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIHdpZHRoPScxNjMnXG4gICAgICBoZWlnaHQ9JzI3J1xuICAgICAgdmlld0JveD0nMCAwIDE2MyAyNydcbiAgICAgIGZpbGw9J25vbmUnXG4gICAgICB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4gICAgPlxuICAgICAgPHBhdGhcbiAgICAgICAgZD0nTTYuNSAyMC41QzEwOC41IDMuMyAxNDguNjY3IDUuMzMzMzMgMTU2IDguNSdcbiAgICAgICAgc3Ryb2tlPSd2YXIoLS1wcmltYXJ5LWNvbG9yKSdcbiAgICAgICAgc3Ryb2tlV2lkdGg9JzEyJ1xuICAgICAgICBzdHJva2VMaW5lY2FwPSdyb3VuZCdcbiAgICAgICAgc3Ryb2tlTGluZWpvaW49J3JvdW5kJ1xuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZTtcbiIsImltcG9ydCByb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBjbGFzc2VzIGZyb20gJy4uLy4uL3N0eWxlcy9wYWdlcy9ob21lLm1vZHVsZS5zY3NzJztcbmltcG9ydCB7IGxvYWRpbmdBY3Rpb24gfSBmcm9tICcuLi8uLi9yZWR1eC9zbGljZXMvbG9hZGluZy9sb2FkaW5nU2xpY2UnO1xuaW1wb3J0IHsgbWVzc2FnZXNBY3Rpb25zIH0gZnJvbSAnLi4vLi4vcmVkdXgvc2xpY2VzL21lc3NhZ2VzL21lc3NhZ2VzU2xpY2UnO1xuaW1wb3J0IGF4aW9zSW5zdGFuY2UgZnJvbSAnLi4vLi4vdXRpbHMvYXhpb3MvYXhpb3NJbnN0YW5jZSc7XG5pbXBvcnQgeyBoYW5kbGVBeGlvc0Vycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXJyb3JzL2hhbmRsZVJlcXVlc3RFcnJvcnMnO1xuaW1wb3J0IHsgRXhlcmNpc2UgfSBmcm9tICcuLi9SZWdpc3RyYXRpb24vd29ya291dC9Gb3Jtcy9FeGVyY2lzZSc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vVUkvTW9kYWwvTW9kYWwnO1xuXG5pbnRlcmZhY2UgRGFpbHlNaXNzaW9uUHJvcHMge1xuICB0cmFpbmluZ0RheU5hbWU6IHN0cmluZztcbiAgZXhlcmNpc2VzPzogRXhlcmNpc2VbXTtcbiAgd29ya291dE5hbWU/OiBzdHJpbmc7XG4gIHRpbWU6IG51bWJlciB8IG51bGw7XG59XG5cbmNvbnN0IERhaWx5TWlzc2lvbjogUmVhY3QuRkM8RGFpbHlNaXNzaW9uUHJvcHM+ID0gKHtcbiAgdHJhaW5pbmdEYXlOYW1lLFxuICBleGVyY2lzZXMsXG4gIHRpbWUsXG4gIHdvcmtvdXROYW1lLFxufSkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gIGNvbnN0IFtzaG93TW9kYWwsIHNldFNob3dNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb21wbGV0ZWRFeGVyY2lzZXMsIHNldENvbXBsZXRlZEV4ZXJjaXNlc10gPSB1c2VTdGF0ZShcbiAgICBleGVyY2lzZXM/LnJlZHVjZShcbiAgICAgIChwcmV2LCBjdXJyKSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbY3Vyci5uYW1lXTogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIHt9IGFzIHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfVxuICAgIClcbiAgKTtcblxuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGRhdGUgPVxuICAgIHRvZGF5LmdldERhdGUoKSArICctJyArICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLScgKyB0b2RheS5nZXRGdWxsWWVhcigpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGNvbXBsZXRlQnRuQ2xpY2tlZEhhbmRsZXIoKSB7XG4gICAgaWYgKHRyYWluaW5nRGF5TmFtZSA9PT0gJ2Flcm9iaWMnIHx8IHRyYWluaW5nRGF5TmFtZSA9PT0gJ1gnKSB7XG4gICAgICBkaXNwYXRjaChsb2FkaW5nQWN0aW9uLnNldFRvVHJ1ZSgpKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3NJbnN0YW5jZS5wb3N0KCcvcHJvZ3JhbS1leGVjLycsIHtcbiAgICAgICAgICBpc0Flcm9iaWM6IHRyYWluaW5nRGF5TmFtZSA9PT0gJ2Flcm9iaWMnLFxuICAgICAgICB9KTtcbiAgICAgICAgZGlzcGF0Y2gobG9hZGluZ0FjdGlvbi5zZXRUb0ZhbHNlKCkpO1xuICAgICAgICBkaXNwYXRjaChcbiAgICAgICAgICBtZXNzYWdlc0FjdGlvbnMubmV3TWVzc2FnZSh7XG4gICAgICAgICAgICBtZXNzYWdlVGl0bGU6ICdFeGVjdXRpb24gU3VibWl0dGVkJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGRhdGEsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgcm91dGVyLnJlbG9hZCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGVycjtcbiAgICAgICAgaGFuZGxlQXhpb3NFcnJvcihlcnIsIGRpc3BhdGNoLCAnRmFpbGVkIHRvIHN1Ym1pdCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTaG93TW9kYWwodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5wdXRDaGFuZ2VIYW5kbGVyKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgY29uc3QgeyBpZCwgY2hlY2tlZCB9ID0gZS50YXJnZXQ7XG4gICAgc2V0Q29tcGxldGVkRXhlcmNpc2VzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbaWRdOiBjaGVja2VkIH0pKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHN1Ym1pdEZvcm1IYW5kbGVyKGU6IFJlYWN0LkZvcm1FdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvc0luc3RhbmNlLnBvc3QoJy9wcm9ncmFtLWV4ZWMvJywge1xuICAgICAgICBleGVyY2lzZXM6IGNvbXBsZXRlZEV4ZXJjaXNlcyxcbiAgICAgIH0pO1xuICAgICAgZGlzcGF0Y2gobG9hZGluZ0FjdGlvbi5zZXRUb0ZhbHNlKCkpO1xuICAgICAgZGlzcGF0Y2goXG4gICAgICAgIG1lc3NhZ2VzQWN0aW9ucy5uZXdNZXNzYWdlKHtcbiAgICAgICAgICBtZXNzYWdlVGl0bGU6ICdFeGVjdXRpb24gU3VibWl0dGVkJyxcbiAgICAgICAgICBtZXNzYWdlOiBkYXRhLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHJvdXRlci5yZWxvYWQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGhhbmRsZUF4aW9zRXJyb3IoZXJyLCBkaXNwYXRjaCwgJ0ZhaWxlZCB0byBzdWJtaXQnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2hvd01vZGFsKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkRhaWx5TWlzc2lvbn0+XG4gICAgICB7c2hvd01vZGFsICYmIHdvcmtvdXROYW1lICYmIGV4ZXJjaXNlcz8ubGVuZ3RoICYmIChcbiAgICAgICAgPE1vZGFsIG9uQ2xvc2U9eygpID0+IHNldFNob3dNb2RhbChmYWxzZSl9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkRhaWx5TWlzc2lvbk1vZGFsfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLk1vZGFsVGl0bGV9PlxuICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57d29ya291dE5hbWV9PC9zdHJvbmc+ICh7dHJhaW5pbmdEYXlOYW1lfSlcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPHRpbWU+e2RhdGV9PC90aW1lPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDQ+RXhlcmNpc2VzOiA8L2g0PlxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3N1Ym1pdEZvcm1IYW5kbGVyfT5cbiAgICAgICAgICAgICAge2V4ZXJjaXNlcy5tYXAoKGV4ZXJjaXNlLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2V4ZXJjaXNlLm5hbWUgKyBpfSBjbGFzc05hbWU9e2NsYXNzZXMuRm9ybX0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2lucHV0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgICAgIGlkPXtleGVyY2lzZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkV4ZXJjaXNlfSBrZXk9e2V4ZXJjaXNlLm5hbWUgKyBpfT5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2V4ZXJjaXNlLm5hbWV9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+TmFtZTogPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAge2V4ZXJjaXNlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAge2V4ZXJjaXNlLmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPkRlc2NyaXB0aW9uOiA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2V4ZXJjaXNlLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlJlcHM6IDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4ZXJjaXNlLnJlcHN9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TZXRzOiA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleGVyY2lzZS5zZXRzfVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgIHtleGVyY2lzZS5tdXNjbGVzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPk11c2NsZXM6IDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXhlcmNpc2UubXVzY2xlcy5qb2luKCcsICcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nc3VjY2Vzcy1idXR0b24nIHR5cGU9J3N1Ym1pdCc+XG4gICAgICAgICAgICAgICAgU3VibWl0XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsPlxuICAgICAgKX1cbiAgICAgIDxoMz5EYWlseSBNaXNzaW9uOjwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICB7d29ya291dE5hbWUgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICA8c3Ryb25nPldvcmtvdXQ6IDwvc3Ryb25nPlxuICAgICAgICAgICAgICB7d29ya291dE5hbWV9ICh7dHJhaW5pbmdEYXlOYW1lfSlcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIHt0aW1lICYmIChcbiAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5UaW1lOiA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7dGltZX0gKG1pbnV0ZXMpXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3Ryb25nPldvcmtvdXQ6IDwvc3Ryb25nPlJlc3QgRGF5IChYKVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHN0cm9uZz5NYXggUG9pbnRzOiA8L3N0cm9uZz5cbiAgICAgICAgICAxMFxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdwcmltYXJ5LWJ1dHRvbicgb25DbGljaz17Y29tcGxldGVCdG5DbGlja2VkSGFuZGxlcn0+XG4gICAgICAgIENvbXBsZXRlXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhaWx5TWlzc2lvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBjbGFzc2VzIGZyb20gJy4uLy4uL3N0eWxlcy9wYWdlcy9ob21lLm1vZHVsZS5zY3NzJztcbmltcG9ydCB7IEV4ZXJjaXNlIH0gZnJvbSAnLi4vUmVnaXN0cmF0aW9uL3dvcmtvdXQvRm9ybXMvRXhlcmNpc2UnO1xuXG5pbnRlcmZhY2UgRGV0YWlsZWRFeGVyY2lzZVByb3BzIHtcbiAgd29ya291dE5hbWU6IHN0cmluZztcbiAgdHJhaW5pbmdEYXlOYW1lOiBzdHJpbmc7XG4gIHRpbWU6IHN0cmluZztcbiAgZXhlcmNpc2VzPzogRXhlcmNpc2VbXTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59XG5cbmNvbnN0IERldGFpbGVkRXhlcmNpc2U6IFJlYWN0LkZDPERldGFpbGVkRXhlcmNpc2VQcm9wcz4gPSAoe1xuICB3b3Jrb3V0TmFtZSxcbiAgZXhlcmNpc2VzLFxuICB0cmFpbmluZ0RheU5hbWUsXG4gIHRpbWUsXG4gIGRlc2NyaXB0aW9uLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0aWQ9J3dvcmtvdXQtbW9kYWwnIGNsYXNzTmFtZT17Y2xhc3Nlcy5Ub21vcnJvd01pc3Npb25Nb2RhbH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Nb2RhbFRpdGxlfT5cbiAgICAgICAgPGgyPlxuICAgICAgICAgIDxzdHJvbmc+e3dvcmtvdXROYW1lfTwvc3Ryb25nPiAoe3RyYWluaW5nRGF5TmFtZX0pXG4gICAgICAgIDwvaDI+XG4gICAgICAgIDx0aW1lPnt0aW1lfTwvdGltZT5cbiAgICAgIDwvZGl2PlxuICAgICAge2Rlc2NyaXB0aW9uICYmIDxwPntkZXNjcmlwdGlvbn08L3A+fVxuICAgICAge2V4ZXJjaXNlcyAmJiAhIWV4ZXJjaXNlcy5sZW5ndGggJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxoND5FeGVyY2lzZXM6PC9oND5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICB7ZXhlcmNpc2VzLm1hcCgoZXhlcmNpc2UsIGkpID0+IChcbiAgICAgICAgICAgICAgPGxpIGtleT17ZXhlcmNpc2UubmFtZSArIGl9PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5OYW1lOjwvc3Ryb25nPiB7ZXhlcmNpc2UubmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlJlcHM6PC9zdHJvbmc+IHtleGVyY2lzZS5yZXBzfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+U2V0czo8L3N0cm9uZz4ge2V4ZXJjaXNlLnNldHN9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICB7ZXhlcmNpc2UuZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPkRlc2NyaXB0aW9uOjwvc3Ryb25nPiB7ZXhlcmNpc2UuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7ISFleGVyY2lzZS5tdXNjbGVzPy5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPk11c2NsZXM6PC9zdHJvbmc+IHtleGVyY2lzZS5tdXNjbGVzLmpvaW4oJywgJyl9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxlZEV4ZXJjaXNlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuLi8uLi9zdHlsZXMvcGFnZXMvaG9tZS5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgeyBkYXRlVG9TdHJpbmcgfSBmcm9tICcuLi8uLi91dGlscy9kYXRlcy9kYXRlVG9TdHJpbmcnO1xuaW1wb3J0IGF4aW9zSW5zdGFuY2UgZnJvbSAnLi4vLi4vdXRpbHMvYXhpb3MvYXhpb3NJbnN0YW5jZSc7XG5pbXBvcnQgeyBoYW5kbGVBeGlvc0Vycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXJyb3JzL2hhbmRsZVJlcXVlc3RFcnJvcnMnO1xuaW1wb3J0IHsgV29ya291dFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Qcm9ncmFtJztcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9VSS9Nb2RhbC9Nb2RhbCc7XG5pbXBvcnQgRGV0YWlsZWRFeGVyY2lzZSBmcm9tICcuL0RldGFpbGVkRXhlcmNpc2UnO1xuXG50eXBlIEQzU2VsZWN0ID0gbnVsbCB8IGQzLlNlbGVjdGlvbjxcbiAgU1ZHU1ZHRWxlbWVudCB8IG51bGwsXG4gIHVua25vd24sXG4gIG51bGwsXG4gIHVuZGVmaW5lZFxuPjtcblxudHlwZSBkM0dyYXBoID0gbnVsbCB8IGQzLlNlbGVjdGlvbjxTVkdHRWxlbWVudCwgdW5rbm93biwgbnVsbCwgdW5kZWZpbmVkPjtcblxudHlwZSBFeGVjdXRpb24gPSB7IHJhdGU6IG51bWJlcjsgZGF0ZTogRGF0ZTsgd29ya291dD86IFdvcmtvdXRUeXBlIH07XG5cbmNvbnN0IGNvbG9ycyA9IFsnI0Q5RUZFMCcsICcjQjRFMEMxJywgJyM4RUQwQTInLCAnIzY4QzA4MycsICcjMzBBOTU0J107XG5cbmNvbnN0IGRlZmF1bHRFeGVjdXRpb25zID0gW3sgZGF0ZTogbmV3IERhdGUoKSwgcmF0ZTogMCB9XTtcblxuY29uc3QgRXhlY3V0aW9uc0dyYXBoOiBSZWFjdC5GQzx7XG4gIHdlZWtseUV4ZWN1dGlvbnM6IEV4ZWN1dGlvbltdO1xufT4gPSAoeyB3ZWVrbHlFeGVjdXRpb25zIH0pID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCB1cGRhdGVkRGF0YSA9IHdlZWtseUV4ZWN1dGlvbnMubGVuZ3RoXG4gICAgPyB3ZWVrbHlFeGVjdXRpb25zXG4gICAgOiBkZWZhdWx0RXhlY3V0aW9ucztcblxuICBjb25zdCBbZXhlY3V0aW9uc0RhdGEsIHNldEV4ZWN1dGlvbnNEYXRhXSA9IHVzZVN0YXRlKHVwZGF0ZWREYXRhKTtcbiAgY29uc3QgW2hhc0V4ZWN1dGlvbnMsIHNldEhhc0V4ZWN1dGlvbnNdID0gdXNlU3RhdGUoISF3ZWVrbHlFeGVjdXRpb25zLmxlbmd0aCk7XG4gIGNvbnN0IFtzZWxlY3RFbEFjdGl2ZSwgc2V0U2VsZWN0RWxBY3RpdmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZ3JhcGhUb0Rpc3BsYXksIHNldEdyYXBoVG9EaXNwbGF5XSA9IHVzZVN0YXRlPCdwaWUnIHwgJ2Jhcic+KCdiYXInKTtcbiAgY29uc3QgW3Nob3dNb250aCwgc2V0U2hvd01vbnRoXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNb2RhbCwgc2V0U2hvd01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2N1cnJlbnRXb3Jrb3V0LCBzZXRDdXJyZW50V29ya291dF0gPSB1c2VTdGF0ZTxXb3Jrb3V0VHlwZSB8IG51bGw+KFxuICAgIG51bGxcbiAgKTtcblxuICBjb25zdCBkaW1lbnNpb25zID0ge1xuICAgIGhlaWdodDogMjgwLFxuICAgIHdpZHRoOiAzMjAsXG4gICAgbWFyZ2luTGVmdDogNTAsXG4gICAgbWFyZ2luVG9wOiAxMCxcbiAgICBtYXJnaW5SaWdodDogMjUsXG4gICAgbWFyZ2luQm90dG9tOiA0MCxcbiAgfTtcbiAgY29uc3QgcGllRGltZW5zaW9ucyA9IHtcbiAgICBoZWlnaHQ6IDIwMCxcbiAgICB3aWR0aDogMzEwLFxuICAgIHJhZGl1czogMTA1LFxuICB9O1xuXG4gIGNvbnN0IGdyYXBoV2lkdGggPVxuICAgIGRpbWVuc2lvbnMud2lkdGggLSBkaW1lbnNpb25zLm1hcmdpbkxlZnQgLSBkaW1lbnNpb25zLm1hcmdpblJpZ2h0O1xuICBjb25zdCBncmFwaEhlaWdodCA9XG4gICAgZGltZW5zaW9ucy5oZWlnaHQgLSBkaW1lbnNpb25zLm1hcmdpblRvcCAtIGRpbWVuc2lvbnMubWFyZ2luQm90dG9tO1xuXG4gIGNvbnN0IGJhclJlZiA9IHVzZVJlZjxTVkdTVkdFbGVtZW50PihudWxsKTtcbiAgY29uc3QgcGllUmVmID0gdXNlUmVmPFNWR1NWR0VsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IFtkYXRlLCBzZXREYXRlXSA9IHVzZVN0YXRlKGdldFNjYWxlVGltZURvbWFpbigpKTtcbiAgY29uc3QgW3NlbGVjdGVkQmFyQ2hhcnQsIHNldFNlbGVjdGVkQmFyQ2hhcnRdID0gdXNlU3RhdGU8RDNTZWxlY3Q+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRQaWVDaGFydCwgc2V0U2VsZWN0ZWRQaWVDaGFydF0gPSB1c2VTdGF0ZTxEM1NlbGVjdD4obnVsbCk7XG4gIGNvbnN0IFtiYXJHcmFwaCwgc2V0QmFyR3JhcGhdID0gdXNlU3RhdGU8ZDNHcmFwaD4obnVsbCk7XG4gIGNvbnN0IFtwaWVHcmFwaCwgc2V0UGllR3JhcGhdID0gdXNlU3RhdGU8ZDNHcmFwaD4obnVsbCk7XG4gIGNvbnN0IFthdmcsIHNldEF2Z10gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBmdW5jdGlvbiBnZXRTY2FsZVRpbWVEb21haW4oKSB7XG4gICAgbGV0IGRvbWFpbiA9IGQzLmV4dGVudChleGVjdXRpb25zRGF0YS5tYXAoKGl0ZW0pID0+IG5ldyBEYXRlKGl0ZW0uZGF0ZSkpKTtcblxuICAgIGlmIChkb21haW5bMF0gPT09IGRvbWFpblsxXSkge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRvbWFpblswXSEpO1xuICAgICAgY29uc3QgZGF0ZTIgPSBuZXcgRGF0ZShkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKSk7XG4gICAgICBkb21haW4gPSBkMy5leHRlbnQoW2RhdGUsIGRhdGUyXSk7XG4gICAgICBkb21haW5bMF0gPSBuZXcgRGF0ZShkb21haW5bMF0hLnNldERhdGUoZG9tYWluWzBdIS5nZXREYXRlKCkgLSAyKSk7XG4gICAgICBkb21haW5bMV0gPSBuZXcgRGF0ZShkb21haW5bMV0hLnNldERhdGUoZG9tYWluWzFdIS5nZXREYXRlKCkgKyAyKSk7XG4gICAgICByZXR1cm4gZG9tYWluO1xuICAgIH1cblxuICAgIGRvbWFpblswXSA9IG5ldyBEYXRlKGRvbWFpblswXSEuc2V0RGF0ZShkb21haW5bMF0hLmdldERhdGUoKSAtIDEpKTtcbiAgICBkb21haW5bMV0gPSBuZXcgRGF0ZShkb21haW5bMV0hLnNldERhdGUoZG9tYWluWzFdIS5nZXREYXRlKCkgKyAxKSk7XG5cbiAgICByZXR1cm4gZG9tYWluO1xuICB9XG5cbiAgY29uc3QgYXJjUGF0aCA9IGQzXG4gICAgLmFyYygpXG4gICAgLm91dGVyUmFkaXVzKHBpZURpbWVuc2lvbnMucmFkaXVzKVxuICAgIC5pbm5lclJhZGl1cyhwaWVEaW1lbnNpb25zLnJhZGl1cyAvIDIpO1xuXG4gIGNvbnN0IHBpZVR3ZWVuRW50ZXIgPSAoZDogeyBzdGFydEFuZ2xlOiBudW1iZXI7IGVuZEFuZ2xlOiBudW1iZXIgfSkgPT4ge1xuICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZShkLmVuZEFuZ2xlLCBkLnN0YXJ0QW5nbGUpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0OiBudW1iZXIpIHtcbiAgICAgIGQuc3RhcnRBbmdsZSA9IGkodCk7XG4gICAgICByZXR1cm4gYXJjUGF0aChkIGFzIGFueSk7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwaWVUd2VlbkV4aXQgPSAoZDogeyBzdGFydEFuZ2xlOiBudW1iZXI7IGVuZEFuZ2xlOiBudW1iZXIgfSkgPT4ge1xuICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZShkLnN0YXJ0QW5nbGUsIGQuZW5kQW5nbGUpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0OiBudW1iZXIpIHtcbiAgICAgIGQuc3RhcnRBbmdsZSA9IGkodCk7XG4gICAgICByZXR1cm4gYXJjUGF0aChkIGFzIGFueSk7XG4gICAgfTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzRXhlY3V0aW9ucyAmJiBzZWxlY3RlZEJhckNoYXJ0KSB7XG4gICAgICBzZWxlY3RlZEJhckNoYXJ0LnN0eWxlKCdoZWlnaHQnLCAwKTtcbiAgICAgIHNlbGVjdGVkQmFyQ2hhcnQuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuICAgIGlmIChoYXNFeGVjdXRpb25zICYmIHNlbGVjdGVkQmFyQ2hhcnQpIHtcbiAgICAgIHNlbGVjdGVkQmFyQ2hhcnQuc3R5bGUoJ2hlaWdodCcsIDI4MCk7XG4gICAgICBzZWxlY3RlZEJhckNoYXJ0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICB9XG4gICAgaWYgKCFoYXNFeGVjdXRpb25zICYmIHNlbGVjdGVkUGllQ2hhcnQpIHtcbiAgICAgIHNlbGVjdGVkUGllQ2hhcnQuc3R5bGUoJ2hlaWdodCcsIDApO1xuICAgICAgc2VsZWN0ZWRQaWVDaGFydC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9XG4gICAgaWYgKGhhc0V4ZWN1dGlvbnMgJiYgc2VsZWN0ZWRQaWVDaGFydCkge1xuICAgICAgc2VsZWN0ZWRQaWVDaGFydC5zdHlsZSgnaGVpZ2h0JywgMzIwKTtcbiAgICAgIHNlbGVjdGVkUGllQ2hhcnQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgIH1cbiAgfSwgW2hhc0V4ZWN1dGlvbnMsIHNlbGVjdGVkQmFyQ2hhcnQsIHNlbGVjdGVkUGllQ2hhcnRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEF2ZyhcbiAgICAgICsoXG4gICAgICAgIGV4ZWN1dGlvbnNEYXRhLnJlZHVjZSgocHJldiwgY3VycikgPT4gKHByZXYgKz0gY3Vyci5yYXRlKSwgMCkgL1xuICAgICAgICBleGVjdXRpb25zRGF0YS5sZW5ndGhcbiAgICAgICkudG9GaXhlZCgyKVxuICAgICk7XG5cbiAgICAvL2RhdGVzIHRpdGxlXG4gICAgc2V0RGF0ZShnZXRTY2FsZVRpbWVEb21haW4oKSk7XG4gIH0sIFtleGVjdXRpb25zRGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGdyYXBoVG9EaXNwbGF5ICE9PSAnYmFyJykgcmV0dXJuO1xuICAgIGlmICghc2VsZWN0ZWRCYXJDaGFydCkge1xuICAgICAgc2V0U2VsZWN0ZWRCYXJDaGFydChkMy5zZWxlY3QoYmFyUmVmLmN1cnJlbnQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFiYXJHcmFwaCkge1xuICAgICAgICBjb25zdCBncmFwaCA9IHNlbGVjdGVkQmFyQ2hhcnRcbiAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cihcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgYHRyYW5zbGF0ZSgke2RpbWVuc2lvbnMubWFyZ2luTGVmdH0sJHtkaW1lbnNpb25zLm1hcmdpblRvcH0pYFxuICAgICAgICAgICk7XG4gICAgICAgIHNldEJhckdyYXBoKGdyYXBoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vc2NhbGVzXG4gICAgICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbMCwgMTAwXSkucmFuZ2UoW2dyYXBoSGVpZ2h0LCAwXSk7XG4gICAgICAgIGNvbnN0IHggPSBkM1xuICAgICAgICAgIC5zY2FsZVRpbWUoKVxuICAgICAgICAgIC5yYW5nZShbMCwgZ3JhcGhXaWR0aF0pXG4gICAgICAgICAgLmRvbWFpbihnZXRTY2FsZVRpbWVEb21haW4oKSBhcyBbRGF0ZSwgRGF0ZV0pO1xuXG4gICAgICAgIC8vYXhpc1xuXG4gICAgICAgIGNvbnN0IHhBeGlzID0gZDNcbiAgICAgICAgICAuYXhpc0JvdHRvbTxEYXRlPih4KVxuICAgICAgICAgIC50aWNrcyhleGVjdXRpb25zRGF0YS5sZW5ndGggPiA3ID8gOCA6IGV4ZWN1dGlvbnNEYXRhLmxlbmd0aCArIDEpXG4gICAgICAgICAgLnRpY2tGb3JtYXQoZDMudGltZUZvcm1hdCgnJWIgJWQnKSk7XG5cbiAgICAgICAgY29uc3QgeUF4aXMgPSBkM1xuICAgICAgICAgIC5heGlzTGVmdCh5KVxuICAgICAgICAgIC50aWNrcyg0KVxuICAgICAgICAgIC50aWNrRm9ybWF0KChkKSA9PiBgJHtkfSVgKTtcblxuICAgICAgICBzZWxlY3RlZEJhckNoYXJ0LnNlbGVjdCgnLnhBeGlzJykucmVtb3ZlKCk7XG4gICAgICAgIHNlbGVjdGVkQmFyQ2hhcnQuc2VsZWN0KCcueUF4aXMnKS5yZW1vdmUoKTtcblxuICAgICAgICBzZWxlY3RlZEJhckNoYXJ0XG4gICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3hBeGlzJylcbiAgICAgICAgICAuYXR0cihcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgYHRyYW5zbGF0ZSgke2RpbWVuc2lvbnMubWFyZ2luTGVmdH0sJHtcbiAgICAgICAgICAgICAgZ3JhcGhIZWlnaHQgKyBkaW1lbnNpb25zLm1hcmdpblRvcFxuICAgICAgICAgICAgfSlgXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC00MCknKVxuICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMTBweCcpO1xuXG4gICAgICAgIHNlbGVjdGVkQmFyQ2hhcnRcbiAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cignY2xhc3MnLCAneUF4aXMnKVxuICAgICAgICAgIC5hdHRyKFxuICAgICAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICBgdHJhbnNsYXRlKCR7ZGltZW5zaW9ucy5tYXJnaW5MZWZ0fSwke2RpbWVuc2lvbnMubWFyZ2luVG9wfSlgXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jYWxsKHlBeGlzKTtcblxuICAgICAgICAvL3VwZGF0ZSBncmFwaCAoZW50ZXIscmVtb3ZlIGFuZCB1cGRhdGUpXG4gICAgICAgIGNvbnN0IHJlY3RzID0gYmFyR3JhcGguc2VsZWN0QWxsKCdyZWN0JykuZGF0YShleGVjdXRpb25zRGF0YSk7XG5cbiAgICAgICAgcmVjdHNcbiAgICAgICAgICAuZXhpdCgpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDApXG4gICAgICAgICAgLmF0dHIoJ3knLCBncmFwaEhlaWdodClcbiAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlZFJlY3RzID0gcmVjdHNcbiAgICAgICAgICAuYXR0cignaGVpZ2h0JywgMClcbiAgICAgICAgICAuYXR0cigneScsIGdyYXBoSGVpZ2h0KVxuICAgICAgICAgIC5hdHRyKCd4JywgKGQpID0+XG4gICAgICAgICAgICBzaG93TW9udGggPyB4KG5ldyBEYXRlKGQuZGF0ZSkpIC0gMiA6IHgobmV3IERhdGUoZC5kYXRlKSkgLSAxMFxuICAgICAgICAgIClcbiAgICAgICAgICAuYXR0cignd2lkdGgnLCBzaG93TW9udGggPyA0IDogMjApXG4gICAgICAgICAgLnN0eWxlKCdjdXJzb3InLCAoZDogYW55KSA9PiAoZC53b3Jrb3V0ID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnKSlcbiAgICAgICAgICAuYXR0cihcbiAgICAgICAgICAgICdmaWxsJyxcbiAgICAgICAgICAgIChkKSA9PlxuICAgICAgICAgICAgICBgJHtkLnJhdGUgPT09IDEwMCA/ICd2YXIoLS1wcmltYXJ5LWNvbG9yKScgOiAndmFyKC0tdGV4dC1jb2xvciknfWBcbiAgICAgICAgICApO1xuXG4gICAgICAgIHVwZGF0ZWRSZWN0c1xuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNzAwKVxuICAgICAgICAgIC5kZWxheSgoXywgaSkgPT4gKGkgKyAxKSAqIDcwKVxuICAgICAgICAgIC5lYXNlKGQzLmVhc2VFbGFzdGljKVxuICAgICAgICAgIC5hdHRyKCd5JywgKGQpID0+IHkoZC5yYXRlKSlcbiAgICAgICAgICAuYXR0cignaGVpZ2h0JywgKGQpID0+IGdyYXBoSGVpZ2h0IC0geShkLnJhdGUpKTtcblxuICAgICAgICB1cGRhdGVkUmVjdHMub24oJ2NsaWNrJywgKGUsIGQ6IGFueSkgPT4ge1xuICAgICAgICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgICAgICAgICBzZXRDdXJyZW50V29ya291dChkLndvcmtvdXQgYXMgV29ya291dFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBlbnRlclJlY3RzID0gcmVjdHNcbiAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgIC5zdHlsZSgnY3Vyc29yJywgKGQ6IGFueSkgPT4gKGQud29ya291dCA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JykpXG4gICAgICAgICAgLmF0dHIoXG4gICAgICAgICAgICAnZmlsbCcsXG4gICAgICAgICAgICAoZCkgPT5cbiAgICAgICAgICAgICAgYCR7ZC5yYXRlID09PSAxMDAgPyAndmFyKC0tcHJpbWFyeS1jb2xvciknIDogJ3ZhcigtLXRleHQtY29sb3IpJ31gXG4gICAgICAgICAgKVxuICAgICAgICAgIC5hdHRyKCd4JywgKGQpID0+XG4gICAgICAgICAgICBzaG93TW9udGggPyB4KG5ldyBEYXRlKGQuZGF0ZSkpIC0gMiA6IHgobmV3IERhdGUoZC5kYXRlKSkgLSAxMFxuICAgICAgICAgIClcbiAgICAgICAgICAuYXR0cignd2lkdGgnLCBzaG93TW9udGggPyA0IDogMjApXG4gICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDApXG4gICAgICAgICAgLmF0dHIoJ3knLCBncmFwaEhlaWdodCk7XG5cbiAgICAgICAgZW50ZXJSZWN0c1xuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNzAwKVxuICAgICAgICAgIC5kZWxheSgoXywgaSkgPT4gKGkgKyAxKSAqIDcwKVxuICAgICAgICAgIC5lYXNlKGQzLmVhc2VFbGFzdGljKVxuICAgICAgICAgIC5hdHRyKCd5JywgKGQpID0+IHkoZC5yYXRlKSlcbiAgICAgICAgICAuYXR0cignaGVpZ2h0JywgKGQpID0+IGdyYXBoSGVpZ2h0IC0geShkLnJhdGUpKTtcblxuICAgICAgICBlbnRlclJlY3RzLm9uKCdjbGljaycsIChlLCBkOiBhbnkpID0+IHtcbiAgICAgICAgICBzZXRTaG93TW9kYWwodHJ1ZSk7XG4gICAgICAgICAgc2V0Q3VycmVudFdvcmtvdXQoZC53b3Jrb3V0IGFzIFdvcmtvdXRUeXBlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbc2VsZWN0ZWRCYXJDaGFydCwgZXhlY3V0aW9uc0RhdGEsIGJhckdyYXBoLCBncmFwaFRvRGlzcGxheV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGdyYXBoVG9EaXNwbGF5ICE9PSAncGllJykgcmV0dXJuO1xuXG4gICAgaWYgKCFzZWxlY3RlZFBpZUNoYXJ0KSB7XG4gICAgICBzZXRTZWxlY3RlZFBpZUNoYXJ0KGQzLnNlbGVjdChwaWVSZWYuY3VycmVudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXBpZUdyYXBoKSB7XG4gICAgICAgIGNvbnN0IGdyYXBoID0gc2VsZWN0ZWRQaWVDaGFydFxuICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgIC5hdHRyKFxuICAgICAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICBgdHJhbnNsYXRlKCR7cGllRGltZW5zaW9ucy5yYWRpdXMgKyAzfSwke1xuICAgICAgICAgICAgICAyICogcGllRGltZW5zaW9ucy5yYWRpdXMgKyBkaW1lbnNpb25zLm1hcmdpblRvcCAtIDVcbiAgICAgICAgICAgIH0pYFxuICAgICAgICAgICk7XG4gICAgICAgIHNldFBpZUdyYXBoKGdyYXBoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJhdGVzOiBudW1iZXJbXSA9IGV4ZWN1dGlvbnNEYXRhLm1hcCgoaXRlbSkgPT4gaXRlbS5yYXRlKTtcbiAgICAgICAgY29uc3QgZGF0YUZvclBpZUdyYXBoID0gW1xuICAgICAgICAgIHsgYW1vdW50OiAwLCBuYW1lOiAndW5kZXIgMjUlJyB9LFxuICAgICAgICAgIHsgYW1vdW50OiAwLCBuYW1lOiAndW5kZXIgNTAlJyB9LFxuICAgICAgICAgIHsgYW1vdW50OiAwLCBuYW1lOiAndW5kZXIgNzUlJyB9LFxuICAgICAgICAgIHsgYW1vdW50OiAwLCBuYW1lOiAndW5kZXIgMTAwJScgfSxcbiAgICAgICAgICB7IGFtb3VudDogMCwgbmFtZTogJzEwMCUnIH0sXG4gICAgICAgIF07XG4gICAgICAgIHJhdGVzLmZvckVhY2goKHJhdGUpID0+IHtcbiAgICAgICAgICBpZiAocmF0ZSA8IDI1KSB7XG4gICAgICAgICAgICBkYXRhRm9yUGllR3JhcGhbMF0uYW1vdW50Kys7XG4gICAgICAgICAgfSBlbHNlIGlmIChyYXRlIDwgNTApIHtcbiAgICAgICAgICAgIGRhdGFGb3JQaWVHcmFwaFsxXS5hbW91bnQrKztcbiAgICAgICAgICB9IGVsc2UgaWYgKHJhdGUgPCA3NSkge1xuICAgICAgICAgICAgZGF0YUZvclBpZUdyYXBoWzJdLmFtb3VudCsrO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmF0ZSA8IDEwMCkge1xuICAgICAgICAgICAgZGF0YUZvclBpZUdyYXBoWzNdLmFtb3VudCsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhRm9yUGllR3JhcGhbNF0uYW1vdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGllID0gZDMucGllKCkudmFsdWUoKGQ6IGFueSkgPT4gZC5hbW91bnQpO1xuXG4gICAgICAgIGNvbnN0IGNvbG9yc1NjYWxlID0gZDNcbiAgICAgICAgICAuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgICAuZG9tYWluKFsndW5kZXIgMjUlJywgJ3VuZGVyIDUwJScsICd1bmRlciA3NSUnLCAndW5kZXIgMTAwJScsICcxMDAlJ10pXG4gICAgICAgICAgLnJhbmdlKGNvbG9ycyk7XG5cbiAgICAgICAgLy91cGRhdGUgZ3JhcGggKGVudGVyLHJlbW92ZSBhbmQgdXBkYXRlKVxuXG4gICAgICAgIGNvbnN0IHBhdGhzID0gcGllR3JhcGhcbiAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAuZGF0YShwaWUoZGF0YUZvclBpZUdyYXBoIGFzIGFueSkpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDEpXG4gICAgICAgICAgLmF0dHIoJ2QnLCBhcmNQYXRoIGFzIGFueSlcbiAgICAgICAgICAuYXR0cignZmlsbCcsIChkOiBhbnkpID0+IGNvbG9yc1NjYWxlKGQuZGF0YS5uYW1lKSBhcyBzdHJpbmcpO1xuXG4gICAgICAgIHBhdGhzXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigyNzAwKVxuICAgICAgICAgIC5lYXNlKGQzLmVhc2VFbGFzdGljLmFtcGxpdHVkZSgwLjUpKVxuICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBwaWVUd2VlbkVudGVyIGFzIGFueSk7XG5cbiAgICAgICAgcGF0aHNcbiAgICAgICAgICAuZXhpdCgpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbig0NTApXG4gICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuRXhpdCBhcyBhbnkpXG4gICAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgICAgIHBhdGhzXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMSlcbiAgICAgICAgICAuYXR0cignZCcsIGFyY1BhdGggYXMgYW55KVxuICAgICAgICAgIC5hdHRyKCdmaWxsJywgKGQ6IGFueSkgPT4gY29sb3JzU2NhbGUoZC5kYXRhLm5hbWUpIGFzIHN0cmluZylcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDI3MDApXG4gICAgICAgICAgLmVhc2UoZDMuZWFzZUVsYXN0aWMuYW1wbGl0dWRlKDAuNSkpXG4gICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuRW50ZXIgYXMgYW55KTtcblxuICAgICAgICAvL2xlZ2VuZFxuXG4gICAgICAgIGNvbnN0IHBpZUxlZ2VuZCA9IHNlbGVjdGVkUGllQ2hhcnRcbiAgICAgICAgICAuc2VsZWN0QWxsKCcubGVnZW5kJylcbiAgICAgICAgICAuZGF0YShwaWUoZGF0YUZvclBpZUdyYXBoIGFzIGFueSkpXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cihcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgKF8sIGkpID0+XG4gICAgICAgICAgICAgIGB0cmFuc2xhdGUoJHtwaWVEaW1lbnNpb25zLnJhZGl1cyAqIDIgLSAyMH0sJHtpICogMjUgKyAxMH0pYFxuICAgICAgICAgIClcbiAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJyk7XG5cbiAgICAgICAgcGllTGVnZW5kXG4gICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgLmF0dHIoJ3dpZHRoJywgMTUpXG4gICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDE1KVxuICAgICAgICAgIC5hdHRyKCdmaWxsJywgKGQ6IGFueSkgPT4gY29sb3JzU2NhbGUoZC5kYXRhLm5hbWUpIGFzIHN0cmluZyk7XG5cbiAgICAgICAgcGllTGVnZW5kXG4gICAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgLnRleHQoKGQ6IGFueSkgPT4gZC5kYXRhLm5hbWUpXG4gICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCAxMClcbiAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgMSlcbiAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICd2YXIoLS10ZXh0LWNvbG9yKScpXG4gICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAxKVxuICAgICAgICAgIC5hdHRyKCd5JywgMTEpXG4gICAgICAgICAgLmF0dHIoJ3gnLCAyMCk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbc2VsZWN0ZWRQaWVDaGFydCwgZXhlY3V0aW9uc0RhdGEsIHBpZUdyYXBoLCBncmFwaFRvRGlzcGxheV0pO1xuXG4gIGZ1bmN0aW9uIGNoYW5nZUdyYXBoSGFuZGxlcihlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xuICAgIGlmICghZS50YXJnZXQuY2hlY2tlZCkgc2V0R3JhcGhUb0Rpc3BsYXkoJ2JhcicpO1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSBzZXRHcmFwaFRvRGlzcGxheSgncGllJyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlRm9yV2Vlayh3ZWVrc051bWJlcjogbnVtYmVyKSB7XG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgY3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgLSA3ICogd2Vla3NOdW1iZXIpXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHNlbGVjdFdlZWtIYW5kbGVyKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxTZWxlY3RFbGVtZW50Pikge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xuXG4gICAgY29uc3QgaXNNb250aFNlbGVjdGVkID0gK3ZhbHVlID09PSA1O1xuICAgIGlzTW9udGhTZWxlY3RlZCA/IHNldFNob3dNb250aCh0cnVlKSA6IHNldFNob3dNb250aChmYWxzZSk7XG5cbiAgICBzZXRTZWxlY3RFbEFjdGl2ZSh2YWx1ZSAhPT0gJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhbmdlID0gaXNNb250aFNlbGVjdGVkID8gJ21vbnRoJyA6ICd3ZWVrJztcbiAgICAgIGNvbnN0IGRhdGUgPSBpc01vbnRoU2VsZWN0ZWRcbiAgICAgICAgPyBkYXRlVG9TdHJpbmcobmV3IERhdGUoKSlcbiAgICAgICAgOiBkYXRlVG9TdHJpbmcoZ2V0RGF0ZUZvcldlZWsoK3ZhbHVlKSk7XG5cbiAgICAgIGNvbnN0IHsgZGF0YSwgc3RhdHVzIH0gPSBhd2FpdCBheGlvc0luc3RhbmNlLmdldChcbiAgICAgICAgYC9wcm9ncmFtLWV4ZWMvYnktcmFuZ2UvJHtyYW5nZX0vJHtkYXRlfWBcbiAgICAgICk7XG5cbiAgICAgIGlmIChzdGF0dXMgPT09IDIwNCkge1xuICAgICAgICBzZXRFeGVjdXRpb25zRGF0YShkZWZhdWx0RXhlY3V0aW9ucyk7XG4gICAgICAgIHNldEhhc0V4ZWN1dGlvbnMoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRIYXNFeGVjdXRpb25zKHRydWUpO1xuICAgICAgc2V0RXhlY3V0aW9uc0RhdGEoXG4gICAgICAgIGRhdGEubWFwKFxuICAgICAgICAgIChpdGVtOiB7XG4gICAgICAgICAgICBkYXRlOiBEYXRlO1xuICAgICAgICAgICAgZXhlY3V0aW9uUmF0ZTogbnVtYmVyO1xuICAgICAgICAgICAgd29ya291dElkPzogV29ya291dFR5cGU7XG4gICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgbGV0IGV4ZWN1dGlvbjogRXhlY3V0aW9uID0ge1xuICAgICAgICAgICAgICBkYXRlOiBpdGVtLmRhdGUsXG4gICAgICAgICAgICAgIHJhdGU6IGl0ZW0uZXhlY3V0aW9uUmF0ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaXRlbS53b3Jrb3V0SWQpIGV4ZWN1dGlvbi53b3Jrb3V0ID0gaXRlbS53b3Jrb3V0SWQ7XG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGhhbmRsZUF4aW9zRXJyb3IoZXJyLCBkaXNwYXRjaCwgJ0ZldGNoaW5nIEV4ZWN1dGlvbnMgRmFpbGVkJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuRXhlY3V0aW9uc0dyYXBofT5cbiAgICAgIHtzaG93TW9kYWwgJiYgY3VycmVudFdvcmtvdXQgJiYgKFxuICAgICAgICA8TW9kYWwgb25DbG9zZT17KCkgPT4gc2V0U2hvd01vZGFsKGZhbHNlKX0+XG4gICAgICAgICAgPERldGFpbGVkRXhlcmNpc2VcbiAgICAgICAgICAgIHRpbWU9e2Ake01hdGguZmxvb3IoY3VycmVudFdvcmtvdXQudGltZSAvIDYwKX06JHtTdHJpbmcoXG4gICAgICAgICAgICAgIGN1cnJlbnRXb3Jrb3V0LnRpbWUgJSA2MFxuICAgICAgICAgICAgKS5wYWRTdGFydCgyLCAnMCcpfSAoaClgfVxuICAgICAgICAgICAgdHJhaW5pbmdEYXlOYW1lPXtjdXJyZW50V29ya291dC50cmFpbmluZ0RheU5hbWV9XG4gICAgICAgICAgICB3b3Jrb3V0TmFtZT17Y3VycmVudFdvcmtvdXQubmFtZX1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtjdXJyZW50V29ya291dC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIGV4ZXJjaXNlcz17Y3VycmVudFdvcmtvdXQuZXhlcmNpc2VzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTW9kYWw+XG4gICAgICApfVxuICAgICAge2hhc0V4ZWN1dGlvbnMgJiYgKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHshIWV4ZWN1dGlvbnNEYXRhLmxlbmd0aCAmJiBkYXRlWzBdICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkdyYXBoVGl0bGV9PlxuICAgICAgICAgICAgICA8aDM+WW91ciB3ZWVrbHkgRXhlY3V0aW9uczo8L2gzPlxuICAgICAgICAgICAgICA8dGltZT57ZGF0ZVRvU3RyaW5nKGRhdGVbMF0hKX08L3RpbWU+IHRveycgJ31cbiAgICAgICAgICAgICAgPHRpbWU+e2RhdGVUb1N0cmluZyhkYXRlWzFdISl9PC90aW1lPlxuICAgICAgICAgICAgICB7YXZnICYmIChcbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgIEF2ZXJhZ2U6XG4gICAgICAgICAgICAgICAgICA8c3Ryb25nPiB7YXZnfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5DaGVja2JveH0+XG4gICAgICAgICAgICA8cD57Z3JhcGhUb0Rpc3BsYXkgPT09ICdiYXInID8gJ3BpZScgOiAnYmFyJ308L3A+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdDaGVja2JveCdcbiAgICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICAgIGlkPSdjaGFuZ2VHcmFwaCdcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2NoYW5nZUdyYXBoSGFuZGxlcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdTd2l0Y2hMYWJlbCcgaHRtbEZvcj0nY2hhbmdlR3JhcGgnPjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxzdmdcbiAgICAgICAgZGF0YS10ZXN0aWQ9J2Jhci1jaGFydCdcbiAgICAgICAgZGlzcGxheT17Z3JhcGhUb0Rpc3BsYXkgPT09ICdiYXInID8gJ2Jsb2NrJyA6ICdub25lJ31cbiAgICAgICAgaGVpZ2h0PXtkaW1lbnNpb25zLmhlaWdodH1cbiAgICAgICAgd2lkdGg9e2RpbWVuc2lvbnMud2lkdGh9XG4gICAgICAgIHJlZj17YmFyUmVmfVxuICAgICAgPjwvc3ZnPlxuICAgICAgPHN2Z1xuICAgICAgICBkYXRhLXRlc3RpZD0ncGllLWNoYXJ0J1xuICAgICAgICBkaXNwbGF5PXtncmFwaFRvRGlzcGxheSA9PT0gJ3BpZScgPyAnYmxvY2snIDogJ25vbmUnfVxuICAgICAgICBoZWlnaHQ9e3BpZURpbWVuc2lvbnMuaGVpZ2h0fVxuICAgICAgICB3aWR0aD17cGllRGltZW5zaW9ucy53aWR0aH1cbiAgICAgICAgcmVmPXtwaWVSZWZ9XG4gICAgICA+PC9zdmc+XG5cbiAgICAgIHshaGFzRXhlY3V0aW9ucyAmJiAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT17Y2xhc3Nlcy5Ob0V4ZWN1dGlvbnN9PlxuICAgICAgICAgIE5vIGV4ZWN1dGlvbiBoYXZlIGJlZW4gZGVjbGFyZWQgZHVyaW5nIHRoaXMgd2Vlay4uLlxuICAgICAgICA8L3A+XG4gICAgICApfVxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuSW5wdXR9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtY29udGFpbmVyJz5cbiAgICAgICAgICA8c2VsZWN0IG9uQ2hhbmdlPXtzZWxlY3RXZWVrSGFuZGxlcn0gaWQ9J3dlZWtTZWxlY3QnPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nJyBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXswfT50aGlzIHdlZWs8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezF9PjEgd2VlayBhZ288L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezJ9PjIgd2Vla3MgYWdvPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXszfT4zIHdlZWtzIGFnbzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17NH0+NCB3ZWVrcyBhZ288L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezV9Pndob2xlIG1vbnRoPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICBjbGFzc05hbWU9e3NlbGVjdEVsQWN0aXZlID8gJ0FjdGl2ZScgOiAnJ31cbiAgICAgICAgICAgIGh0bWxGb3I9J3dlZWtTZWxlY3QnXG4gICAgICAgICAgPlxuICAgICAgICAgICAgU2VsZWN0IHdlZWtcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhlY3V0aW9uc0dyYXBoO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuLi8uLi9zdHlsZXMvcGFnZXMvaG9tZS5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgcGx1c0ljb24gZnJvbSAnLi4vLi4vcHVibGljL2ljb25zL3BsdXMtaWNvbi5zdmcnO1xuaW1wb3J0IHsgRXhlcmNpc2UgfSBmcm9tICcuLi9SZWdpc3RyYXRpb24vd29ya291dC9Gb3Jtcy9FeGVyY2lzZSc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vVUkvTW9kYWwvTW9kYWwnO1xuaW1wb3J0IERldGFpbGVkRXhlcmNpc2UgZnJvbSAnLi9EZXRhaWxlZEV4ZXJjaXNlJztcblxuaW50ZXJmYWNlIFRvbW9ycm93TWlzc2lvblByb3BzIHtcbiAgdHJhaW5pbmdEYXlOYW1lOiBzdHJpbmc7XG4gIGV4ZXJjaXNlcz86IEV4ZXJjaXNlW107XG4gIHdvcmtvdXROYW1lPzogc3RyaW5nO1xuICB0aW1lOiBudW1iZXIgfCBudWxsO1xufVxuXG5jb25zdCBUb21vcnJvd01pc3Npb246IFJlYWN0LkZDPFRvbW9ycm93TWlzc2lvblByb3BzPiA9ICh7XG4gIHRyYWluaW5nRGF5TmFtZSxcbiAgZXhlcmNpc2VzLFxuICB0aW1lLFxuICB3b3Jrb3V0TmFtZSxcbn0pID0+IHtcbiAgY29uc3QgW3Nob3dNb2RhbCwgc2V0U2hvd01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHRvbW9ycm93ID1cbiAgICB0b2RheS5nZXREYXRlKCkgK1xuICAgIDEgK1xuICAgICctJyArXG4gICAgKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArXG4gICAgJy0nICtcbiAgICB0b2RheS5nZXRGdWxsWWVhcigpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuVG9tb3Jyb3dNaXNzaW9ufT5cbiAgICAgIHtzaG93TW9kYWwgJiYgZXhlcmNpc2VzPy5sZW5ndGggJiYgd29ya291dE5hbWUgJiYgKFxuICAgICAgICA8TW9kYWwgb25DbG9zZT17KCkgPT4gc2V0U2hvd01vZGFsKGZhbHNlKX0+XG4gICAgICAgICAgPERldGFpbGVkRXhlcmNpc2VcbiAgICAgICAgICAgIGV4ZXJjaXNlcz17ZXhlcmNpc2VzfVxuICAgICAgICAgICAgdGltZT17dG9tb3Jyb3d9XG4gICAgICAgICAgICB0cmFpbmluZ0RheU5hbWU9e3RyYWluaW5nRGF5TmFtZX1cbiAgICAgICAgICAgIHdvcmtvdXROYW1lPXt3b3Jrb3V0TmFtZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgKX1cbiAgICAgIDxoMz5Ub21vcnJvdyBNaXNzaW9uOjwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICB7d29ya291dE5hbWUgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICA8c3Ryb25nPldvcmtvdXQ6IDwvc3Ryb25nPlxuICAgICAgICAgICAgICB7d29ya291dE5hbWV9ICh7dHJhaW5pbmdEYXlOYW1lfSlcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIHt0aW1lICYmIChcbiAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5UaW1lOiA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7dGltZX0gKG1pbnV0ZXMpXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3Ryb25nPldvcmtvdXQ6IDwvc3Ryb25nPlJlc3QgRGF5IChYKVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHN0cm9uZz5NYXggUG9pbnRzOiA8L3N0cm9uZz5cbiAgICAgICAgICAxMFxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPihZb3UgYWxyZWFkeSBkaWQgYW5kIGRlY2xhcmVkIHlvdXIgd29ya291dCBmb3IgdG9kYXkpPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICB7ISFleGVyY2lzZXM/Lmxlbmd0aCAmJiB3b3Jrb3V0TmFtZSAmJiAoXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdza2lwLWJ1dHRvbicgb25DbGljaz17KCkgPT4gc2V0U2hvd01vZGFsKHRydWUpfT5cbiAgICAgICAgICBNb3JlXG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7cGx1c0ljb24gJiYgKFxuICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e3BsdXNJY29ufVxuICAgICAgICAgICAgICAgIHdpZHRoPXsxMi41fVxuICAgICAgICAgICAgICAgIGhlaWdodD17MTIuNX1cbiAgICAgICAgICAgICAgICBhbHQ9J3BsdXMgaWNvbidcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb21vcnJvd01pc3Npb247XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi4vLi4vLi9zdHlsZXMvcGFnZXMvaG9tZS5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgTGluZSBmcm9tICcuLi9VSS9TVkdzL3RpdGxlLWxpbmUnO1xuXG5jb25zdCBVc2VyU2NvcmU6IFJlYWN0LkZDPHsgZ3JhZGU6IG51bWJlciB9PiA9ICh7IGdyYWRlIH0pID0+IHtcbiAgY29uc3QgW2Rpc3BsYXllZFNjb3JlLCBzZXREaXNwbGF5ZWRTY29yZV0gPSB1c2VTdGF0ZShNYXRoLmZsb29yKGdyYWRlICogMC44KSk7XG4gIGNvbnN0IFtkaXNwbGF5QW5pbWF0aW9uLCBzZXREaXNwbGF5QW5pbWF0aW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaXNwbGF5ZWRTY29yZSA+PSBncmFkZSkge1xuICAgICAgc2V0RGlzcGxheUFuaW1hdGlvbih0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXREaXNwbGF5QW5pbWF0aW9uKGZhbHNlKTtcbiAgICAgIH0sIDQwMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0RGlzcGxheWVkU2NvcmUoKHByZXYpID0+ICsrcHJldik7XG4gICAgfSwgMzAwMCAvIGdyYWRlKTtcbiAgfSwgW2Rpc3BsYXllZFNjb3JlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Vc2VyU2NvcmV9PlxuICAgICAgPGgzPkN1cnJlbnQgU2NvcmU6PC9oMz5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICBkaXNwbGF5QW5pbWF0aW9uID8gY2xhc3Nlcy5BbmltYXRpb25TdGFydCA6IGNsYXNzZXMuQW5pbWF0aW9uRW5kXG4gICAgICAgIH1cbiAgICAgID5cbiAgICAgICAgPHA+e2Rpc3BsYXllZFNjb3JlfTwvcD5cbiAgICAgICAgPExpbmUgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlclNjb3JlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ9cmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuZGVmYXVsdD1JbWFnZTt2YXIgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiKSk7dmFyIF9leHRlbmRzMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHNcIikpO3ZhciBfcmVhY3Q9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO3ZhciBfaGVhZD1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvaGVhZFwiKSk7dmFyIF90b0Jhc2U9cmVxdWlyZShcIi4uL25leHQtc2VydmVyL2xpYi90by1iYXNlLTY0XCIpO3ZhciBfaW1hZ2VDb25maWc9cmVxdWlyZShcIi4uL25leHQtc2VydmVyL3NlcnZlci9pbWFnZS1jb25maWdcIik7dmFyIF91c2VJbnRlcnNlY3Rpb249cmVxdWlyZShcIi4vdXNlLWludGVyc2VjdGlvblwiKTtpZih0eXBlb2Ygd2luZG93PT09J3VuZGVmaW5lZCcpeztnbG9iYWwuX19ORVhUX0lNQUdFX0lNUE9SVEVEPXRydWU7fWNvbnN0IFZBTElEX0xPQURJTkdfVkFMVUVTPVsnbGF6eScsJ2VhZ2VyJyx1bmRlZmluZWRdO2NvbnN0IGxvYWRlcnM9bmV3IE1hcChbWydpbWdpeCcsaW1naXhMb2FkZXJdLFsnY2xvdWRpbmFyeScsY2xvdWRpbmFyeUxvYWRlcl0sWydha2FtYWknLGFrYW1haUxvYWRlcl0sWydkZWZhdWx0JyxkZWZhdWx0TG9hZGVyXV0pO2NvbnN0IFZBTElEX0xBWU9VVF9WQUxVRVM9WydmaWxsJywnZml4ZWQnLCdpbnRyaW5zaWMnLCdyZXNwb25zaXZlJyx1bmRlZmluZWRdO2Z1bmN0aW9uIGlzU3RhdGljUmVxdWlyZShzcmMpe3JldHVybiBzcmMuZGVmYXVsdCE9PXVuZGVmaW5lZDt9ZnVuY3Rpb24gaXNTdGF0aWNJbWFnZURhdGEoc3JjKXtyZXR1cm4gc3JjLnNyYyE9PXVuZGVmaW5lZDt9ZnVuY3Rpb24gaXNTdGF0aWNJbXBvcnQoc3JjKXtyZXR1cm4gdHlwZW9mIHNyYz09PSdvYmplY3QnJiYoaXNTdGF0aWNSZXF1aXJlKHNyYyl8fGlzU3RhdGljSW1hZ2VEYXRhKHNyYykpO31jb25zdHtkZXZpY2VTaXplczpjb25maWdEZXZpY2VTaXplcyxpbWFnZVNpemVzOmNvbmZpZ0ltYWdlU2l6ZXMsbG9hZGVyOmNvbmZpZ0xvYWRlcixwYXRoOmNvbmZpZ1BhdGgsZG9tYWluczpjb25maWdEb21haW5zfT1wcm9jZXNzLmVudi5fX05FWFRfSU1BR0VfT1BUU3x8X2ltYWdlQ29uZmlnLmltYWdlQ29uZmlnRGVmYXVsdDsvLyBzb3J0IHNtYWxsZXN0IHRvIGxhcmdlc3RcbmNvbnN0IGFsbFNpemVzPVsuLi5jb25maWdEZXZpY2VTaXplcywuLi5jb25maWdJbWFnZVNpemVzXTtjb25maWdEZXZpY2VTaXplcy5zb3J0KChhLGIpPT5hLWIpO2FsbFNpemVzLnNvcnQoKGEsYik9PmEtYik7ZnVuY3Rpb24gZ2V0V2lkdGhzKHdpZHRoLGxheW91dCxzaXplcyl7aWYoc2l6ZXMmJihsYXlvdXQ9PT0nZmlsbCd8fGxheW91dD09PSdyZXNwb25zaXZlJykpey8vIEZpbmQgYWxsIHRoZSBcInZ3XCIgcGVyY2VudCBzaXplcyB1c2VkIGluIHRoZSBzaXplcyBwcm9wXG5jb25zdCB2aWV3cG9ydFdpZHRoUmU9LyhefFxccykoMT9cXGQ/XFxkKXZ3L2c7Y29uc3QgcGVyY2VudFNpemVzPVtdO2ZvcihsZXQgbWF0Y2g7bWF0Y2g9dmlld3BvcnRXaWR0aFJlLmV4ZWMoc2l6ZXMpO21hdGNoKXtwZXJjZW50U2l6ZXMucHVzaChwYXJzZUludChtYXRjaFsyXSkpO31pZihwZXJjZW50U2l6ZXMubGVuZ3RoKXtjb25zdCBzbWFsbGVzdFJhdGlvPU1hdGgubWluKC4uLnBlcmNlbnRTaXplcykqMC4wMTtyZXR1cm57d2lkdGhzOmFsbFNpemVzLmZpbHRlcihzPT5zPj1jb25maWdEZXZpY2VTaXplc1swXSpzbWFsbGVzdFJhdGlvKSxraW5kOid3J307fXJldHVybnt3aWR0aHM6YWxsU2l6ZXMsa2luZDondyd9O31pZih0eXBlb2Ygd2lkdGghPT0nbnVtYmVyJ3x8bGF5b3V0PT09J2ZpbGwnfHxsYXlvdXQ9PT0ncmVzcG9uc2l2ZScpe3JldHVybnt3aWR0aHM6Y29uZmlnRGV2aWNlU2l6ZXMsa2luZDondyd9O31jb25zdCB3aWR0aHM9Wy4uLm5ldyBTZXQoLy8gPiBUaGlzIG1lYW5zIHRoYXQgbW9zdCBPTEVEIHNjcmVlbnMgdGhhdCBzYXkgdGhleSBhcmUgM3ggcmVzb2x1dGlvbixcbi8vID4gYXJlIGFjdHVhbGx5IDN4IGluIHRoZSBncmVlbiBjb2xvciwgYnV0IG9ubHkgMS41eCBpbiB0aGUgcmVkIGFuZFxuLy8gPiBibHVlIGNvbG9ycy4gU2hvd2luZyBhIDN4IHJlc29sdXRpb24gaW1hZ2UgaW4gdGhlIGFwcCB2cyBhIDJ4XG4vLyA+IHJlc29sdXRpb24gaW1hZ2Ugd2lsbCBiZSB2aXN1YWxseSB0aGUgc2FtZSwgdGhvdWdoIHRoZSAzeCBpbWFnZVxuLy8gPiB0YWtlcyBzaWduaWZpY2FudGx5IG1vcmUgZGF0YS4gRXZlbiB0cnVlIDN4IHJlc29sdXRpb24gc2NyZWVucyBhcmVcbi8vID4gd2FzdGVmdWwgYXMgdGhlIGh1bWFuIGV5ZSBjYW5ub3Qgc2VlIHRoYXQgbGV2ZWwgb2YgZGV0YWlsIHdpdGhvdXRcbi8vID4gc29tZXRoaW5nIGxpa2UgYSBtYWduaWZ5aW5nIGdsYXNzLlxuLy8gaHR0cHM6Ly9ibG9nLnR3aXR0ZXIuY29tL2VuZ2luZWVyaW5nL2VuX3VzL3RvcGljcy9pbmZyYXN0cnVjdHVyZS8yMDE5L2NhcHBpbmctaW1hZ2UtZmlkZWxpdHktb24tdWx0cmEtaGlnaC1yZXNvbHV0aW9uLWRldmljZXMuaHRtbFxuW3dpZHRoLHdpZHRoKjIvKiwgd2lkdGggKiAzKi9dLm1hcCh3PT5hbGxTaXplcy5maW5kKHA9PnA+PXcpfHxhbGxTaXplc1thbGxTaXplcy5sZW5ndGgtMV0pKV07cmV0dXJue3dpZHRocyxraW5kOid4J307fWZ1bmN0aW9uIGdlbmVyYXRlSW1nQXR0cnMoe3NyYyx1bm9wdGltaXplZCxsYXlvdXQsd2lkdGgscXVhbGl0eSxzaXplcyxsb2FkZXJ9KXtpZih1bm9wdGltaXplZCl7cmV0dXJue3NyYyxzcmNTZXQ6dW5kZWZpbmVkLHNpemVzOnVuZGVmaW5lZH07fWNvbnN0e3dpZHRocyxraW5kfT1nZXRXaWR0aHMod2lkdGgsbGF5b3V0LHNpemVzKTtjb25zdCBsYXN0PXdpZHRocy5sZW5ndGgtMTtyZXR1cm57c2l6ZXM6IXNpemVzJiZraW5kPT09J3cnPycxMDB2dyc6c2l6ZXMsc3JjU2V0OndpZHRocy5tYXAoKHcsaSk9PmAke2xvYWRlcih7c3JjLHF1YWxpdHksd2lkdGg6d30pfSAke2tpbmQ9PT0ndyc/dzppKzF9JHtraW5kfWApLmpvaW4oJywgJyksLy8gSXQncyBpbnRlbmRlZCB0byBrZWVwIGBzcmNgIHRoZSBsYXN0IGF0dHJpYnV0ZSBiZWNhdXNlIFJlYWN0IHVwZGF0ZXNcbi8vIGF0dHJpYnV0ZXMgaW4gb3JkZXIuIElmIHdlIGtlZXAgYHNyY2AgdGhlIGZpcnN0IG9uZSwgU2FmYXJpIHdpbGxcbi8vIGltbWVkaWF0ZWx5IHN0YXJ0IHRvIGZldGNoIGBzcmNgLCBiZWZvcmUgYHNpemVzYCBhbmQgYHNyY1NldGAgYXJlIGV2ZW5cbi8vIHVwZGF0ZWQgYnkgUmVhY3QuIFRoYXQgY2F1c2VzIG11bHRpcGxlIHVubmVjZXNzYXJ5IHJlcXVlc3RzIGlmIGBzcmNTZXRgXG4vLyBhbmQgYHNpemVzYCBhcmUgZGVmaW5lZC5cbi8vIFRoaXMgYnVnIGNhbm5vdCBiZSByZXByb2R1Y2VkIGluIENocm9tZSBvciBGaXJlZm94Llxuc3JjOmxvYWRlcih7c3JjLHF1YWxpdHksd2lkdGg6d2lkdGhzW2xhc3RdfSl9O31mdW5jdGlvbiBnZXRJbnQoeCl7aWYodHlwZW9mIHg9PT0nbnVtYmVyJyl7cmV0dXJuIHg7fWlmKHR5cGVvZiB4PT09J3N0cmluZycpe3JldHVybiBwYXJzZUludCh4LDEwKTt9cmV0dXJuIHVuZGVmaW5lZDt9ZnVuY3Rpb24gZGVmYXVsdEltYWdlTG9hZGVyKGxvYWRlclByb3BzKXtjb25zdCBsb2FkPWxvYWRlcnMuZ2V0KGNvbmZpZ0xvYWRlcik7aWYobG9hZCl7cmV0dXJuIGxvYWQoKDAsX2V4dGVuZHMyLmRlZmF1bHQpKHtyb290OmNvbmZpZ1BhdGh9LGxvYWRlclByb3BzKSk7fXRocm93IG5ldyBFcnJvcihgVW5rbm93biBcImxvYWRlclwiIGZvdW5kIGluIFwibmV4dC5jb25maWcuanNcIi4gRXhwZWN0ZWQ6ICR7X2ltYWdlQ29uZmlnLlZBTElEX0xPQURFUlMuam9pbignLCAnKX0uIFJlY2VpdmVkOiAke2NvbmZpZ0xvYWRlcn1gKTt9Ly8gU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8zOTc3NzgzMy8yNjY1MzUgZm9yIHdoeSB3ZSB1c2UgdGhpcyByZWZcbi8vIGhhbmRsZXIgaW5zdGVhZCBvZiB0aGUgaW1nJ3Mgb25Mb2FkIGF0dHJpYnV0ZS5cbmZ1bmN0aW9uIHJlbW92ZVBsYWNlaG9sZGVyKGltZyxwbGFjZWhvbGRlcil7aWYocGxhY2Vob2xkZXI9PT0nYmx1cicmJmltZyl7Y29uc3QgaGFuZGxlTG9hZD0oKT0+e2lmKCFpbWcuc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6Jykpe2NvbnN0IHA9J2RlY29kZSdpbiBpbWc/aW1nLmRlY29kZSgpOlByb21pc2UucmVzb2x2ZSgpO3AuY2F0Y2goKCk9Pnt9KS50aGVuKCgpPT57aW1nLnN0eWxlLmZpbHRlcj0nbm9uZSc7aW1nLnN0eWxlLmJhY2tncm91bmRTaXplPSdub25lJztpbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlPSdub25lJzt9KTt9fTtpZihpbWcuY29tcGxldGUpey8vIElmIHRoZSByZWFsIGltYWdlIGZhaWxzIHRvIGxvYWQsIHRoaXMgd2lsbCBzdGlsbCByZW1vdmUgdGhlIHBsYWNlaG9sZGVyLlxuLy8gVGhpcyBpcyB0aGUgZGVzaXJlZCBiZWhhdmlvciBmb3Igbm93LCBhbmQgd2lsbCBiZSByZXZpc2l0ZWQgd2hlbiBlcnJvclxuLy8gaGFuZGxpbmcgaXMgd29ya2VkIG9uIGZvciB0aGUgaW1hZ2UgY29tcG9uZW50IGl0c2VsZi5cbmhhbmRsZUxvYWQoKTt9ZWxzZXtpbWcub25sb2FkPWhhbmRsZUxvYWQ7fX19ZnVuY3Rpb24gSW1hZ2UoX3JlZil7bGV0e3NyYyxzaXplcyx1bm9wdGltaXplZD1mYWxzZSxwcmlvcml0eT1mYWxzZSxsb2FkaW5nLGNsYXNzTmFtZSxxdWFsaXR5LHdpZHRoLGhlaWdodCxvYmplY3RGaXQsb2JqZWN0UG9zaXRpb24sbG9hZGVyPWRlZmF1bHRJbWFnZUxvYWRlcixwbGFjZWhvbGRlcj0nZW1wdHknLGJsdXJEYXRhVVJMfT1fcmVmLGFsbD0oMCxfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTIuZGVmYXVsdCkoX3JlZixbXCJzcmNcIixcInNpemVzXCIsXCJ1bm9wdGltaXplZFwiLFwicHJpb3JpdHlcIixcImxvYWRpbmdcIixcImNsYXNzTmFtZVwiLFwicXVhbGl0eVwiLFwid2lkdGhcIixcImhlaWdodFwiLFwib2JqZWN0Rml0XCIsXCJvYmplY3RQb3NpdGlvblwiLFwibG9hZGVyXCIsXCJwbGFjZWhvbGRlclwiLFwiYmx1ckRhdGFVUkxcIl0pO2xldCByZXN0PWFsbDtsZXQgbGF5b3V0PXNpemVzPydyZXNwb25zaXZlJzonaW50cmluc2ljJztpZignbGF5b3V0J2luIHJlc3Qpey8vIE92ZXJyaWRlIGRlZmF1bHQgbGF5b3V0IGlmIHRoZSB1c2VyIHNwZWNpZmllZCBvbmU6XG5pZihyZXN0LmxheW91dClsYXlvdXQ9cmVzdC5sYXlvdXQ7Ly8gUmVtb3ZlIHByb3BlcnR5IHNvIGl0J3Mgbm90IHNwcmVhZCBpbnRvIGltYWdlOlxuZGVsZXRlIHJlc3RbJ2xheW91dCddO31sZXQgc3RhdGljU3JjPScnO2lmKGlzU3RhdGljSW1wb3J0KHNyYykpe2NvbnN0IHN0YXRpY0ltYWdlRGF0YT1pc1N0YXRpY1JlcXVpcmUoc3JjKT9zcmMuZGVmYXVsdDpzcmM7aWYoIXN0YXRpY0ltYWdlRGF0YS5zcmMpe3Rocm93IG5ldyBFcnJvcihgQW4gb2JqZWN0IHNob3VsZCBvbmx5IGJlIHBhc3NlZCB0byB0aGUgaW1hZ2UgY29tcG9uZW50IHNyYyBwYXJhbWV0ZXIgaWYgaXQgY29tZXMgZnJvbSBhIHN0YXRpYyBpbWFnZSBpbXBvcnQuIEl0IG11c3QgaW5jbHVkZSBzcmMuIFJlY2VpdmVkICR7SlNPTi5zdHJpbmdpZnkoc3RhdGljSW1hZ2VEYXRhKX1gKTt9Ymx1ckRhdGFVUkw9Ymx1ckRhdGFVUkx8fHN0YXRpY0ltYWdlRGF0YS5ibHVyRGF0YVVSTDtzdGF0aWNTcmM9c3RhdGljSW1hZ2VEYXRhLnNyYztpZighbGF5b3V0fHxsYXlvdXQhPT0nZmlsbCcpe2hlaWdodD1oZWlnaHR8fHN0YXRpY0ltYWdlRGF0YS5oZWlnaHQ7d2lkdGg9d2lkdGh8fHN0YXRpY0ltYWdlRGF0YS53aWR0aDtpZighc3RhdGljSW1hZ2VEYXRhLmhlaWdodHx8IXN0YXRpY0ltYWdlRGF0YS53aWR0aCl7dGhyb3cgbmV3IEVycm9yKGBBbiBvYmplY3Qgc2hvdWxkIG9ubHkgYmUgcGFzc2VkIHRvIHRoZSBpbWFnZSBjb21wb25lbnQgc3JjIHBhcmFtZXRlciBpZiBpdCBjb21lcyBmcm9tIGEgc3RhdGljIGltYWdlIGltcG9ydC4gSXQgbXVzdCBpbmNsdWRlIGhlaWdodCBhbmQgd2lkdGguIFJlY2VpdmVkICR7SlNPTi5zdHJpbmdpZnkoc3RhdGljSW1hZ2VEYXRhKX1gKTt9fX1zcmM9dHlwZW9mIHNyYz09PSdzdHJpbmcnP3NyYzpzdGF0aWNTcmM7Y29uc3Qgd2lkdGhJbnQ9Z2V0SW50KHdpZHRoKTtjb25zdCBoZWlnaHRJbnQ9Z2V0SW50KGhlaWdodCk7Y29uc3QgcXVhbGl0eUludD1nZXRJbnQocXVhbGl0eSk7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbicpe2lmKCFzcmMpe3Rocm93IG5ldyBFcnJvcihgSW1hZ2UgaXMgbWlzc2luZyByZXF1aXJlZCBcInNyY1wiIHByb3BlcnR5LiBNYWtlIHN1cmUgeW91IHBhc3MgXCJzcmNcIiBpbiBwcm9wcyB0byB0aGUgXFxgbmV4dC9pbWFnZVxcYCBjb21wb25lbnQuIFJlY2VpdmVkOiAke0pTT04uc3RyaW5naWZ5KHt3aWR0aCxoZWlnaHQscXVhbGl0eX0pfWApO31pZighVkFMSURfTEFZT1VUX1ZBTFVFUy5pbmNsdWRlcyhsYXlvdXQpKXt0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGludmFsaWQgXCJsYXlvdXRcIiBwcm9wZXJ0eS4gUHJvdmlkZWQgXCIke2xheW91dH1cIiBzaG91bGQgYmUgb25lIG9mICR7VkFMSURfTEFZT1VUX1ZBTFVFUy5tYXAoU3RyaW5nKS5qb2luKCcsJyl9LmApO31pZih0eXBlb2Ygd2lkdGhJbnQhPT0ndW5kZWZpbmVkJyYmaXNOYU4od2lkdGhJbnQpfHx0eXBlb2YgaGVpZ2h0SW50IT09J3VuZGVmaW5lZCcmJmlzTmFOKGhlaWdodEludCkpe3Rocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcIndpZHRoXCIgb3IgXCJoZWlnaHRcIiBwcm9wZXJ0eS4gVGhlc2Ugc2hvdWxkIGJlIG51bWVyaWMgdmFsdWVzLmApO31pZighVkFMSURfTE9BRElOR19WQUxVRVMuaW5jbHVkZXMobG9hZGluZykpe3Rocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcImxvYWRpbmdcIiBwcm9wZXJ0eS4gUHJvdmlkZWQgXCIke2xvYWRpbmd9XCIgc2hvdWxkIGJlIG9uZSBvZiAke1ZBTElEX0xPQURJTkdfVkFMVUVTLm1hcChTdHJpbmcpLmpvaW4oJywnKX0uYCk7fWlmKHByaW9yaXR5JiZsb2FkaW5nPT09J2xhenknKXt0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGJvdGggXCJwcmlvcml0eVwiIGFuZCBcImxvYWRpbmc9J2xhenknXCIgcHJvcGVydGllcy4gT25seSBvbmUgc2hvdWxkIGJlIHVzZWQuYCk7fWlmKHBsYWNlaG9sZGVyPT09J2JsdXInKXtpZihsYXlvdXQhPT0nZmlsbCcmJih3aWR0aEludHx8MCkqKGhlaWdodEludHx8MCk8MTYwMCl7Y29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGlzIHNtYWxsZXIgdGhhbiA0MHg0MC4gQ29uc2lkZXIgcmVtb3ZpbmcgdGhlIFwicGxhY2Vob2xkZXI9J2JsdXInXCIgcHJvcGVydHkgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZS5gKTt9aWYoIWJsdXJEYXRhVVJMKXtjb25zdCBWQUxJRF9CTFVSX0VYVD1bJ2pwZWcnLCdwbmcnLCd3ZWJwJ107Ly8gc2hvdWxkIG1hdGNoIG5leHQtaW1hZ2UtbG9hZGVyXG50aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIFwicGxhY2Vob2xkZXI9J2JsdXInXCIgcHJvcGVydHkgYnV0IGlzIG1pc3NpbmcgdGhlIFwiYmx1ckRhdGFVUkxcIiBwcm9wZXJ0eS5cbiAgICAgICAgICBQb3NzaWJsZSBzb2x1dGlvbnM6XG4gICAgICAgICAgICAtIEFkZCBhIFwiYmx1ckRhdGFVUkxcIiBwcm9wZXJ0eSwgdGhlIGNvbnRlbnRzIHNob3VsZCBiZSBhIHNtYWxsIERhdGEgVVJMIHRvIHJlcHJlc2VudCB0aGUgaW1hZ2VcbiAgICAgICAgICAgIC0gQ2hhbmdlIHRoZSBcInNyY1wiIHByb3BlcnR5IHRvIGEgc3RhdGljIGltcG9ydCB3aXRoIG9uZSBvZiB0aGUgc3VwcG9ydGVkIGZpbGUgdHlwZXM6ICR7VkFMSURfQkxVUl9FWFQuam9pbignLCcpfVxuICAgICAgICAgICAgLSBSZW1vdmUgdGhlIFwicGxhY2Vob2xkZXJcIiBwcm9wZXJ0eSwgZWZmZWN0aXZlbHkgbm8gYmx1ciBlZmZlY3RcbiAgICAgICAgICBSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL3BsYWNlaG9sZGVyLWJsdXItZGF0YS11cmxgKTt9fX1sZXQgaXNMYXp5PSFwcmlvcml0eSYmKGxvYWRpbmc9PT0nbGF6eSd8fHR5cGVvZiBsb2FkaW5nPT09J3VuZGVmaW5lZCcpO2lmKHNyYyYmc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6Jykpey8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQmFzaWNzX29mX0hUVFAvRGF0YV9VUklzXG51bm9wdGltaXplZD10cnVlO2lzTGF6eT1mYWxzZTt9Y29uc3Rbc2V0UmVmLGlzSW50ZXJzZWN0ZWRdPSgwLF91c2VJbnRlcnNlY3Rpb24udXNlSW50ZXJzZWN0aW9uKSh7cm9vdE1hcmdpbjonMjAwcHgnLGRpc2FibGVkOiFpc0xhenl9KTtjb25zdCBpc1Zpc2libGU9IWlzTGF6eXx8aXNJbnRlcnNlY3RlZDtsZXQgd3JhcHBlclN0eWxlO2xldCBzaXplclN0eWxlO2xldCBzaXplclN2ZztsZXQgaW1nU3R5bGU9KDAsX2V4dGVuZHMyLmRlZmF1bHQpKHtwb3NpdGlvbjonYWJzb2x1dGUnLHRvcDowLGxlZnQ6MCxib3R0b206MCxyaWdodDowLGJveFNpemluZzonYm9yZGVyLWJveCcscGFkZGluZzowLGJvcmRlcjonbm9uZScsbWFyZ2luOidhdXRvJyxkaXNwbGF5OidibG9jaycsd2lkdGg6MCxoZWlnaHQ6MCxtaW5XaWR0aDonMTAwJScsbWF4V2lkdGg6JzEwMCUnLG1pbkhlaWdodDonMTAwJScsbWF4SGVpZ2h0OicxMDAlJyxvYmplY3RGaXQsb2JqZWN0UG9zaXRpb259LHBsYWNlaG9sZGVyPT09J2JsdXInP3tmaWx0ZXI6J2JsdXIoMjBweCknLGJhY2tncm91bmRTaXplOidjb3ZlcicsYmFja2dyb3VuZEltYWdlOmB1cmwoXCIke2JsdXJEYXRhVVJMfVwiKWB9OnVuZGVmaW5lZCk7aWYodHlwZW9mIHdpZHRoSW50IT09J3VuZGVmaW5lZCcmJnR5cGVvZiBoZWlnaHRJbnQhPT0ndW5kZWZpbmVkJyYmbGF5b3V0IT09J2ZpbGwnKXsvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIC8+XG5jb25zdCBxdW90aWVudD1oZWlnaHRJbnQvd2lkdGhJbnQ7Y29uc3QgcGFkZGluZ1RvcD1pc05hTihxdW90aWVudCk/JzEwMCUnOmAke3F1b3RpZW50KjEwMH0lYDtpZihsYXlvdXQ9PT0ncmVzcG9uc2l2ZScpey8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwicmVzcG9uc2l2ZVwiIC8+XG53cmFwcGVyU3R5bGU9e2Rpc3BsYXk6J2Jsb2NrJyxvdmVyZmxvdzonaGlkZGVuJyxwb3NpdGlvbjoncmVsYXRpdmUnLGJveFNpemluZzonYm9yZGVyLWJveCcsbWFyZ2luOjB9O3NpemVyU3R5bGU9e2Rpc3BsYXk6J2Jsb2NrJyxib3hTaXppbmc6J2JvcmRlci1ib3gnLHBhZGRpbmdUb3B9O31lbHNlIGlmKGxheW91dD09PSdpbnRyaW5zaWMnKXsvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIGxheW91dD1cImludHJpbnNpY1wiIC8+XG53cmFwcGVyU3R5bGU9e2Rpc3BsYXk6J2lubGluZS1ibG9jaycsbWF4V2lkdGg6JzEwMCUnLG92ZXJmbG93OidoaWRkZW4nLHBvc2l0aW9uOidyZWxhdGl2ZScsYm94U2l6aW5nOidib3JkZXItYm94JyxtYXJnaW46MH07c2l6ZXJTdHlsZT17Ym94U2l6aW5nOidib3JkZXItYm94JyxkaXNwbGF5OidibG9jaycsbWF4V2lkdGg6JzEwMCUnfTtzaXplclN2Zz1gPHN2ZyB3aWR0aD1cIiR7d2lkdGhJbnR9XCIgaGVpZ2h0PVwiJHtoZWlnaHRJbnR9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIi8+YDt9ZWxzZSBpZihsYXlvdXQ9PT0nZml4ZWQnKXsvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIGxheW91dD1cImZpeGVkXCIgLz5cbndyYXBwZXJTdHlsZT17b3ZlcmZsb3c6J2hpZGRlbicsYm94U2l6aW5nOidib3JkZXItYm94JyxkaXNwbGF5OidpbmxpbmUtYmxvY2snLHBvc2l0aW9uOidyZWxhdGl2ZScsd2lkdGg6d2lkdGhJbnQsaGVpZ2h0OmhlaWdodEludH07fX1lbHNlIGlmKHR5cGVvZiB3aWR0aEludD09PSd1bmRlZmluZWQnJiZ0eXBlb2YgaGVpZ2h0SW50PT09J3VuZGVmaW5lZCcmJmxheW91dD09PSdmaWxsJyl7Ly8gPEltYWdlIHNyYz1cImkucG5nXCIgbGF5b3V0PVwiZmlsbFwiIC8+XG53cmFwcGVyU3R5bGU9e2Rpc3BsYXk6J2Jsb2NrJyxvdmVyZmxvdzonaGlkZGVuJyxwb3NpdGlvbjonYWJzb2x1dGUnLHRvcDowLGxlZnQ6MCxib3R0b206MCxyaWdodDowLGJveFNpemluZzonYm9yZGVyLWJveCcsbWFyZ2luOjB9O31lbHNley8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIC8+XG5pZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7dGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG11c3QgdXNlIFwid2lkdGhcIiBhbmQgXCJoZWlnaHRcIiBwcm9wZXJ0aWVzIG9yIFwibGF5b3V0PSdmaWxsJ1wiIHByb3BlcnR5LmApO319bGV0IGltZ0F0dHJpYnV0ZXM9e3NyYzonZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3JyxzcmNTZXQ6dW5kZWZpbmVkLHNpemVzOnVuZGVmaW5lZH07aWYoaXNWaXNpYmxlKXtpbWdBdHRyaWJ1dGVzPWdlbmVyYXRlSW1nQXR0cnMoe3NyYyx1bm9wdGltaXplZCxsYXlvdXQsd2lkdGg6d2lkdGhJbnQscXVhbGl0eTpxdWFsaXR5SW50LHNpemVzLGxvYWRlcn0pO31yZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtzdHlsZTp3cmFwcGVyU3R5bGV9LHNpemVyU3R5bGU/LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7c3R5bGU6c2l6ZXJTdHlsZX0sc2l6ZXJTdmc/LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIix7c3R5bGU6e21heFdpZHRoOicxMDAlJyxkaXNwbGF5OidibG9jaycsbWFyZ2luOjAsYm9yZGVyOidub25lJyxwYWRkaW5nOjB9LGFsdDpcIlwiLFwiYXJpYS1oaWRkZW5cIjp0cnVlLHJvbGU6XCJwcmVzZW50YXRpb25cIixzcmM6YGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJHsoMCxfdG9CYXNlLnRvQmFzZTY0KShzaXplclN2Zyl9YH0pOm51bGwpOm51bGwsIWlzVmlzaWJsZSYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIixPYmplY3QuYXNzaWduKHt9LHJlc3QsZ2VuZXJhdGVJbWdBdHRycyh7c3JjLHVub3B0aW1pemVkLGxheW91dCx3aWR0aDp3aWR0aEludCxxdWFsaXR5OnF1YWxpdHlJbnQsc2l6ZXMsbG9hZGVyfSkse2RlY29kaW5nOlwiYXN5bmNcIixzdHlsZTppbWdTdHlsZSxjbGFzc05hbWU6Y2xhc3NOYW1lfSkpKSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLE9iamVjdC5hc3NpZ24oe30scmVzdCxpbWdBdHRyaWJ1dGVzLHtkZWNvZGluZzpcImFzeW5jXCIsY2xhc3NOYW1lOmNsYXNzTmFtZSxyZWY6ZWxlbWVudD0+e3NldFJlZihlbGVtZW50KTtyZW1vdmVQbGFjZWhvbGRlcihlbGVtZW50LHBsYWNlaG9sZGVyKTt9LHN0eWxlOmltZ1N0eWxlfSkpLHByaW9yaXR5Py8qI19fUFVSRV9fKi8gLy8gTm90ZSBob3cgd2Ugb21pdCB0aGUgYGhyZWZgIGF0dHJpYnV0ZSwgYXMgaXQgd291bGQgb25seSBiZSByZWxldmFudFxuLy8gZm9yIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgYGltYWdlc3Jjc2V0YCwgYW5kIGluIHRob3NlIGNhc2VzXG4vLyBpdCB3b3VsZCBsaWtlbHkgY2F1c2UgdGhlIGluY29ycmVjdCBpbWFnZSB0byBiZSBwcmVsb2FkZWQuXG4vL1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2VtYW50aWNzLmh0bWwjYXR0ci1saW5rLWltYWdlc3Jjc2V0XG5fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9oZWFkLmRlZmF1bHQsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7a2V5OidfX25pbWctJytpbWdBdHRyaWJ1dGVzLnNyYytpbWdBdHRyaWJ1dGVzLnNyY1NldCtpbWdBdHRyaWJ1dGVzLnNpemVzLHJlbDpcInByZWxvYWRcIixhczpcImltYWdlXCIsaHJlZjppbWdBdHRyaWJ1dGVzLnNyY1NldD91bmRlZmluZWQ6aW1nQXR0cmlidXRlcy5zcmMvLyBAdHMtaWdub3JlOiBpbWFnZXNyY3NldCBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZVxuLGltYWdlc3Jjc2V0OmltZ0F0dHJpYnV0ZXMuc3JjU2V0Ly8gQHRzLWlnbm9yZTogaW1hZ2VzaXplcyBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZVxuLGltYWdlc2l6ZXM6aW1nQXR0cmlidXRlcy5zaXplc30pKTpudWxsKTt9Ly9CVUlMVCBJTiBMT0FERVJTXG5mdW5jdGlvbiBub3JtYWxpemVTcmMoc3JjKXtyZXR1cm4gc3JjWzBdPT09Jy8nP3NyYy5zbGljZSgxKTpzcmM7fWZ1bmN0aW9uIGltZ2l4TG9hZGVyKHtyb290LHNyYyx3aWR0aCxxdWFsaXR5fSl7Ly8gRGVtbzogaHR0cHM6Ly9zdGF0aWMuaW1naXgubmV0L2RhaXN5LnBuZz9mb3JtYXQ9YXV0byZmaXQ9bWF4Jnc9MzAwXG5jb25zdCBwYXJhbXM9WydhdXRvPWZvcm1hdCcsJ2ZpdD1tYXgnLCd3PScrd2lkdGhdO2xldCBwYXJhbXNTdHJpbmc9Jyc7aWYocXVhbGl0eSl7cGFyYW1zLnB1c2goJ3E9JytxdWFsaXR5KTt9aWYocGFyYW1zLmxlbmd0aCl7cGFyYW1zU3RyaW5nPSc/JytwYXJhbXMuam9pbignJicpO31yZXR1cm5gJHtyb290fSR7bm9ybWFsaXplU3JjKHNyYyl9JHtwYXJhbXNTdHJpbmd9YDt9ZnVuY3Rpb24gYWthbWFpTG9hZGVyKHtyb290LHNyYyx3aWR0aH0pe3JldHVybmAke3Jvb3R9JHtub3JtYWxpemVTcmMoc3JjKX0/aW13aWR0aD0ke3dpZHRofWA7fWZ1bmN0aW9uIGNsb3VkaW5hcnlMb2FkZXIoe3Jvb3Qsc3JjLHdpZHRoLHF1YWxpdHl9KXsvLyBEZW1vOiBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZW1vL2ltYWdlL3VwbG9hZC93XzMwMCxjX2xpbWl0LHFfYXV0by90dXJ0bGVzLmpwZ1xuY29uc3QgcGFyYW1zPVsnZl9hdXRvJywnY19saW1pdCcsJ3dfJyt3aWR0aCwncV8nKyhxdWFsaXR5fHwnYXV0bycpXTtsZXQgcGFyYW1zU3RyaW5nPXBhcmFtcy5qb2luKCcsJykrJy8nO3JldHVybmAke3Jvb3R9JHtwYXJhbXNTdHJpbmd9JHtub3JtYWxpemVTcmMoc3JjKX1gO31mdW5jdGlvbiBkZWZhdWx0TG9hZGVyKHtyb290LHNyYyx3aWR0aCxxdWFsaXR5fSl7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbicpe2NvbnN0IG1pc3NpbmdWYWx1ZXM9W107Ly8gdGhlc2Ugc2hvdWxkIGFsd2F5cyBiZSBwcm92aWRlZCBidXQgbWFrZSBzdXJlIHRoZXkgYXJlXG5pZighc3JjKW1pc3NpbmdWYWx1ZXMucHVzaCgnc3JjJyk7aWYoIXdpZHRoKW1pc3NpbmdWYWx1ZXMucHVzaCgnd2lkdGgnKTtpZihtaXNzaW5nVmFsdWVzLmxlbmd0aD4wKXt0aHJvdyBuZXcgRXJyb3IoYE5leHQgSW1hZ2UgT3B0aW1pemF0aW9uIHJlcXVpcmVzICR7bWlzc2luZ1ZhbHVlcy5qb2luKCcsICcpfSB0byBiZSBwcm92aWRlZC4gTWFrZSBzdXJlIHlvdSBwYXNzIHRoZW0gYXMgcHJvcHMgdG8gdGhlIFxcYG5leHQvaW1hZ2VcXGAgY29tcG9uZW50LiBSZWNlaXZlZDogJHtKU09OLnN0cmluZ2lmeSh7c3JjLHdpZHRoLHF1YWxpdHl9KX1gKTt9aWYoc3JjLnN0YXJ0c1dpdGgoJy8vJykpe3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIHNyYyBcIiR7c3JjfVwiIG9uIFxcYG5leHQvaW1hZ2VcXGAsIHByb3RvY29sLXJlbGF0aXZlIFVSTCAoLy8pIG11c3QgYmUgY2hhbmdlZCB0byBhbiBhYnNvbHV0ZSBVUkwgKGh0dHA6Ly8gb3IgaHR0cHM6Ly8pYCk7fWlmKCFzcmMuc3RhcnRzV2l0aCgnLycpJiZjb25maWdEb21haW5zKXtsZXQgcGFyc2VkU3JjO3RyeXtwYXJzZWRTcmM9bmV3IFVSTChzcmMpO31jYXRjaChlcnIpe2NvbnNvbGUuZXJyb3IoZXJyKTt0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBzcmMgXCIke3NyY31cIiBvbiBcXGBuZXh0L2ltYWdlXFxgLCBpZiB1c2luZyByZWxhdGl2ZSBpbWFnZSBpdCBtdXN0IHN0YXJ0IHdpdGggYSBsZWFkaW5nIHNsYXNoIFwiL1wiIG9yIGJlIGFuIGFic29sdXRlIFVSTCAoaHR0cDovLyBvciBodHRwczovLylgKTt9aWYoIWNvbmZpZ0RvbWFpbnMuaW5jbHVkZXMocGFyc2VkU3JjLmhvc3RuYW1lKSl7dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNyYyBwcm9wICgke3NyY30pIG9uIFxcYG5leHQvaW1hZ2VcXGAsIGhvc3RuYW1lIFwiJHtwYXJzZWRTcmMuaG9zdG5hbWV9XCIgaXMgbm90IGNvbmZpZ3VyZWQgdW5kZXIgaW1hZ2VzIGluIHlvdXIgXFxgbmV4dC5jb25maWcuanNcXGBcXG5gK2BTZWUgbW9yZSBpbmZvOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWltYWdlLXVuY29uZmlndXJlZC1ob3N0YCk7fX19cmV0dXJuYCR7cm9vdH0/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNyYyl9Jnc9JHt3aWR0aH0mcT0ke3F1YWxpdHl8fDc1fWA7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW1hZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2s9ZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrPXZvaWQgMDtjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrPXR5cGVvZiBzZWxmIT09J3VuZGVmaW5lZCcmJnNlbGYucmVxdWVzdElkbGVDYWxsYmFja3x8ZnVuY3Rpb24oY2Ipe2xldCBzdGFydD1EYXRlLm5vdygpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y2Ioe2RpZFRpbWVvdXQ6ZmFsc2UsdGltZVJlbWFpbmluZzpmdW5jdGlvbigpe3JldHVybiBNYXRoLm1heCgwLDUwLShEYXRlLm5vdygpLXN0YXJ0KSk7fX0pO30sMSk7fTtleHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2s9cmVxdWVzdElkbGVDYWxsYmFjaztjb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2s9dHlwZW9mIHNlbGYhPT0ndW5kZWZpbmVkJyYmc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2t8fGZ1bmN0aW9uKGlkKXtyZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTt9O2V4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrPWNhbmNlbElkbGVDYWxsYmFjaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVlc3QtaWRsZS1jYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLnVzZUludGVyc2VjdGlvbj11c2VJbnRlcnNlY3Rpb247dmFyIF9yZWFjdD1yZXF1aXJlKFwicmVhY3RcIik7dmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrPXJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtjb25zdCBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcj10eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIhPT0ndW5kZWZpbmVkJztmdW5jdGlvbiB1c2VJbnRlcnNlY3Rpb24oe3Jvb3RNYXJnaW4sZGlzYWJsZWR9KXtjb25zdCBpc0Rpc2FibGVkPWRpc2FibGVkfHwhaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7Y29uc3QgdW5vYnNlcnZlPSgwLF9yZWFjdC51c2VSZWYpKCk7Y29uc3RbdmlzaWJsZSxzZXRWaXNpYmxlXT0oMCxfcmVhY3QudXNlU3RhdGUpKGZhbHNlKTtjb25zdCBzZXRSZWY9KDAsX3JlYWN0LnVzZUNhbGxiYWNrKShlbD0+e2lmKHVub2JzZXJ2ZS5jdXJyZW50KXt1bm9ic2VydmUuY3VycmVudCgpO3Vub2JzZXJ2ZS5jdXJyZW50PXVuZGVmaW5lZDt9aWYoaXNEaXNhYmxlZHx8dmlzaWJsZSlyZXR1cm47aWYoZWwmJmVsLnRhZ05hbWUpe3Vub2JzZXJ2ZS5jdXJyZW50PW9ic2VydmUoZWwsaXNWaXNpYmxlPT5pc1Zpc2libGUmJnNldFZpc2libGUoaXNWaXNpYmxlKSx7cm9vdE1hcmdpbn0pO319LFtpc0Rpc2FibGVkLHJvb3RNYXJnaW4sdmlzaWJsZV0pOygwLF9yZWFjdC51c2VFZmZlY3QpKCgpPT57aWYoIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyKXtpZighdmlzaWJsZSl7Y29uc3QgaWRsZUNhbGxiYWNrPSgwLF9yZXF1ZXN0SWRsZUNhbGxiYWNrLnJlcXVlc3RJZGxlQ2FsbGJhY2spKCgpPT5zZXRWaXNpYmxlKHRydWUpKTtyZXR1cm4oKT0+KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2suY2FuY2VsSWRsZUNhbGxiYWNrKShpZGxlQ2FsbGJhY2spO319fSxbdmlzaWJsZV0pO3JldHVybltzZXRSZWYsdmlzaWJsZV07fWZ1bmN0aW9uIG9ic2VydmUoZWxlbWVudCxjYWxsYmFjayxvcHRpb25zKXtjb25zdHtpZCxvYnNlcnZlcixlbGVtZW50c309Y3JlYXRlT2JzZXJ2ZXIob3B0aW9ucyk7ZWxlbWVudHMuc2V0KGVsZW1lbnQsY2FsbGJhY2spO29ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7cmV0dXJuIGZ1bmN0aW9uIHVub2JzZXJ2ZSgpe2VsZW1lbnRzLmRlbGV0ZShlbGVtZW50KTtvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCk7Ly8gRGVzdHJveSBvYnNlcnZlciB3aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIHdhdGNoOlxuaWYoZWxlbWVudHMuc2l6ZT09PTApe29ic2VydmVyLmRpc2Nvbm5lY3QoKTtvYnNlcnZlcnMuZGVsZXRlKGlkKTt9fTt9Y29uc3Qgb2JzZXJ2ZXJzPW5ldyBNYXAoKTtmdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihvcHRpb25zKXtjb25zdCBpZD1vcHRpb25zLnJvb3RNYXJnaW58fCcnO2xldCBpbnN0YW5jZT1vYnNlcnZlcnMuZ2V0KGlkKTtpZihpbnN0YW5jZSl7cmV0dXJuIGluc3RhbmNlO31jb25zdCBlbGVtZW50cz1uZXcgTWFwKCk7Y29uc3Qgb2JzZXJ2ZXI9bmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXM9PntlbnRyaWVzLmZvckVhY2goZW50cnk9Pntjb25zdCBjYWxsYmFjaz1lbGVtZW50cy5nZXQoZW50cnkudGFyZ2V0KTtjb25zdCBpc1Zpc2libGU9ZW50cnkuaXNJbnRlcnNlY3Rpbmd8fGVudHJ5LmludGVyc2VjdGlvblJhdGlvPjA7aWYoY2FsbGJhY2smJmlzVmlzaWJsZSl7Y2FsbGJhY2soaXNWaXNpYmxlKTt9fSk7fSxvcHRpb25zKTtvYnNlcnZlcnMuc2V0KGlkLGluc3RhbmNlPXtpZCxvYnNlcnZlcixlbGVtZW50c30pO3JldHVybiBpbnN0YW5jZTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2UtaW50ZXJzZWN0aW9uLmpzLm1hcCIsImltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wcyB9IGZyb20gJ25leHQnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcblxuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi4vc3R5bGVzL3BhZ2VzL2hvbWUubW9kdWxlLnNjc3MnO1xuaW1wb3J0IERhaWx5TWlzc2lvbiBmcm9tICcuLi9jb21wb25lbnRzL2hvbWUvRGFpbHlNaXNzaW9uJztcbmltcG9ydCBFeGVjdXRpb25zR3JhcGggZnJvbSAnLi4vY29tcG9uZW50cy9ob21lL0V4ZWN1dGlvbnNHcmFwaCc7XG5pbXBvcnQgVG9tb3Jyb3dNaXNzaW9uIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZS9Ub21vcnJvd01pc3Npb24nO1xuaW1wb3J0IFVzZXJTY29yZSBmcm9tICcuLi9jb21wb25lbnRzL2hvbWUvVXNlclNjb3JlJztcbmltcG9ydCB7IEV4ZXJjaXNlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9SZWdpc3RyYXRpb24vd29ya291dC9Gb3Jtcy9FeGVyY2lzZSc7XG5pbXBvcnQgYXhpb3NJbnN0YW5jZSBmcm9tICcuLi91dGlscy9heGlvcy9heGlvc0luc3RhbmNlJztcbmltcG9ydCB7IGRhdGVUb1N0cmluZyB9IGZyb20gJy4uL3V0aWxzL2RhdGVzL2RhdGVUb1N0cmluZyc7XG5pbXBvcnQgcHJvdGVjdFJvdXRlSGFuZGxlciBmcm9tICcuLi91dGlscy9wcm90ZWN0ZWRSb3V0ZXMvcHJvdGVjdGVkUm91dGVzJztcbmltcG9ydCB7IFdvcmtvdXRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvUHJvZ3JhbSc7XG5pbXBvcnQgeyBnZXRIZWFkZXJzIH0gZnJvbSAnLi4vdXRpbHMvYXhpb3MvZ2V0SGVhZGVycyc7XG5cbnR5cGUgRXhlY3V0aW9uID0geyByYXRlOiBudW1iZXI7IGRhdGU6IERhdGU7IHdvcmtvdXQ/OiBXb3Jrb3V0VHlwZSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIEhvbWVQcm9wcyB7XG4gIHdlZWtseUV4ZWN1dGlvbnM6IEV4ZWN1dGlvbltdO1xuICBleGVjdXRpb25EZWNsYXJlZDogYm9vbGVhbjtcbiAgZ3JhZGU6IG51bWJlcjtcbiAgdHJhaW5pbmdEYXlOYW1lOiBzdHJpbmc7XG4gIGV4ZXJjaXNlcz86IEV4ZXJjaXNlW107XG4gIHdvcmtvdXROYW1lPzogc3RyaW5nO1xuICB0aW1lOiBudW1iZXIgfCBudWxsO1xufVxuXG5jb25zdCBIb21lOiBSZWFjdC5GQzxIb21lUHJvcHM+ID0gKHtcbiAgZ3JhZGUsXG4gIHdvcmtvdXROYW1lLFxuICB0aW1lLFxuICBleGVyY2lzZXMsXG4gIHRyYWluaW5nRGF5TmFtZSxcbiAgZXhlY3V0aW9uRGVjbGFyZWQsXG4gIHdlZWtseUV4ZWN1dGlvbnMsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+SG9tZTwvdGl0bGU+XG4gICAgICAgIDxtZXRhXG4gICAgICAgICAgbmFtZT0nZGVzY3JpcHRpb24nXG4gICAgICAgICAgY29udGVudD0nRGlzcGxheWluZyBwcm9ncmFtIGV4ZWN1dGlvbnMgaW4gYSBncmFwaCdcbiAgICAgICAgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxVc2VyU2NvcmUgZ3JhZGU9e2dyYWRlfSAvPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9e2NsYXNzZXMuRXhlY3V0aW9uU2VjdGlvbn0+XG4gICAgICAgIHshZXhlY3V0aW9uRGVjbGFyZWQgPyAoXG4gICAgICAgICAgPERhaWx5TWlzc2lvblxuICAgICAgICAgICAgdHJhaW5pbmdEYXlOYW1lPXt0cmFpbmluZ0RheU5hbWV9XG4gICAgICAgICAgICB3b3Jrb3V0TmFtZT17d29ya291dE5hbWV9XG4gICAgICAgICAgICB0aW1lPXt0aW1lfVxuICAgICAgICAgICAgZXhlcmNpc2VzPXtleGVyY2lzZXN9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VG9tb3Jyb3dNaXNzaW9uXG4gICAgICAgICAgICB3b3Jrb3V0TmFtZT17d29ya291dE5hbWV9XG4gICAgICAgICAgICB0cmFpbmluZ0RheU5hbWU9e3RyYWluaW5nRGF5TmFtZX1cbiAgICAgICAgICAgIGV4ZXJjaXNlcz17ZXhlcmNpc2VzfVxuICAgICAgICAgICAgdGltZT17dGltZX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICA8RXhlY3V0aW9uc0dyYXBoIHdlZWtseUV4ZWN1dGlvbnM9e3dlZWtseUV4ZWN1dGlvbnN9IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VydmVyU2lkZVByb3BzOiBHZXRTZXJ2ZXJTaWRlUHJvcHMgPSBhc3luYyAoY3R4KSA9PiB7XG4gIGNvbnN0IHsgZGVzdGluYXRpb24sIGdyYWRlIH0gPSBhd2FpdCBwcm90ZWN0Um91dGVIYW5kbGVyKGN0eCk7XG5cbiAgaWYgKGRlc3RpbmF0aW9uID09PSAnLycpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgaGVhZGVycyA9IGdldEhlYWRlcnMoY3R4KTtcbiAgICAgIGNvbnN0IHByb3BzOiBIb21lUHJvcHMgPSB7XG4gICAgICAgIGdyYWRlLFxuICAgICAgICB0cmFpbmluZ0RheU5hbWU6ICdYJyxcbiAgICAgICAgZXhlY3V0aW9uRGVjbGFyZWQ6IGZhbHNlLFxuICAgICAgICB0aW1lOiBudWxsLFxuICAgICAgICB3ZWVrbHlFeGVjdXRpb25zOiBbXSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG11dGF0ZVByb3BzID0gYXN5bmMgKHVybDogc3RyaW5nLCBleGVjdXRpb25EZWNsYXJlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGF4aW9zSW5zdGFuY2UuZ2V0KHVybCwgeyBoZWFkZXJzIH0pO1xuXG4gICAgICAgIGNvbnN0IHsgZXhlcmNpc2VzLCBuYW1lLCB0cmFpbmluZ0RheU5hbWUsIHRpbWUgfSA9IGRhdGE7XG5cbiAgICAgICAgaWYgKG5hbWUgJiYgdHJhaW5pbmdEYXlOYW1lKSB7XG4gICAgICAgICAgcHJvcHMud29ya291dE5hbWUgPSBuYW1lO1xuICAgICAgICAgIHByb3BzLnRyYWluaW5nRGF5TmFtZSA9IHRyYWluaW5nRGF5TmFtZTtcbiAgICAgICAgICBwcm9wcy50aW1lID0gdGltZSB8fCBudWxsO1xuICAgICAgICAgIHByb3BzLmV4ZXJjaXNlcyA9IGV4ZXJjaXNlcztcbiAgICAgICAgfVxuICAgICAgICBwcm9wcy5leGVjdXRpb25EZWNsYXJlZCA9IGV4ZWN1dGlvbkRlY2xhcmVkO1xuICAgICAgfTtcblxuICAgICAgLy8gaWYgc3RhdHVzID0gMjAwIGV4ZWN1dGlvbiBhbHJlYWR5IGRlY2xhcmVkIGFuZCB0YWtpbmcgZGF0YSBmb3IgdG9tb3Jyb3cgbWlzc2lvblxuICAgICAgLy8gZWxzZSBleGVjdXRpb24gaXMgbm90IGRlY2xhcmVkIHlldCBzbyB0YWtpbmcgZGF0YSBmb3IgdG9kYXkgbWlzc2lvblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3NJbnN0YW5jZS5nZXQoYC9wcm9ncmFtLWV4ZWMvJHtkYXRlVG9TdHJpbmcobmV3IERhdGUoKSl9YCwge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgICAgICAgYXdhaXQgbXV0YXRlUHJvcHMoXG4gICAgICAgICAgYC9wcm9ncmFtLWV4ZWMvZXhlcmNpc2VzLXRvLWRvLyR7ZGF0ZVRvU3RyaW5nKHRvbW9ycm93KX1gLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBhd2FpdCBtdXRhdGVQcm9wcygnL3Byb2dyYW0tZXhlYy9leGVyY2lzZXMtdG8tZG8vJywgZmFsc2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgY29uc3QgeyBkYXRhLCBzdGF0dXMgfSA9IGF3YWl0IGF4aW9zSW5zdGFuY2UuZ2V0KFxuICAgICAgICAgIGAvcHJvZ3JhbS1leGVjL2J5LXJhbmdlL3dlZWsvJHtkYXRlVG9TdHJpbmcobmV3IERhdGUoKSl9YCxcbiAgICAgICAgICB7IGhlYWRlcnMgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDIwNCkge1xuICAgICAgICAgIHByb3BzLndlZWtseUV4ZWN1dGlvbnMgPSBbXTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIGxldCB3ZWVrbHlFeGVjdXRpb25zID0gZGF0YS5tYXAoXG4gICAgICAgICAgICAoaXRlbToge1xuICAgICAgICAgICAgICBkYXRlOiBEYXRlO1xuICAgICAgICAgICAgICBleGVjdXRpb25SYXRlOiBudW1iZXI7XG4gICAgICAgICAgICAgIHdvcmtvdXRJZD86IFdvcmtvdXRUeXBlO1xuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgZXhlY3V0aW9uOiBFeGVjdXRpb24gPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogaXRlbS5kYXRlLFxuICAgICAgICAgICAgICAgIHJhdGU6IGl0ZW0uZXhlY3V0aW9uUmF0ZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgaWYgKGl0ZW0ud29ya291dElkKSBleGVjdXRpb24ud29ya291dCA9IGl0ZW0ud29ya291dElkO1xuICAgICAgICAgICAgICByZXR1cm4gZXhlY3V0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgICAgcHJvcHMud2Vla2x5RXhlY3V0aW9ucyA9IHdlZWtseUV4ZWN1dGlvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgcHJvcHMgfTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgcmV0dXJuIHsgcmVkaXJlY3Q6IHsgZGVzdGluYXRpb246ICcvZXJyb3Itb2NjdXInLCBwZXJtYW5lbnQ6IGZhbHNlIH0gfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0OiB7IGRlc3RpbmF0aW9uLCBwZXJtYW5lbnQ6IGZhbHNlIH0sXG4gICAgfTtcbiAgfVxufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICBuZXdFcnJvcjogZmFsc2UsXHJcbiAgZXJyb3JUaXRsZTogXCJcIixcclxuICBlcnJvck1lc3NhZ2U6IFwiXCIsXHJcbiAgZXJyb3JTdGF0dXNDb2RlOiBcIlwiLFxyXG59O1xyXG5cclxuY29uc3QgZXJyb3JTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICBuYW1lOiBcImVycm9yc1wiLFxyXG4gIGluaXRpYWxTdGF0ZSxcclxuICByZWR1Y2Vyczoge1xyXG4gICAgbmV3RXJyb3Ioc3RhdGUsIHsgcGF5bG9hZCB9KSB7XHJcbiAgICAgIHN0YXRlLm5ld0Vycm9yID0gdHJ1ZTtcclxuICAgICAgc3RhdGUuZXJyb3JUaXRsZSA9IHBheWxvYWQuZXJyb3JUaXRsZTtcclxuICAgICAgc3RhdGUuZXJyb3JNZXNzYWdlID0gcGF5bG9hZC5lcnJvck1lc3NhZ2U7XHJcbiAgICAgIHN0YXRlLmVycm9yU3RhdHVzQ29kZSA9IHBheWxvYWQuZXJyb3JTdGF0dXNDb2RlIHx8IG51bGw7XHJcbiAgICB9LFxyXG4gICAgZXJyb3JDb25maXJtZWQoc3RhdGUpIHtcclxuICAgICAgc3RhdGUubmV3RXJyb3IgPSBmYWxzZTtcclxuICAgICAgc3RhdGUuZXJyb3JUaXRsZSA9IFwiXCI7XHJcbiAgICAgIHN0YXRlLmVycm9yTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgIHN0YXRlLmVycm9yU3RhdHVzQ29kZSA9IFwiXCI7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGVycm9yc0FjdGlvbnMgPSBlcnJvclNsaWNlLmFjdGlvbnM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBlcnJvclNsaWNlLnJlZHVjZXI7XHJcbiIsImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSAgPSB7IGxvYWRpbmc6IGZhbHNlIH1cblxuY29uc3QgbG9hZGluZ1NsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiAnbG9hZGluZ1NsaWNlJyxcbiAgaW5pdGlhbFN0YXRlICxcbiAgcmVkdWNlcnM6IHtcbiAgICBzZXRUb1RydWUoc3RhdGUpIHtcbiAgICAgIHN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICAgIH0sXG4gICAgc2V0VG9GYWxzZShzdGF0ZSkge1xuICAgICAgc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuICAgIH0sXG4gIH0sXG59KTtcbmV4cG9ydCBkZWZhdWx0IGxvYWRpbmdTbGljZS5yZWR1Y2VyO1xuZXhwb3J0IGNvbnN0IGxvYWRpbmdBY3Rpb24gPSBsb2FkaW5nU2xpY2UuYWN0aW9ucztcbiIsImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICBuZXdNZXNzYWdlOiBmYWxzZSxcclxuICBtZXNzYWdlVGl0bGU6IFwiXCIsXHJcbiAgbWVzc2FnZTogXCJcIixcclxufTtcclxuXHJcbmNvbnN0IG1lc3NhZ2VTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICBuYW1lOiBcIm1lc3NhZ2VzXCIsXHJcbiAgaW5pdGlhbFN0YXRlLFxyXG4gIHJlZHVjZXJzOiB7XHJcbiAgICBuZXdNZXNzYWdlKHN0YXRlLCB7IHBheWxvYWQgfSkge1xyXG4gICAgICBzdGF0ZS5uZXdNZXNzYWdlID0gdHJ1ZTtcclxuICAgICAgc3RhdGUubWVzc2FnZVRpdGxlID0gcGF5bG9hZC5tZXNzYWdlVGl0bGU7XHJcbiAgICAgIHN0YXRlLm1lc3NhZ2UgPSBwYXlsb2FkLm1lc3NhZ2U7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZUNvbmZpcm1lZChzdGF0ZSkge1xyXG4gICAgICBzdGF0ZS5uZXdNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgIHN0YXRlLm1lc3NhZ2VUaXRsZSA9IFwiXCI7XHJcbiAgICAgIHN0YXRlLm1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lc3NhZ2VTbGljZS5yZWR1Y2VyO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lc3NhZ2VzQWN0aW9ucyA9IG1lc3NhZ2VTbGljZS5hY3Rpb25zO1xyXG4iLCJpbXBvcnQgQXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5jb25zdCBiYXNlVVJMID0gcHJvY2Vzcy5lbnYuYmFzZVVSTDtcclxuXHJcbmNvbnN0IGF4aW9zSW5zdGFuY2UgPSBBeGlvcy5jcmVhdGUoe1xyXG4gIGJhc2VVUkwsXHJcbiAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF4aW9zSW5zdGFuY2U7XHJcbiIsImltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wc0NvbnRleHQgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IHBhcnNlQ29va2llcyB9IGZyb20gJ25vb2tpZXMnO1xuXG5leHBvcnQgY29uc3QgZ2V0SGVhZGVycyA9IChjdHg6IEdldFNlcnZlclNpZGVQcm9wc0NvbnRleHQpID0+IHtcbiAgY29uc3QgY29va2llcyA9IHBhcnNlQ29va2llcyhjdHgpO1xuICByZXR1cm4ge1xuICAgIENvb2tpZTogYF9jc3JmPSR7Y29va2llcy5fY3NyZn07IGpvbj0ke2Nvb2tpZXMuam9ufTsgWFNSRi1UT0tFTj0ke2Nvb2tpZXNbJ1hTUkZfVE9LRU4nXX07YCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZGF0ZVRvU3RyaW5nID0gKGRhdGU6IERhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZCA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBjb25zdCBtbSA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICByZXR1cm4gYCR7bW19LSR7ZGR9LSR7eXl5eX1gO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGVycm9yc0FjdGlvbnMgfSBmcm9tICcuLi8uLi9yZWR1eC9zbGljZXMvZXJyb3JzL2Vycm9yc1NsaWNlJztcbmltcG9ydCB7IGxvYWRpbmdBY3Rpb24gfSBmcm9tICcuLi8uLi9yZWR1eC9zbGljZXMvbG9hZGluZy9sb2FkaW5nU2xpY2UnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlQXhpb3NFcnJvciA9IChcbiAgZXJyOiBhbnksXG4gIGRpc3BhdGNoOiBEaXNwYXRjaDx7XG4gICAgcGF5bG9hZDogYW55O1xuICAgIHR5cGU6IHN0cmluZztcbiAgfT4sXG4gIGVycm9yVGl0bGU6IHN0cmluZ1xuKSA9PiB7XG4gIGRpc3BhdGNoKGxvYWRpbmdBY3Rpb24uc2V0VG9GYWxzZSgpKTtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGVyci5yZXNwb25zZTtcbiAgbGV0IGVycm9yTWVzc2FnZSA9ICcnO1xuICBpZiAoc3RhdHVzID09PSA0MjIpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnIucmVzcG9uc2UuZGF0YS5kYXRhWzBdLm1zZztcbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDQwMykge1xuICAgIGVycm9yTWVzc2FnZSA9IGVyci5yZXNwb25zZS5kYXRhO1xuICB9XG4gIGRpc3BhdGNoKFxuICAgIGVycm9yc0FjdGlvbnMubmV3RXJyb3Ioe1xuICAgICAgZXJyb3JUaXRsZSxcbiAgICAgIGVycm9yTWVzc2FnZSxcbiAgICB9KVxuICApO1xufTtcbiIsImltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wc0NvbnRleHQgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IHBhcnNlQ29va2llcyB9IGZyb20gJ25vb2tpZXMnO1xuaW1wb3J0IGF4aW9zSW5zdGFuY2UgZnJvbSAnLi4vYXhpb3MvYXhpb3NJbnN0YW5jZSc7XG5pbXBvcnQgeyBnZXRIZWFkZXJzIH0gZnJvbSAnLi4vYXhpb3MvZ2V0SGVhZGVycyc7XG5cbmNvbnN0IHByb3RlY3RSb3V0ZUhhbmRsZXIgPSBhc3luYyAoY3R4OiBHZXRTZXJ2ZXJTaWRlUHJvcHNDb250ZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29va2llcyA9IHBhcnNlQ29va2llcyhjdHgpO1xuXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvc0luc3RhbmNlLmdldCgnL2F1dGgvaXNVc2VyJywge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBDb29raWU6IGBfY3NyZj0ke2Nvb2tpZXMuX2NzcmZ9OyBqb249JHtjb29raWVzLmpvbn07IFhTUkYtVE9LRU49JHtjb29raWVzWydYU1JGX1RPS0VOJ119O2AsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qge1xuICAgICAgaXNBdXRoZW50aWNhdGVkLFxuICAgICAgaGFzUHJvZ3JhbSxcbiAgICAgIGhhc0luaXRpYWxTdGF0cyxcbiAgICAgIGhhc0dvYWxzLFxuICAgICAgaGFzQWxsV29ya291dHMsXG4gICAgICBncmFkZSxcbiAgICB9ID0gZGF0YTtcblxuICAgIGNvbnN0IHJldHVyblZhbHVlID0ge1xuICAgICAgZGVzdGluYXRpb246ICcvYXV0aC9sb2dpbicsXG4gICAgICBncmFkZTogbnVsbCxcbiAgICB9O1xuXG4gICAgLy8gY2FzZSBjb29raWUgZGVsZXRlZFxuICAgIGlmIChoYXNQcm9ncmFtKSB7XG4gICAgICByZXR1cm4geyBkZXN0aW5hdGlvbjogJy8nLCBncmFkZSB9O1xuICAgIH1cblxuICAgIGlmICghaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICByZXR1cm5WYWx1ZS5kZXN0aW5hdGlvbiA9ICcvYXV0aC9sb2dpbic7XG4gICAgfSBlbHNlIGlmICghaGFzR29hbHMpIHtcbiAgICAgIHJldHVyblZhbHVlLmRlc3RpbmF0aW9uID0gJy9hdXRoL3JlZ2lzdHJhdGlvbi9zZXQtZ29hbHMnO1xuICAgIH0gZWxzZSBpZiAoIWhhc0luaXRpYWxTdGF0cykge1xuICAgICAgcmV0dXJuVmFsdWUuZGVzdGluYXRpb24gPSAnL2F1dGgvcmVnaXN0cmF0aW9uL3NldC1pbml0aWFsLXN0YXRzJztcbiAgICB9IGVsc2UgaWYgKCFjb29raWVzLmNob3NlV29ya291dCkge1xuICAgICAgcmV0dXJuVmFsdWUuZGVzdGluYXRpb24gPSAnL2F1dGgvcmVnaXN0cmF0aW9uL2Nob29zZS13b3Jrb3V0JztcbiAgICB9IGVsc2UgaWYgKCFoYXNBbGxXb3Jrb3V0cykge1xuICAgICAgcmV0dXJuVmFsdWUuZGVzdGluYXRpb24gPSAnL2F1dGgvcmVnaXN0cmF0aW9uL2NyZWF0ZS13b3Jrb3V0JztcbiAgICB9IGVsc2UgaWYgKCFoYXNQcm9ncmFtKSB7XG4gICAgICByZXR1cm5WYWx1ZS5kZXN0aW5hdGlvbiA9ICcvYXV0aC9yZWdpc3RyYXRpb24vc2NoZWR1bGUtcHJvZ3JhbSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVyblZhbHVlLmRlc3RpbmF0aW9uID0gJy8nO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc3RpbmF0aW9uOiAnL2F1dGgvbG9naW4nLFxuICAgICAgZ3JhZGU6IG51bGwsXG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvdGVjdFJvdXRlSGFuZGxlcjtcbiIsImV4cG9ydCBkZWZhdWx0ICB7XCJzcmNcIjpcIi9fbmV4dC9zdGF0aWMvaW1hZ2UvcHVibGljL2ljb25zL3BsdXMtaWNvbi4xOGU0NmJiZmE0NGRlMzg4MDI2YzM4ZjAwYWZkZDY3Yi5zdmdcIixcImhlaWdodFwiOjI0LFwid2lkdGhcIjoyNH07IiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiYmFja2Ryb3BcIjogXCJCYWNrZHJvcF9iYWNrZHJvcF9fMjZCblZcIixcblx0XCJmYWRlLWluXCI6IFwiQmFja2Ryb3BfZmFkZS1pbl9fMXNzMHpcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIm1vZGFsXCI6IFwiTW9kYWxfbW9kYWxfXzIwa3JOXCIsXG5cdFwic2xpZGUtZG93blwiOiBcIk1vZGFsX3NsaWRlLWRvd25fXzFLaGxvXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJVc2VyU2NvcmVcIjogXCJob21lX1VzZXJTY29yZV9fc21HbEdcIixcblx0XCJBbmltYXRpb25TdGFydFwiOiBcImhvbWVfQW5pbWF0aW9uU3RhcnRfX1U2WF9sXCIsXG5cdFwiQW5pbWF0aW9uRW5kXCI6IFwiaG9tZV9BbmltYXRpb25FbmRfXzIxWUNkXCIsXG5cdFwiRXhlY3V0aW9uU2VjdGlvblwiOiBcImhvbWVfRXhlY3V0aW9uU2VjdGlvbl9fU1lhN1NcIixcblx0XCJEYWlseU1pc3Npb25cIjogXCJob21lX0RhaWx5TWlzc2lvbl9fMUx4M2xcIixcblx0XCJUb21vcnJvd01pc3Npb25cIjogXCJob21lX1RvbW9ycm93TWlzc2lvbl9fbWFXNzBcIixcblx0XCJEYWlseU1pc3Npb25Nb2RhbFwiOiBcImhvbWVfRGFpbHlNaXNzaW9uTW9kYWxfXzNsa2ZpXCIsXG5cdFwiVG9tb3Jyb3dNaXNzaW9uTW9kYWxcIjogXCJob21lX1RvbW9ycm93TWlzc2lvbk1vZGFsX18xS0NieVwiLFxuXHRcIkZvcm1cIjogXCJob21lX0Zvcm1fXzM3c05FXCIsXG5cdFwiRXhlcmNpc2VcIjogXCJob21lX0V4ZXJjaXNlX18xdTh6M1wiLFxuXHRcIk1vZGFsVGl0bGVcIjogXCJob21lX01vZGFsVGl0bGVfXzFWQWVNXCIsXG5cdFwiR3JhcGhUaXRsZVwiOiBcImhvbWVfR3JhcGhUaXRsZV9fUDJRaVBcIixcblx0XCJDaGVja2JveFwiOiBcImhvbWVfQ2hlY2tib3hfXzF0Xy1zXCIsXG5cdFwiTm9FeGVjdXRpb25zXCI6IFwiaG9tZV9Ob0V4ZWN1dGlvbnNfXzNKdUhMXCIsXG5cdFwiSW5wdXRcIjogXCJob21lX0lucHV0X18xeHlJSVwiLFxuXHRcIkV4ZWN1dGlvbnNHcmFwaFwiOiBcImhvbWVfRXhlY3V0aW9uc0dyYXBoX18xVjF5WVwiXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2xpZW50L2ltYWdlJylcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkByZWR1eGpzL3Rvb2xraXRcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkM1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9oZWFkLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3RvLWJhc2UtNjQuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvaW1hZ2UtY29uZmlnLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub29raWVzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiXSwic291cmNlUm9vdCI6IiJ9