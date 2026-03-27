import type { EmitterSubscription } from 'react-native';
import type { TokenizationStatus, AndroidCardData, AndroidResumeCardData, CardStatus, IOSCardData, IOSEncryptPayload, AndroidWalletData, onCardActivatedPayload, IOSAddPaymentPassData, TokenInfo } from './NativeWallet';
import AddToWalletButton from './AddToWalletButton';
declare function addListener(event: string, callback: (data: onCardActivatedPayload) => void): EmitterSubscription;
declare function removeListener(subscription: EmitterSubscription): void;
declare function checkWalletAvailability(): Promise<boolean>;
declare function getSecureWalletInfo(): Promise<AndroidWalletData>;
declare function getCardStatusBySuffix(last4Digits: string): Promise<CardStatus>;
/**
 * Returns the state of a card based on a platform-specific identifier.
 * @param identifier - The card identifier. On Android, it's `Token Reference ID` and on iOS, it's `Primary Account Identifier`
 * @param tsp - The Token Service Provider, e.g. `VISA`, `MASTERCARD`
 * @returns CardStatus - The card status
 */
declare function getCardStatusByIdentifier(identifier: string, tsp: string): Promise<CardStatus>;
declare function addCardToGoogleWallet(cardData: AndroidCardData): Promise<TokenizationStatus>;
declare function resumeAddCardToGoogleWallet(cardData: AndroidResumeCardData): Promise<TokenizationStatus>;
declare function listTokens(): Promise<TokenInfo[]>;
declare function addCardToAppleWallet(cardData: IOSCardData, issuerEncryptPayloadCallback: (nonce: string, nonceSignature: string, certificate: string[]) => Promise<IOSEncryptPayload>): Promise<TokenizationStatus>;
export type { AndroidCardData, AndroidWalletData, CardStatus, IOSEncryptPayload, IOSCardData, IOSAddPaymentPassData, onCardActivatedPayload, TokenizationStatus, TokenInfo };
export { AddToWalletButton, checkWalletAvailability, getSecureWalletInfo, getCardStatusBySuffix, getCardStatusByIdentifier, addCardToGoogleWallet, resumeAddCardToGoogleWallet, listTokens, addCardToAppleWallet, addListener, removeListener, };
//# sourceMappingURL=index.d.ts.map