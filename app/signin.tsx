import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Link, router } from 'expo-router'
import ApSafeAreaView from '@/components/safeAreaView'
import { ApButton } from '@/components/button'
import { Field, Formik } from 'formik'
import ApTextInput from '@/components/input/textInput'
import ApHeader from '@/components/header'
import ApBackButton from '@/components/icon/back'
import { useAuthContext } from './context'
import ApSpinner from '@/components/loader/spinner'
import * as Yup from 'yup';


const SignInScreen = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("email is required"),
        password: Yup.string().required("password is required"),
    }

    )
    const { signIn, loading } = useAuthContext();

    const handleSubmit = async (value: any) => {
        const { email, password } = value;
        try {
            await signIn(email, password);
            router.navigate("home")
        } catch (error) {
            console.log(error)

        }
    }


    return (
        <ApSafeAreaView>
            <ApHeader title='Sign In' leftIcon={<ApBackButton />} />

            <ApSpinner loading={loading} />
            <View>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <View>
                            <View>
                                <Text>Sign In..</Text>
                            </View>

                            <Field
                                component={ApTextInput}
                                name="email"
                                label="Email"
                                placeholder="example@gmail.com"
                            />

                            <Field
                                component={ApTextInput}
                                name="password"
                                label="Password"
                                placeholder="*******"
                                keyboardType="numeric"
                            />
 
                            <View>
                                <ApButton label="Sign In" onPress={handleSubmit} />

                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Text>You already have an account!</Text>
                                    <TouchableOpacity onPress={() => router.navigate('/signup')}>
                                        <Text style={{ color: "red" }} >Register</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>



                    )}
                </Formik>
            </View>

        </ApSafeAreaView>
    )
}

export default SignInScreen