import React from 'react';
import type { ViewStyle, GestureResponderEvent, StyleProp } from 'react-native';
type ButtonStyle = 'black' | 'blackOutline';
type ButtonType = 'basic' | 'badge';
interface NativeWalletButtonProps {
    style?: StyleProp<ViewStyle>;
    buttonStyle?: ButtonStyle;
    buttonType?: ButtonType;
    borderRadius?: number;
}
type Props = NativeWalletButtonProps & {
    onPress?: (e: GestureResponderEvent) => void;
};
declare function AddToWalletButton({ style, buttonStyle, buttonType, borderRadius, onPress }: Props): React.JSX.Element;
export default AddToWalletButton;
//# sourceMappingURL=AddToWalletButton.d.ts.map