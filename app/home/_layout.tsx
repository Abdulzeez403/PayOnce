import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"


const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="(home)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
            <Stack.Screen name="notification" options={{ presentation: 'modal' }} />



        </Stack>
    )
}

export default _layout

const styles = StyleSheet.create({})