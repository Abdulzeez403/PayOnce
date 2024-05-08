import React from "react";
import * as VectorIcon from "@expo/vector-icons";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
interface IProps {
    name: string;
    size?: number;
    color?: string;
    onPress?: () => void;
    type?:
    | "MaterialIcons"
    | "FontAwesome"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "Octicons"
    | "Feather"
    | "AntDesign"
    | "Entypo"
    | "FontAwesome6";
}

export const ApIcon: React.FC<IProps> = ({
    name,
    color = "#6b7280",
    onPress,
    size = 24,
    type = "MaterialIcons",
}) => {
    const Icon = VectorIcon[type];

    if (onPress)
        return (
            <TouchableOpacity
                onPress={() => {
                    if (onPress) onPress();
                }}
            >
                <Icon
                    name={name as any}
                    size={size}
                    color={color}
                    minimumFontScale={0.01}
                />
            </TouchableOpacity>
        );

    return (
        <Icon
            name={name as any}
            size={size}
            color={color}
            allowFontScaling
            adjustsFontSizeToFit
            style={{ fontWeight: "100" }}
        />
    );
};
