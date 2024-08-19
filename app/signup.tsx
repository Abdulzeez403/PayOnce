

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ApTextInput from '@/components/input/textInput'
import { Field, Formik } from 'formik'
import { ApButton } from '@/components/button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import ApSafeAreaView from '@/components/safeAreaView'
import ApHeader from '@/components/header'
import ApBackButton from '@/components/icon/back'
import ApSpinner from '@/components/loader/spinner'
import { useAuthContext } from './context'
import { CreateUserInput, IWallet } from '@/service/types'
import * as Yup from 'yup';
import { useWalletContext } from './form/wallet/context'


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bvn: Yup.number().required(),
    phone: Yup.string().required(),
    password: Yup.number().required(),
})


const SignupScreen = () => {
    const { signUp, loading } = useAuthContext()
    const { createWallet, } = useWalletContext()


    const handleSubmit = async (value: IWallet) => {
        try {

            const payload: IWallet = {
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                phone: value.phone
                // preferred_bank: value.preferred_bank

            }
            console.log("thevale", value)

            await createWallet(payload)
            await signUp(value as any).then(() => {
                router.navigate("signin")

            })
        } catch (error) {
            console.error(error);

        }

    }
    return (
        <ApSafeAreaView>
            <ApHeader title='Sign Up' leftIcon={<ApBackButton />} />
            <ApSpinner loading={loading} />

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",

                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <View>
                        <Field
                            component={ApTextInput}
                            name="firstName"
                            label="FirstName"
                            placeholder="firstName"
                        // keyboardType="numeric"
                        />

                        <Field
                            component={ApTextInput}
                            name="lastName"
                            label="LastName"
                            placeholder="lastName"
                        // keyboardType="numeric"
                        />

                        <Field
                            component={ApTextInput}
                            name="email"
                            label="Email"
                            placeholder="example@gmail.com"
                        // keyboardType="numeric"
                        />

                        <Field
                            component={ApTextInput}
                            name="bvn"
                            label="bvn"
                            placeholder="bvn number"
                        // keyboardType="numeric"
                        />


                        <Field
                            component={ApTextInput}
                            name="phone"
                            label="PhoneNumber"
                            placeholder="29494949494"
                            keyboardType="numeric"
                        />

                        <Field
                            component={ApTextInput}
                            name="password"
                            label="Password"
                            placeholder="*******"
                            keyboardType="numeric"
                        />

                        <View>
                            <ApButton label="Sign Up" onPress={handleSubmit} />
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text>You already have an account!</Text>

                                <TouchableOpacity onPress={() => router.navigate('/signin')}>
                                    <Text style={{ color: "red" }} >logIn</Text>
                                </TouchableOpacity>

                            </View>


                        </View>



                    </View>



                )}
            </Formik>
        </ApSafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})