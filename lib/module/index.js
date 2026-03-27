/* eslint-disable @lwc/lwc/no-async-await */
import { NativeEventEmitter, Platform } from 'react-native';
import Wallet, { PACKAGE_NAME } from './NativeWallet';
import { getCardState, getTokenizationStatus } from './utils';
import AddToWalletButton from './AddToWalletButton';
function getModuleLinkingRejection() {
  return Promise.reject(new Error(`Failed to load Wallet module, make sure to link ${PACKAGE_NAME} correctly`));
}
const eventEmitter = new NativeEventEmitter(Wallet);
function addListener(event, callback) {
  return eventEmitter.addListener(event, callback);
}
function removeListener(subscription) {
  subscription.remove();
}
function checkWalletAvailability() {
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  return Wallet.checkWalletAvailability();
}
async function getSecureWalletInfo() {
  if (Platform.OS === 'ios') {
    throw new Error('getSecureWalletInfo is not available on iOS');
  }
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await Wallet.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  return Wallet.getSecureWalletInfo();
}
async function getCardStatusBySuffix(last4Digits) {
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  const cardState = await Wallet.getCardStatusBySuffix(last4Digits);
  return getCardState(cardState);
}

/**
 * Returns the state of a card based on a platform-specific identifier.
 * @param identifier - The card identifier. On Android, it's `Token Reference ID` and on iOS, it's `Primary Account Identifier`
 * @param tsp - The Token Service Provider, e.g. `VISA`, `MASTERCARD`
 * @returns CardStatus - The card status
 */
async function getCardStatusByIdentifier(identifier, tsp) {
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  const tokenState = await Wallet.getCardStatusByIdentifier(identifier, tsp.toUpperCase());
  return getCardState(tokenState);
}
async function addCardToGoogleWallet(cardData) {
  if (Platform.OS === 'ios') {
    throw new Error('addCardToGoogleWallet is not available on iOS');
  }
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await Wallet.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  const tokenizationStatus = await Wallet.addCardToGoogleWallet(cardData);
  return getTokenizationStatus(tokenizationStatus);
}
async function resumeAddCardToGoogleWallet(cardData) {
  if (Platform.OS === 'ios') {
    throw new Error('resumeAddCardToGoogleWallet is not available on iOS');
  }
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await Wallet.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  const tokenizationStatus = await Wallet.resumeAddCardToGoogleWallet(cardData);
  return getTokenizationStatus(tokenizationStatus);
}
async function listTokens() {
  if (Platform.OS === 'ios') {
    return Promise.resolve([]);
  }
  if (!Wallet) {
    return getModuleLinkingRejection();
  }
  const isWalletInitialized = await Wallet.ensureGoogleWalletInitialized();
  if (!isWalletInitialized) {
    throw new Error('Wallet could not be initialized');
  }
  return Wallet.listTokens();
}
async function addCardToAppleWallet(cardData, issuerEncryptPayloadCallback) {
  if (Platform.OS === 'android') {
    throw new Error('addCardToAppleWallet is not available on Android');
  }
  const passData = await (Wallet === null || Wallet === void 0 ? void 0 : Wallet.IOSPresentAddPaymentPassView(cardData));
  if (!passData || passData.status !== 0) {
    return getTokenizationStatus((passData === null || passData === void 0 ? void 0 : passData.status) || -1);
  }
  async function addPaymentPassToWallet(paymentPassData) {
    const responseData = await issuerEncryptPayloadCallback(paymentPassData.nonce, paymentPassData.nonceSignature, paymentPassData.certificates);
    const response = await (Wallet === null || Wallet === void 0 ? void 0 : Wallet.IOSHandleAddPaymentPassResponse(responseData));
    // Response is null when a pass is successfully added to the wallet or the user cancels the process
    // In case the user presses the `Try again` option, new pass data is returned, and it should reenter the function
    if (response) {
      return addPaymentPassToWallet(response);
    }
    return 0;
  }
  const status = await addPaymentPassToWallet(passData);
  return getTokenizationStatus(status);
}
export { AddToWalletButton, checkWalletAvailability, getSecureWalletInfo, getCardStatusBySuffix, getCardStatusByIdentifier, addCardToGoogleWallet, resumeAddCardToGoogleWallet, listTokens, addCardToAppleWallet, addListener, removeListener };
//# sourceMappingURL=index.js.map