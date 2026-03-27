import React from 'react';
import { Platform, requireNativeComponent, StyleSheet, TouchableOpacity } from 'react-native';
const NativeWalletButton = requireNativeComponent('RNAddToWalletButton');
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
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const currentDimensions = BUTTON_DIMENSIONS[buttonType][Platform.OS];
  const {
    width = currentDimensions.width,
    height = currentDimensions.height,
    ...rest
  } = flattenedStyle;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
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
  }, /*#__PURE__*/React.createElement(NativeWalletButton, {
    style: styles.fill,
    buttonStyle: buttonStyle,
    borderRadius: borderRadius,
    buttonType: buttonType
  }));
}
const styles = StyleSheet.create({
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
export default AddToWalletButton;
//# sourceMappingURL=AddToWalletButton.js.map