import type { TurboModule } from 'react-native';
type AndroidWalletData = {
    deviceID: string;
    walletAccountID: string;
};
type CardStatus = 'not found' | 'requireActivation' | 'pending' | 'active' | 'suspended' | 'deactivated';
type Platform = 'android' | 'ios';
type UserAddress = {
    name: string;
    addressOne: string;
    addressTwo?: string;
    administrativeArea: string;
    locality: string;
    countryCode: string;
    postalCode: string;
    phoneNumber: string;
};
type AndroidCardData = {
    network: string;
    opaquePaymentCard: string;
    cardHolderName: string;
    lastDigits: string;
    userAddress: UserAddress;
};
type AndroidResumeCardData = {
    network: string;
    tokenReferenceID: string;
    cardHolderName?: string;
    lastDigits?: string;
};
type IOSCardData = {
    network: string;
    cardHolderName: string;
    lastDigits: string;
    cardDescription: string;
};
type onCardActivatedPayload = {
    tokenId: string;
    status: 'activated' | 'canceled';
};
type IOSAddPaymentPassData = {
    status: number;
    nonce: string;
    nonceSignature: string;
    certificates: string[];
};
type IOSEncryptPayload = {
    encryptedPassData: string;
    activationData: string;
    ephemeralPublicKey: string;
};
type TokenizationStatus = 'canceled' | 'success' | 'error';
type TokenInfo = {
    identifier: string;
    lastDigits: string;
    tokenState: number;
};
export interface Spec extends TurboModule {
    checkWalletAvailability(): Promise<boolean>;
    ensureGoogleWalletInitialized(): Promise<boolean>;
    getSecureWalletInfo(): Promise<AndroidWalletData>;
    getCardStatusBySuffix(last4Digits: string): Promise<number>;
    getCardStatusByIdentifier(identifier: string, tsp: string): Promise<number>;
    addCardToGoogleWallet(cardData: AndroidCardData): Promise<number>;
    resumeAddCardToGoogleWallet(cardData: AndroidResumeCardData): Promise<number>;
    listTokens(): Promise<TokenInfo[]>;
    IOSPresentAddPaymentPassView(cardData: IOSCardData): Promise<IOSAddPaymentPassData>;
    IOSHandleAddPaymentPassResponse(payload: IOSEncryptPayload): Promise<IOSAddPaymentPassData | null>;
    addListener: (eventType: string) => void;
    removeListeners: (count: number) => void;
}
declare const PACKAGE_NAME = "@expensify/react-native-wallet";
declare let Wallet: Spec | undefined;
export default Wallet;
export { PACKAGE_NAME };
export type { AndroidCardData, AndroidResumeCardData, IOSCardData, AndroidWalletData, CardStatus, UserAddress, onCardActivatedPayload, Platform, IOSAddPaymentPassData, IOSEncryptPayload, TokenizationStatus, TokenInfo, };
//# sourceMappingURL=NativeWallet.d.ts.map