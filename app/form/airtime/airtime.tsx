import { StyleSheet, Text, View, Image, TouchableOpacity, Button, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ApTextInput from '@/components/input/textInput'
import ApSafeAreaView from '@/components/safeAreaView'
import { ApIcon } from '@/components/icon'
import { ApButton } from '@/components/button'
import { Field, Formik } from 'formik'
import ApHeader from '@/components/header'
import ApBackButton from '@/components/icon/back'
import { router } from 'expo-router'
import ApModal from '@/components/modal'
import { useGraphqlApiContext } from '../graphql/content'
import { useBuyAirtimeContext } from './context'
import { NetworkProviders } from '@/constants/data'





const AirtimeForm = () => {


    const [selectedAirtime, setSelectedAirtime] = useState("");
    const { loading, isError, buyAirtime, getAirtimeQuery, success, resetError } = useBuyAirtimeContext();
    const { getAirtmeInfo, airtime } = useGraphqlApiContext()

    const [modalVisible, setModalVisible] = useState(false);
    const [formValues, setFormValues] = useState<{ amount: string; phoneNumber: string } | null>(null);

    const handleOpenModal = (values: any) => {
        setFormValues(values);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        resetError();
    };

    const handleFormSubmit = async (values: any) => {
        const { phoneNumber, amount } = values;
        const payload = { phoneNumber, amount, serviceID: selectedAirtime };
        console.log(payload, "...");
        await buyAirtime(payload);
    };


    const initialValues = { amount: '', phone: '', serviceID: '' };
    const resetFormValues = (formikProps: any) => {
        formikProps.resetForm();
        setModalVisible(false);


    };
    return (
        <ApSafeAreaView>
            <ApHeader title='Buy Airtime' leftIcon={<ApBackButton />} />

            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, values, resetForm }) => (
                    <View>
                        <View>
                            <Text style={{ marginVertical: 10 }}>Service Provider: {selectedAirtime}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                {NetworkProviders.map((p, index) => (
                                    <TouchableOpacity key={index} onPress={() => setSelectedAirtime(p.value)}>
                                        <View style={selectedAirtime === p.value ? { position: "relative", borderWidth: 2, borderColor: "red", borderRadius: 4, padding: 4 } : {}}>
                                            <Image
                                                source={p.img}
                                                style={{ width: 75, height: 75, borderRadius: 10 }}
                                            />
                                            {selectedAirtime === p.value && (
                                                <View style={{ position: "absolute", top: 20, left: 25 }}>
                                                    {/* Assuming ApIcon is your custom icon component */}
                                                    <ApIcon size={25} name="check" type="Entypo" color="red" />
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>


                        <Field
                            component={ApTextInput}
                            name="amount"
                            label="Enter Amount"
                            placeholder="Enter amount..."
                            keyboardType="numeric"
                        />
                        <Field
                            component={ApTextInput}
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter phone number..."
                            keyboardType="phone-pad"
                        />
                        <ApButton label="Continue"
                            onPress={() => handleOpenModal(values)} />
                    </View>


                )}



            </Formik>

            <ApModal visible={modalVisible} onClose={handleCloseModal}>
                {formValues && !isError && !success && (
                    <View>
                        <Text style={{ textAlign: "center", paddingVertical: 4 }}>
                            Confirm the following information:
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Service</Text>
                            <Text>{selectedAirtime}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Amount</Text>
                            <Text>{formValues.amount}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Phone Number</Text>
                            <Text>{formValues.phoneNumber}</Text>
                        </View>
                        <ApButton
                            label={loading ? (<ActivityIndicator />) : "Continue/pay"}
                            onPress={() => handleFormSubmit(formValues)}
                        />
                    </View>
                )}

                {success && (
                    <View>
                        <Text>Congratulations!</Text>
                        <Text>Your transaction was successful.</Text>
                        <View>
                            <ApButton label="Place Another Transaction" onPress={() => resetFormValues} />
                            <ApButton label="Close" onPress={() => { router.navigate("/home") }} />
                        </View>
                    </View>
                )}

                {isError && (
                    <View>
                        <View>
                            <Text style={{ textAlign: "center", color: "red" }}>Oppor!:</Text>
                            <Text>Are you sure the receipt number is correct?</Text>
                        </View>
                        <ApButton label="Try Again" onPress={handleCloseModal} />
                    </View>
                )}

            </ApModal>



        </ApSafeAreaView>
    )
}

export default AirtimeForm

const styles = StyleSheet.create({})

