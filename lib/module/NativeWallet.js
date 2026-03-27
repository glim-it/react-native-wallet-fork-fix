import { TurboModuleRegistry } from 'react-native';
const PACKAGE_NAME = '@expensify/react-native-wallet';
// Try catch block to prevent crashing in case the module is not linked.
// Especialy useful for builds where Google SDK is not available
// eslint-disable-next-line import/no-mutable-exports
let Wallet;
try {
  Wallet = TurboModuleRegistry.getEnforcing('RNWallet');
} catch (error) {
  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.warn(`[${PACKAGE_NAME}] Failed to load Wallet module, ${error.message}`);
  }
}
export default Wallet;
export { PACKAGE_NAME };
//# sourceMappingURL=NativeWallet.js.map