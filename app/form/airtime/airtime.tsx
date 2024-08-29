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
import { useBuyAirtimeContext } from './context'
import { NetworkProviders } from '@/constants/data'
import * as yup from 'yup';



const validationSchema = yup.object().shape({
    amount: yup
    .number()
    .required('Amount is required'),
    phone:yup.string().required("Amount is Required"),
    // serviceID:yup.string().required("serviceID is Required")
})

const AirtimeForm = () => {
    const [selectedAirtime, setSelectedAirtime] = useState("");
    const { loading, isError, buyAirtime, success, resetError } = useBuyAirtimeContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [formValues, setFormValues] = useState<{ amount: string; phone: string } | null>(null);


    const handleOpenModal = (values: any) => {
        setFormValues(values);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        resetError();
    };

    const handleFormSubmit = async (values: any) => {
        const { phone, amount } = values;
        const payload = { phoneNumber:phone, amount, serviceID: selectedAirtime };
        console.log(payload, "...");
        await buyAirtime(payload);
    };


    const initialValues = { amount: '', phone: '', serviceID:''};
    const resetFormValues = (formikProps: any) => {
        formikProps.resetForm();
        setModalVisible(false);
    };


    return (
        <ApSafeAreaView>
            <ApHeader title='Buy Airtime' leftIcon={<ApBackButton />} />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, values, resetForm, isValid, dirty  }) => (
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
                            name="phone"
                            label="Phone Number"
                            placeholder="Enter phone number..."
                            keyboardType="phone-pad"
                        />
                        <ApButton label="Continue"
                            onPress={() => handleOpenModal(values)}
                            disabled={!(isValid && dirty)} />
                    </View>


                )}



            </Formik>

            <ApModal visible={modalVisible} onClose={handleCloseModal}>
                {formValues && !isError && !success && (
                    <View>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ApIcon
            size={50}
            name="verified"
            type="MaterialIcons"
            color='green'
        />
    </View>
                        <Text style={{ textAlign: "center", fontWeight:"800" }}>
                            Confirm the following information:
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" , marginTop:10 }}>
                            <Text>Service</Text>
                            <Text>{selectedAirtime.toUpperCase()}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Amount</Text>
                            <Text>{formValues.amount}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Phone Number</Text>
                            <Text style={{fontWeight:"bold"}}>{formValues.phone}</Text>
                        </View>
                        <ApButton
                            label={loading ? (<ActivityIndicator />) : "Continue/pay"}
                            onPress={() => handleFormSubmit(formValues)}
                        />
                    </View>
                )}

                {success && (
                    <View>
                        <Text style={{textAlign:"center", fontWeight:"800"}}>Congratulations!</Text>
                        <Text style={{textAlign:"center"}}>Your transaction was successful.</Text>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ApIcon
            size={45}
            name="check"
            type="FontAwesome"
            color='green'
        />
    </View>
                            <ApButton label="Close" onPress={() => { 
                                router.navigate("/home");
                                resetError()
                                 }} />
                    </View>
                )}

                {isError && (
                    <View>
                        <View>
                            <Text style={{ textAlign: "center", color: "red" }}>Oppor!:</Text>
                            <Text>Are you sure the receipt number is correct?</Text>
                        </View>
                        <ApButton label="Try Again" onPress={handleCloseModal}  />
                    </View>
                )}

            </ApModal>



        </ApSafeAreaView>
    )
}

export default AirtimeForm


