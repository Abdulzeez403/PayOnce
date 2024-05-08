import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Option {
    logo: any;
    name: string;
}

interface PickerProps {
    options: Option[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

const ApPicker: React.FC<PickerProps> = ({ options, selectedValue, onValueChange }) => {
    return (
        <View>
            <Text>Select a platform:</Text>

            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    {options.map((option, index) => (
                        <Picker.Item key={index} label={option.logo} value={option.name} />
                    ))}
                </Picker>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black', // Set border color
        borderRadius: 4,

    },
    picker: {
        height: 40,
        width: '100%',
    },
});

export default ApPicker;
