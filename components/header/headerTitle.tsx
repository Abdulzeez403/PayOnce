import React from 'react'
import { View, Text } from 'react-native'
interface IProps {
    title: string,
    caption: string
}

export const ApHeaderTitle = ({ title, caption }: IProps) => {
    return (
        <View>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{title}</Text>
            <Text style={{ lineHeight: 14 }}>{caption}</Text>
        </View>
    )
}

