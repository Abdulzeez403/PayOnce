import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { ApButton } from '@/components/button';
import { router } from 'expo-router';

const Simple = () => {




    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ fontWeight: "bold", paddingVertical: 10, textAlign: "center", fontSize: 40, fontFamily: "Ubuntu_Medium" }}>PayOnce</Text>
                <ApButton
                    label="Continue"
                    className={{ marginHorizontal: 10 }}
                    onPress={() => {
                        router.navigate("/signin");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Simple;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
