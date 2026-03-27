"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NativeWalletButton = (0, _reactNative.requireNativeComponent)('RNAddToWalletButton');
const BUTTON_TYPE_BREAKPOINT = 236;
const BUTTON_DIMENSIONS = {
  basic: {
    ios: {
      width: 300,
      height: 40
    },
    android: {
      width: 300,
      height: 48
    }
  },
  badge: {
    ios: {
      width: 120,
      height: 40
    },
    android: {
      width: 200,
      height: 56
    }
  }
};
function AddToWalletButton({
  style,
  buttonStyle = 'black',
  buttonType = 'basic',
  borderRadius = 4,
  onPress
}) {
  const flattenedStyle = _reactNative.StyleSheet.flatten(style) || {};
  const currentDimensions = BUTTON_DIMENSIONS[buttonType][_reactNative.Platform.OS];
  const {
    width = currentDimensions.width,
    height = currentDimensions.height,
    ...rest
  } = flattenedStyle;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    activeOpacity: 0.8,
    style: [rest,
    // Android allows us to define the type of the button, however on iOS type depends on the width.
    // Adding this limits to ensure consistent behavior across platforms.
    buttonType === 'badge' ? {
      maxWidth: BUTTON_TYPE_BREAKPOINT - 1
    } : {
      minWidth: BUTTON_TYPE_BREAKPOINT
    }, {
      width,
      height
    }, styles.touchable]
  }, /*#__PURE__*/_react.default.createElement(NativeWalletButton, {
    style: styles.fill,
    buttonStyle: buttonStyle,
    borderRadius: borderRadius,
    buttonType: buttonType
  }));
}
const styles = _reactNative.StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  fill: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
var _default = exports.default = AddToWalletButton;
//# sourceMappingURL=AddToWalletButton.js.map