import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ApSafeAreaView from '@/components/safeAreaView'
import { Field, Formik } from 'formik'
import { ApButton } from '@/components/button'
import ApTextInput from '@/components/input/textInput'
import ApBackButton from '@/components/icon/back'
import ApHeader from '@/components/header'
import ApCheckbox from '@/components/checkbox'
import { electricityProviders } from '@/constants/data'
import CustomBottomSheetModal from '@/components/bottomSheet'
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { ApIcon } from '@/components/icon'
import ApModal from '@/components/modal'
import { router } from 'expo-router'
import { useBuyElectricityContext } from './context'

type Props = {}

const ElectricityForm = (props: Props) => {

    const [selectedValue, setSelectedValue] = useState("prepaid");
    const { buyElectricity, electricityProvider, loading, isError, success, resetError } = useBuyElectricityContext()
    const [selectedProvider, setSelectedProvider] = useState("Eko Electric Payment -IKEDC")

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { dismiss } = useBottomSheetModal();
    const handlePresentModalPress = () => bottomSheetRef.current?.present();


    const name = selectedProvider.split(" ")[0].toLowerCase();
    const otherName = selectedProvider.split(" ")[1].toLowerCase();
    const company = `${name}-${otherName}`;


    const [modalVisible, setModalVisible] = useState(false);
    const [formValues, setFormValues] = useState<{ amount: string; phone: string; billersCode: string } | null>(null);

    const handleOpenModal = (values: any) => {
        setFormValues(values);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        resetError();
    };

    const handleCheckboxChange = (value: string) => {
        setSelectedValue(value === selectedValue ? '' : value);
        console.log(selectedValue)
    };

    const handleFormSubmit = (values: any) => {
        const { billersCode, serviceID, type, amount, phone } = values;
        const payload = { billersCode, serviceID, type, amount, phone, variation_code: selectedValue };
        buyElectricity(payload);
        console.log(values);
    }



    return (
        <ApSafeAreaView>
            <ApHeader title='Buy Electricity' leftIcon={<ApBackButton />} />

            <Formik
                initialValues={{ amount: "", billersCode: "", serviceID: company, type: selectedValue, phone: "" }}
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, values }) => (
                    <View>

                        <Field
                            component={ApTextInput}
                            name="billersCode"
                            label="Enter Meter"
                            placeholder="Enter Meter Number..."
                            keyboardType="numeric"

                        />

                        <Field
                            component={ApTextInput}
                            name="amount"
                            label="Enter Amount"
                            placeholder="Enter Amount Number..."
                            keyboardType="numeric"

                        />

                        <Field
                            component={ApTextInput}
                            name="phone"
                            label="Enter PhoneNumber"
                            placeholder="Enter PhoneNumber..."
                            keyboardType="numeric"

                        />



                        <TouchableOpacity style={styles.input} onPress={handlePresentModalPress}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                <Text style={{ paddingTop: 8 }}>
                                    {selectedProvider ? selectedProvider : "Select Provider:"}
                                </Text>
                                <ApIcon
                                    size={30}
                                    name="arrow-drop-down"
                                    type="MaterialIcons"
                                    color={'black'}
                                />

                            </View>

                        </TouchableOpacity>


                        <View style={{ flexDirection: "row", gap: 20, marginVertical: 10 }}>
                            <ApCheckbox
                                label="Pre-paid"
                                onValueChange={() => { handleCheckboxChange }}
                                selectedValue={selectedValue}
                                value="prepaid"
                            />

                            <ApCheckbox
                                label="Post-paid"
                                onValueChange={handleCheckboxChange}
                                selectedValue={selectedValue}
                                value="postpaid"
                            />
                        </View>




                        <ApButton label="Continue" onPress={() => handleOpenModal(values)} />
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
                            <Text>Meter-Number</Text>
                            <Text>{formValues.billersCode}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Amount</Text>
                            <Text>{formValues.amount}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Phone Number</Text>
                            <Text>{formValues.phone}</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>type</Text>
                            <Text>{selectedValue}</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Electricity Service</Text>
                            <Text>{selectedProvider}</Text>
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
                            <ApButton label="Place Another Transaction" />
                            <ApButton label="Close" onPress={() => { router.navigate("/home"), resetError() }} />
                        </View>
                    </View>
                )}

                {isError && (
                    <View>
                        <View>
                            <Text style={{ textAlign: "center", color: "red" }}>Oppor!:</Text>
                            <Text>Are you sure the Meter Number is correct?</Text>
                        </View>
                        <ApButton label="Try Again" onPress={handleCloseModal} />
                    </View>
                )}

            </ApModal>
            <CustomBottomSheetModal ref={bottomSheetRef} >
                <View>
                    {electricityProviders.map((e, i) => (
                        <TouchableOpacity style={{ paddingVertical: 4 }} key={i} onPress={() => {
                            setSelectedProvider(e.name),
                                dismiss()
                        }
                        }>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Image source={e.logo} style={{ width: 30, height: 30, marginRight: 10 }} />
                                <Text>{e.name}</Text>

                            </View>
                        </TouchableOpacity>
                    ))}
                </View>


            </CustomBottomSheetModal>

        </ApSafeAreaView>
    )
}

export default ElectricityForm

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        width: "100%",
        marginVertical: 10
    },
})