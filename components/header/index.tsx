import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
    title: string;
    rightIcon?: JSX.Element;
    // centerIcon?: JSX.Element;
    leftIcon?: JSX.Element
}

const ApHeader: React.FC<HeaderProps> = ({ title, rightIcon, leftIcon }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 100 }}>
                {leftIcon && <View>{leftIcon}</View>}
                <Text style={styles.title}>{title}</Text>
            </View>

            {rightIcon && <View>{rightIcon}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#2e2e2e',
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 20,
        // color: '#fff',
    },
});

export default ApHeader;
