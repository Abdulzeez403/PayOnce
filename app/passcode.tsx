import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = width * 0.2;
const pinLength = 6;

export default function PasscodeScreen() {
    const [pinCode, setPinCode] = useState<number[]>([]);







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

    const handlePasscodeSubmit = async () => {
        try {
            const enteredPasscode = pinCode.join('');
            const storedPasscode = await AsyncStorage.getItem('passcode');

            if (!storedPasscode) {
                throw new Error('Passcode not found in AsyncStorage.');
            }

            const expectedPasscode = storedPasscode.replace(/,/g, '');

            if (enteredPasscode === expectedPasscode) {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                router.navigate('(tabs)/home');
            } else {
                setPinCode([]);
                alert('Incorrect passcode. Please try again.');
            }
        } catch (error) {
            console.error('Error handling passcode submission:', error);
            alert('An error occurred while handling passcode submission. Please try again.');
        }
    };


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 42,
                    color: "black",
                    fontFamily: "Ubuntu_Medium"
                }}
            >
                Login with Passcode
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    gap: 20,
                    marginBottom: 40,
                    height: 30,
                    alignItems: "fex-end",
                }}
            >
                {[...Array(pinLength).keys()].map((index) => {
                    const isSelected = !!pinCode[index];

                    return (
                        <View
                            key={index}
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 22,
                                borderColor: "black",
                                borderWidth: 2,
                                backgroundColor: isSelected ? "black" : "white",
                            }}
                        />
                    );
                })}
            </View>


            <DialPad
                onPress={(item) => {
                    if (item === "del") {
                        setPinCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
                    } else if (typeof item === "number") {
                        setPinCode((prevCode) => [...prevCode, item]);
                    }
                }}
            />
            <TouchableOpacity onPress={handlePasscodeSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}
