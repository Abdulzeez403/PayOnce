import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundedImage from '@/components/image';
import { ApIcon } from '@/components/icon';
import { ApButton } from '@/components/button';
import { Link, router } from 'expo-router';

interface IUser {
    family_name: string,
    given_name: string,
    picture?: any,
}



const index = () => {

    const [currentUser, setCurrentUser] = useState<IUser>()




    const quickAction = [
        {
            id: 1,
            title: "Airtime",
            iconTitle: "phone-call",
            iconFamily: "Feather",
            link: "form/airtime/airtime"
        },
        {
            id: 2,
            title: "Data",
            iconTitle: "wifi",
            iconFamily: "Feather",
            link: "form/databundle/databundle"
        },
        {
            id: 3,
            title: "Cable TV",
            iconTitle: "tv",
            iconFamily: "FontAwesome",
            link: "form/tvsubscription/tvsubscription"
        },

        {
            id: 4,
            title: "Electricity",
            iconTitle: "light-bulb",
            iconFamily: "Entypo",
            link: "form/electricity/electricity"
        },

    ]

    const quickActivity:any[] = [
        // {
        //     id: 1,
        //     title: "Electricity Token Purchased",
        //     subtitle: "Mobile wallet",
        //     total: 1000,
        // },
        // {
        //     id: 2,
        //     title: "MTN Airtime",
        //     subtitle: "Mobile wallet",
        //     total: 500,
        // },
        // {
        //     id: 3,
        //     title: "Airtel Airtime",
        //     subtitle: "Mobile wallet",
        //     total: 100,
        // }
    ]


    return (
        <SafeAreaView>
            <View style={{ backgroundColor: "#362756", paddingHorizontal: 10, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 40, paddingHorizontal: 10, alignItems: "center" }} >

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        
                        <View>
                            <Text style={{ color: "white", fontSize: 18 }}>
                                Welcome, sodiq
                            </Text>

                            <Text style={{ color: "white", fontSize: 14 }}>What do you want to learn today?</Text>

                        </View>
                    </View>

                    <View style={{ borderRadius: 10, borderColor: "white", borderWidth: 2 }}>
                        <Link href="/home/notification">
                            <ApIcon
                                size={25}
                                name="notifications"
                                type="MaterialIcons"
                                color="white"

                            />
                        </Link>

                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'center' }}>

                    <View>
                        <Text style={{ color: "white", fontWeight: "800", fontSize: 20, textAlign: "center" }}>Wallet Balance</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                            <ApIcon
                                size={30}
                                name="naira-sign"
                                type="FontAwesome6"
                                color="white"
                            />
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 38, fontFamily: "Ubuntu_Bold" }}>500</Text>

                            <View style={{ paddingHorizontal: 10 }}>
                                <ApIcon
                                    size={20}
                                    name="eye"
                                    type="FontAwesome"
                                    color="white"
                                />
                            </View>


                        </View>



                    </View>

                </View>

                
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "80%", marginHorizontal: "auto", paddingBottom: 15 }}>
                        <ApButton
                            label="Fund Wallet"
                            iconName="money-check"
                            iconFamily="FontAwesome6"
                            onPress={() => {
                                router.navigate("wallet")
                            }}
                        />
                    </View>
                </View>

            </View>


            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                <Text style={{ paddingVertical: 10, fontSize: 18, fontWeight: "bold" }}>Quick Actions</Text>

                <ScrollView
                    contentContainerStyle={{ flexDirection: "row", flexGrow: 1 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                        {
                            quickAction.map((a, index) => (
                                <TouchableOpacity onPress={() => { router.navigate(a.link), console.log(a.link) }}>
                                    <View key={index} style={{ borderWidth: 2, width: 80, justifyContent: "center", height: 80, borderRadius: 10, borderColor: "#362756" }}>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <ApIcon
                                                size={30}
                                                name={a?.iconTitle}
                                                type={a?.iconFamily as any}
                                                color="#362756"
                                            />
                                        </View>

                                        <Text style={{ textAlign: "center" }}>{a.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))
                        }
                    </View>

                </ScrollView>

            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ paddingVertical: 10, fontSize: 18, fontWeight: "bold" }}>Recent Activities</Text>
                    <Text>See all</Text>
                </View>


                <View>


                    {quickActivity.length == 0 ? (<View style={{ justifyContent: "center", alignItems: "center" }} >
                        <ApIcon
                            size={150}
                            name="clipboard-text-search-outline"
                            type="MaterialCommunityIcons"
                            color="#362756"
                        />
                    </View>) :
                        <View>

                            {quickActivity.map((i, index) => (
                                <Link href={{
                                    pathname: "(tabs)/home/[id]",
                                    params: { id: i }
                                } as never}  >

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
                                                    <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Ubuntu_Regular" }}>{i.title}</Text>
                                                    <Text style={{ color: "grey", fontSize: 10 }}>{i.subtitle}</Text>
                                                </View>

                                            </View>

                                        </View>

                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{i.total}</Text>
                                            <Text style={{ color: "grey", fontSize: 10 }}>23rd, Jan, 2023</Text>
                                        </View>
                                    </View>
                                </Link>

                            ))}
                        </View>

                    }


                </View>

            </View>

        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({})