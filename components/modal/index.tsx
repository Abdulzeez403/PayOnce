import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ApModal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
    const animation = useRef(new Animated.Value(0)).current;

    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, 0],
    });

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose} />
            <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        elevation: 5,
        width: 300
    },
});

export default ApModal;
