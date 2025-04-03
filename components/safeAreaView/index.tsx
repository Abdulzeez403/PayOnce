import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

interface IProps {
    children: React.ReactNode;
    style?: any
}

const ApSafeAreaView = ({ children, style }: IProps) => {
    return (
        <SafeAreaView style={[styles.safeArea, style]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical:30
    },
});

export default ApSafeAreaView;
