"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PACKAGE_NAME = void 0;
var _reactNative = require("react-native");
const PACKAGE_NAME = exports.PACKAGE_NAME = '@expensify/react-native-wallet';
// Try catch block to prevent crashing in case the module is not linked.
// Especialy useful for builds where Google SDK is not available
// eslint-disable-next-line import/no-mutable-exports
let Wallet;
try {
  Wallet = _reactNative.TurboModuleRegistry.getEnforcing('RNWallet');
} catch (error) {
  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.warn(`[${PACKAGE_NAME}] Failed to load Wallet module, ${error.message}`);
  }
}
var _default = exports.default = Wallet;
//# sourceMappingURL=NativeWallet.js.map