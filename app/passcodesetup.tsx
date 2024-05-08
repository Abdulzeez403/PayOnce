import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = 80;
const passcodeLength = 6;

const PasscodeSetupScreen = () => {
    const [passcode, setPasscode] = useState<number[]>([]);

    // const DialPad = ({ onPress }: { onPress: (digit: number | string) => void }) => {
    //     return (
    //         <View style={styles.dialPad}>
    //             {dialPad.map((item, index) => (
    //                 <TouchableOpacity
    //                     key={index}
    //                     style={[styles.dialPadButton, item === "del" ? styles.delButton : null]}
    //                     onPress={() => onPress(item)}
    //                     disabled={item === ""}
    //                 >
    //                     <Text style={styles.dialPadButtonText}>
    //                         {item === "del" ? "DEL" : item}
    //                     </Text>
    //                 </TouchableOpacity>
    //             ))}
    //         </View>
    //     );
    // };

    const DialPad = ({ onPress }: { onPress: (item: number | string) => void }) => {
        return (
            <View style={{ height: 420 }}>
                <FlatList
                    data={dialPad}
                    numColumns={3}
                    style={{ flexGrow: 1 }}
                    keyExtractor={(_, index) => index.toString()}
                    scrollEnabled={false}
                    columnWrapperStyle={{ gap: 30 }}
                    contentContainerStyle={{ gap: 30 }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => onPress(item)}
                                disabled={item === ""}
                            >
                                <View
                                    style={{
                                        width: dialPadSize,
                                        height: dialPadSize,
                                        borderRadius: dialPadSize / 2,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item === "del" ? (
                                        <Ionicons
                                            name="backspace-outline"
                                            size={dialPadSize / 2}
                                            color="black"
                                        />
                                    ) : item === "" ? (
                                        <Ionicons
                                            name="finger-print"
                                            size={dialPadSize / 2}
                                            color="black"
                                        />
                                    ) : (
                                        <Text
                                            style={{
                                                fontSize: dialPadSize / 2,
                                                color: "black",
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    };

    const handlePasscodePress = (digit: any) => {
        if (digit === "del") {
            setPasscode(prevPasscode => prevPasscode.slice(0, prevPasscode.length - 1));
        } else if (typeof digit === "number") {
            setPasscode(prevPasscode => [...prevPasscode, digit]);
        }
    };



    const savePasscode = async (passcode: number[]) => {
        try {
            const passcodeString = passcode.join(','); // Convert array to string
            await AsyncStorage.setItem('passcode', passcodeString);
            console.log('Passcode saved successfully.');
            router.navigate('/(tabs)/home')
        } catch (error) {
            console.error('Error saving passcode:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Passcode</Text>
            <View style={styles.passcodeContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 20,
                        marginBottom: 40,
                        height: 30,
                        alignItems: "flex-end",
                    }}
                >
                    {Array(passcodeLength).fill('').map((_, index) => {
                        const isSelected = !!passcode[index];

                        return (
                            <View
                                key={index}
                                style={{
                                    width: 22,
                                    height: isSelected ? 22 : 2,
                                    borderRadius: 22,
                                    backgroundColor: "black",
                                }}
                            />

                            // <View key={index} style={styles.passcodeDigit}>
                            //     {passcode[index] ? <Text style={styles.passcodeDigitText}>*</Text> : null}
                            // </View>
                        );
                    })}
                </View>

                <DialPad onPress={handlePasscodePress} />
            </View>
            <TouchableOpacity onPress={() => savePasscode(passcode)}>
                <Text>Save Passcode</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    passcodeContainer: {
        alignItems: 'center',
    },
    passcodeDisplay: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 40,
        height: 30,
        // alignItems: "flex-end",
    },
    passcodeDigit: {
        width: 22,
        height: 2,
        borderRadius: 22,
        backgroundColor: "black",
    },
    passcodeDigitText: {
        fontSize: 24,
    },
    dialPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dialPadButton: {
        width: dialPadSize,
        height: dialPadSize,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderRadius: dialPadSize / 2,
        borderColor: 'black',
    },
    delButton: {
        backgroundColor: 'red',
    },
    dialPadButtonText: {
        fontSize: 24,
    },
    saveButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    saveButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default PasscodeSetupScreen;
