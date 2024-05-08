import React from 'react';
import { Text, View, TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps } from 'react-native'; // Import TextInputProps from react-native
import { FieldProps } from 'formik'; // Import FieldProps from Formik
import { ApIcon } from '../icon';

interface TextInputProps extends FieldProps, RNTextInputProps {
    placeholder: string;
    label?: string;
    rightIcon?: JSX.Element;
    type?: number | string;
}

const ApTextInput: React.FC<TextInputProps> = ({ placeholder, field, form, label, rightIcon, type, ...props }) => { // Destructure field and form from props
    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                <RNTextInput
                    // type={type}
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={form.handleChange(field.name)}
                    value={field.value}
                    onBlur={form.handleBlur(field.name)}
                    keyboardType={props.keyboardType}
                />
                {rightIcon && ( // Render right icon if provided
                    <View style={styles.rightContainer}>
                        {rightIcon}
                    </View>
                )}

            </View>

            {form.touched[field.name] && form.errors[field.name] && (
                <Text style={styles.errorText}>{form.errors[field.name]}</Text> // Display error message from Formik
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        // borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 4,
        width: "100%"

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        width: "100%"
    },
    errorText: {
        color: 'red',
    },
    rightContainer: {
        // paddingRight: 20
    }
});

export default ApTextInput;
