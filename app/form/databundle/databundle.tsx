import { ApButton } from "@/components/button";
import ApHeader from "@/components/header";
import { ApIcon } from "@/components/icon";
import ApBackButton from "@/components/icon/back";
import ApTextInput from "@/components/input/textInput";
import ApSafeAreaView from "@/components/safeAreaView";
import { Formik, Field } from "formik";
import { useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text, Button, ActivityIndicator } from "react-native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/bottomSheet";
import { IBuyData } from "@/service/types";
import { generateRequestID } from "@/service/apis";
import { NetworkProviders } from "@/constants/data";
import { useVtpassContext } from "../context";
import { useBuyDataBundleContext } from "./context";
import ApModal from "@/components/modal";
import { router } from "expo-router";

const DataForm = () => {


    const [selectedDataPlan, setSelectedDataPlan] = useState('')
    const { dataServices, getDataPlan } = useVtpassContext();
    const {buyDatabundle,getDataPlans, success, resetError, loading, isError} = useBuyDataBundleContext()
    const [inputValue, setInputValue] = useState<{ variation_code: string}>({
        variation_code: "mtn-10mb-100",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [formValues, setFormValues] = useState<{  billersCode: string } | null>(null);

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { dismiss } = useBottomSheetModal();
    const handlePresentModalPress = () => bottomSheetRef.current?.present();

    const handleDataPlan = async (value: any) => {
        const payload = `${value}-data`
        setSelectedDataPlan(payload);
        handlePresentModalPress();
        await getDataPlan(payload);
    }


    const handleFormSubmit = async (values: IBuyData) => {
        const id = generateRequestID();
        const payload = {
            billersCode:values.billersCode,
            phone:"08011111111" ,
            serviceID: selectedDataPlan,
            variation_code: inputValue?.variation_code,
            request_id: id
        }
        buyDatabundle(payload)
        console.log(payload, 'payload...')

    };

    const handleOpenModal = (values: any) => {
        setFormValues(values);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        resetError();
    };

    const resetFormValues = (formikProps: any) => {
        formikProps.resetForm();
        setModalVisible(false);
    };


    return (
        <ApSafeAreaView>
            <ApHeader title='Buy Data Bundles' leftIcon={<ApBackButton />} />
            <Formik
                initialValues={{  billersCode: '' }}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, values }) => (
                    <View>
                        <View>
                            <Text style={{ marginVertical: 10 }}>Service Provider: {selectedDataPlan}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                {NetworkProviders.map((p, index) => (
                                    <TouchableOpacity key={index} onPress={() => {
                                        handleDataPlan(p.value)
                                }}>
                                        <View style={selectedDataPlan === p.value ? { position: "relative", borderWidth: 2, borderColor: "red", borderRadius: 4, padding: 4 } : {}}>
                                            <Image
                                                source={p.img}
                                                style={{ width: 75, height: 75, borderRadius: 10 }}
                                            />
                                            {selectedDataPlan === p.value && (
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

                        {/* <Field
                            component={ApTextInput}
                            name="amount"
                            label="Enter Amount"
                            placeholder="Enter amount..."
                            keyboardType="numeric"
                        /> */}


                        <Field
                            component={ApTextInput}
                            name="billersCode"
                            label="Reciept Number"
                            placeholder="Enter phone number..."
                            keyboardType="phone-pad"
                        // rightIcon={
                        //     <ApIcon
                        //         size={30}
                        //         name="contacts"
                        //         type="AntDesign"
                        //         color="#362756"
                        //     />
                        // }

                        />

                        <ApButton label="Continue..." onPress={()=>handleOpenModal(values)} />
                    </View>
                )}
            </Formik>

            <View>
                <CustomBottomSheetModal ref={bottomSheetRef} >

                    <View>
                        {
                            dataServices?.content?.varations.map((s: any, i: number) => (
                                <TouchableOpacity key={i} onPress={() => {
                                    setInputValue({
                                        variation_code: s.variation_code,
                                    }),
                                        dismiss()
                                }}>

                                    <Text>{s.name}</Text>
                                </TouchableOpacity>

                            ))
                        }

                    </View>


                    <Button title="Dismiss Modal" onPress={() => dismiss()} />

                </CustomBottomSheetModal>

            </View>

            <ApModal visible={modalVisible} onClose={handleCloseModal}>
                {formValues && !isError && !success && (
                    <View>
                        <Text style={{ textAlign: "center", paddingVertical: 4 }}>
                            Confirm the following information:
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Service</Text>
                            <Text>{selectedDataPlan}</Text>
                        </View>
                      
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Phone Number</Text>
                            <Text>{formValues.billersCode}</Text>
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

export default DataForm;