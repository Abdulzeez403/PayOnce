import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ApIcon } from '@/components/icon'
import RoundedImage from '@/components/image'
import { ApButton } from '@/components/button'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'


const index = () => {

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Sign out successful, token removed');
            router.push("/signin")
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 23, fontWeight: "bold" }}>Abdulazeez Soidq</Text>
                    <Text>abdulazeezsodiq@gmail.com</Text>
                </View>
                <View>
                    <View style={{ borderBlockColor: "red" }}>
                        <RoundedImage source={require("../../../assets/images/avatar.png")}
                            width={50} height={50}
                        />
                    </View>
                </View>

            </View>
            <View>
                <LinkComponent />
                <LinkComponent />
                <LinkComponent />
            </View>

            <ApButton label="LogOut" onPress={SignOut} />
        </SafeAreaView>
    )
}

const LinkComponent: React.FC = () => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, borderWidth: 2, borderColor: "#362756", backgroundColor: "white", paddingVertical: 10, borderRadius: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <ApIcon
                    size={25}
                    name="user"
                    type="AntDesign"
                    color="black"
                />
                <Text style={{ color: "#362756" }}>Personal Information</Text>
            </View>
            <ApIcon
                size={25}
                name="chevron-right"
                type="Feather"
                color="black"
            />
        </View>
    );
};

export default index

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 10,

    }
})