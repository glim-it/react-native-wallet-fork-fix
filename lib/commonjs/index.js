"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddToWalletButton", {
  enumerable: true,
  get: function () {
    return _AddToWalletButton.default;
  }
});
exports.addCardToAppleWallet = addCardToAppleWallet;
exports.addCardToGoogleWallet = addCardToGoogleWallet;
exports.addListener = addListener;
exports.checkWalletAvailability = checkWalletAvailability;
exports.getCardStatusByIdentifier = getCardStatusByIdentifier;
exports.getCardStatusBySuffix = getCardStatusBySuffix;
exports.getSecureWalletInfo = getSecureWalletInfo;
exports.listTokens = listTokens;
exports.removeListener = removeListener;
exports.resumeAddCardToGoogleWallet = resumeAddCardToGoogleWallet;
var _reactNative = require("react-native");
var _NativeWallet = _interopRequireWildcard(require("./NativeWallet"));
var _utils = require("./utils");
var _AddToWalletButton = _interopRequireDefault(require("./AddToWalletButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/* eslint-disable @lwc/lwc/no-async-await */

function getModuleLinkingRejection() {
  return Promise.reject(new Error(`Failed to load Wallet module, make sure to link ${_NativeWallet.PACKAGE_NAME} correctly`));
}
const eventEmitter = new _reactNative.NativeEventEmitter(_NativeWallet.default);
function addListener(event, callback) {
  return eventEmitter.addListener(event, callback);
}
function removeListener(subscription) {
  subscription.remove();
}
function checkWalletAvailability() {
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  return _NativeWallet.default.checkWalletAvailability();
}
async function getSecureWalletInfo() {
  if (_reactNative.Platform.OS === 'ios') {
    throw new Error('getSecureWalletInfo is not available on iOS');
  }
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await _NativeWallet.default.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  return _NativeWallet.default.getSecureWalletInfo();
}
async function getCardStatusBySuffix(last4Digits) {
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  const cardState = await _NativeWallet.default.getCardStatusBySuffix(last4Digits);
  return (0, _utils.getCardState)(cardState);
}

/**
 * Returns the state of a card based on a platform-specific identifier.
 * @param identifier - The card identifier. On Android, it's `Token Reference ID` and on iOS, it's `Primary Account Identifier`
 * @param tsp - The Token Service Provider, e.g. `VISA`, `MASTERCARD`
 * @returns CardStatus - The card status
 */
async function getCardStatusByIdentifier(identifier, tsp) {
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  const tokenState = await _NativeWallet.default.getCardStatusByIdentifier(identifier, tsp.toUpperCase());
  return (0, _utils.getCardState)(tokenState);
}
async function addCardToGoogleWallet(cardData) {
  if (_reactNative.Platform.OS === 'ios') {
    throw new Error('addCardToGoogleWallet is not available on iOS');
  }
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await _NativeWallet.default.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  const tokenizationStatus = await _NativeWallet.default.addCardToGoogleWallet(cardData);
  return (0, _utils.getTokenizationStatus)(tokenizationStatus);
}
async function resumeAddCardToGoogleWallet(cardData) {
  if (_reactNative.Platform.OS === 'ios') {
    throw new Error('resumeAddCardToGoogleWallet is not available on iOS');
  }
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await _NativeWallet.default.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  const tokenizationStatus = await _NativeWallet.default.resumeAddCardToGoogleWallet(cardData);
  return (0, _utils.getTokenizationStatus)(tokenizationStatus);
}
async function listTokens() {
  if (_reactNative.Platform.OS === 'ios') {
    return Promise.resolve([]);
  }
  if (!_NativeWallet.default) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await _NativeWallet.default.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  return _NativeWallet.default.listTokens();
}
async function addCardToAppleWallet(cardData, issuerEncryptPayloadCallback) {
  if (_reactNative.Platform.OS === 'android') {
    throw new Error('addCardToAppleWallet is not available on Android');
  }
  const passData = await (_NativeWallet.default === null || _NativeWallet.default === void 0 ? void 0 : _NativeWallet.default.IOSPresentAddPaymentPassView(cardData));
  if (!passData || passData.status !== 0) {
    return (0, _utils.getTokenizationStatus)((passData === null || passData === void 0 ? void 0 : passData.status) || -1);
  }
  async function addPaymentPassToWallet(paymentPassData) {
    const responseData = await issuerEncryptPayloadCallback(paymentPassData.nonce, paymentPassData.nonceSignature, paymentPassData.certificates);
    const response = await (_NativeWallet.default === null || _NativeWallet.default === void 0 ? void 0 : _NativeWallet.default.IOSHandleAddPaymentPassResponse(responseData));
    // Response is null when a pass is successfully added to the wallet or the user cancels the process
    // In case the user presses the `Try again` option, new pass data is returned, and it should reenter the function
    if (response) {
      return addPaymentPassToWallet(response);
    }
    return 0;
  }
  const status = await addPaymentPassToWallet(passData);
  return (0, _utils.getTokenizationStatus)(status);
}
//# sourceMappingURL=index.js.map