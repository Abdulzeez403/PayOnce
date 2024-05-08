import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ApSafeAreaView from '@/components/safeAreaView'
import { ApButton } from '@/components/button'
import { ApIcon } from '@/components/icon'
import { getwallet } from '@/service/apis'
import { useWalletContext } from '@/app/form/wallet/context'
import { Link, router } from 'expo-router'


const index = () => {

    const { getWalletBalance, balance } = useWalletContext()

    useEffect(() => (
        getWalletBalance("7778798996")
    ), [])

    const quickActivity = [
        {
            id: 1,
            title: "Electricity Token Purchased",
            subtitle: "Mobile wallet",
            total: 1000,
        },
        {
            id: 2,
            title: "MTN Airtime",
            subtitle: "Mobile wallet",
            total: 500,
        },
        {
            id: 3,
            title: "Airtel Airtime",
            subtitle: "Mobile wallet",
            total: 100,
        }
    ]


    const { width } = Dimensions.get('window');
    return (
        <ApSafeAreaView>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <View style={{ backgroundColor: "#362756", height: 200, justifyContent: 'center', alignItems: 'center', width: 350, borderRadius: 10 }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 0 }}>
                        <ApIcon
                            size={30}
                            name="naira-sign"
                            type="FontAwesome6"
                            color="white"
                        />
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 38 }}>{balance}</Text>
                    </View>

                </View>
            </View>

            <ApButton label="Fund Wallet" iconName="money-check" iconFamily="FontAwesome6" onPress={() => {
                router.navigate("/wallet/account")
            }} />



            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ paddingVertical: 10, fontSize: 18, fontWeight: "bold" }}>Recent Activities</Text>
                    <Text>See all</Text>
                </View>


                <View>
                    {
                        quickActivity.map((i, index) => (
                            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                <View>
                                    <View style={{ flexDirection: "row", gap: 5 }}>
                                        <View style={{ backgroundColor: "#362756", borderRadius: 50, width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
                                            <ApIcon
                                                size={25}
                                                name="naira-sign"
                                                type="FontAwesome6"
                                                color="white"
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{i.title}</Text>
                                            <Text style={{ color: "grey", fontSize: 10 }}>{i.subtitle}</Text>
                                        </View>

                                    </View>

                                </View>

                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{i.total}</Text>
                                    <Text style={{ color: "grey", fontSize: 10 }}>23rd, Jan, 2023</Text>
                                </View>
                            </View>
                        ))
                    }


                </View>

            </View>



        </ApSafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({})