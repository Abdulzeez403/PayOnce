import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
    // You can define additional props specific to your TextInput component here
}

const TextInput: React.FC<Props> = (props) => {
    return (
        <RNTextInput
            {...props}
            style={[styles.input, props.style]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default TextInput;
