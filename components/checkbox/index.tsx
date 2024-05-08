import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import { ApIcon } from '../icon';

interface CheckboxProps {
    onValueChange: (value: string) => void;
    selectedValue: string;
    label: string;
    value: string;
}

const ApCheckbox: React.FC<CheckboxProps> = ({ onValueChange, selectedValue, label, value }) => {
    const [checked, setChecked] = useState(selectedValue === value);
    const scaleValue = useState(new Animated.Value(0))[0];

    const toggleCheckbox = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (newValue) {
            onValueChange(value);
        } else {
            onValueChange('');
        }
        Animated.spring(scaleValue, {
            toValue: newValue ? 1 : 0,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [
            {
                scale: scaleValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                }),
            },
        ],
    };

    return (
        <TouchableOpacity onPress={toggleCheckbox}>
            <View style={styles.container}>
                <Animated.View style={[styles.checkbox, checked && styles.checked, animatedStyle]}>
                    {checked &&
                        <ApIcon
                            name="check"
                            size={25}
                            color="#fff"
                        />}
                </Animated.View>
                <Text>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: 'orange',
    },
});

export default ApCheckbox;
