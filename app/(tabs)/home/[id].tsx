import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import ApSafeAreaView from '@/components/safeAreaView';
import ApHeader from '@/components/header';
import ApBackButton from '@/components/icon/back';


const transcationInfo = () => {
    const { id } = useLocalSearchParams();
    return (
        <ApSafeAreaView>
            <ApHeader title={id as any} leftIcon={<ApBackButton />} />

            <Text>transcation  {id}</Text>
        </ApSafeAreaView>
    )
}

export default transcationInfo

const styles = StyleSheet.create({})