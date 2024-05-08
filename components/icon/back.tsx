import { View, Text } from 'react-native'
import React from 'react'
import { ApIcon } from '.'
import { router } from 'expo-router'


const ApBackButton = () => {
    return (
        <View style={{ borderWidth: 2, padding: 1, borderRadius: 10 }}>
            <ApIcon
                size={25}
                name="chevron-back"
                type="Ionicons"
                color="black"
                onPress={() => router.back()}
            />
        </View>

    )
}

export default ApBackButton