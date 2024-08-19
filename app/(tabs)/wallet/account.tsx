import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ApIcon } from '@/components/icon'
import ApSafeAreaView from '@/components/safeAreaView'
// import Clipboard from '@react-native-clipboard/clipboard';

type Props = {}

const account = (props: Props) => {

    // const copyToClipboard = (text: string) => {
    //     Clipboard.setString(text);
    //     console.log('Copied to clipboard!', text);
    // };

    return (
        <ApSafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <View style={{ backgroundColor: "#362756", height: 200, width: 350, borderRadius: 10, paddingHorizontal: 10 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 10 }}>
                        <View>
                            <Text style={{ color: "white", fontSize: 20, }}>
                                Virtual Accounts
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Wema Bank
                            </Text>
                        </View>

                    </View>

                    <View style={{ backgroundColor: "grey", flexDirection: "row", justifyContent: "flex-start", gap: 10, borderRadius: 10, padding: 4, paddingHorizontal: 8, alignItems: "center", width: 150, marginVertical: 42 }}>
                        <Text style={{ color: "white", fontSize: 20 }}>2294858494</Text>
                        <ApIcon
                            size={25}
                            name="copy"
                            type="Feather"
                            color="white"

                        />

                    </View>

                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", }}>Abdulazeez Sodiq</Text>

                </View>
            </View>
        </ApSafeAreaView>
    )
}

export default account

const styles = StyleSheet.create({})