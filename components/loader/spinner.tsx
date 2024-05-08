import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import Spinner from 'react-native-loading-spinner-overlay'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spinner from 'react-native-loading-spinner-overlay'

interface IProp {
    loading: boolean
}
const ApSpinner = ({ loading }: IProp) => {
    return (
        <SafeAreaView>
            <Spinner
                visible={loading}
                // textContent={'Loading...'}
                textStyle={styles.spinnerText}
                overlayColor="rgba(0, 0, 0, 0.5)"
            // customIndicator={<ActivityIndicator size="large" color="#0000ff" />}

            />
        </SafeAreaView>

    )
}

export default ApSpinner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    spinnerText: {
        color: '#FFF',
    },
});