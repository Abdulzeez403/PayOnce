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
    const {buyDatabundle,success, resetError, loading, isError} = useBuyDataBundleContext()
    const [inputValue, setInputValue] = useState<{ variation_code: string}>({
        variation_code: "mtn-10mb-100",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [formValues, setFormValues] = useState<{  billersCode: string } | null>(null);

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { dismiss } = useBottomSheetModal();
    const handlePresentModalPress = () => bottomSheetRef.current?.present();

    const handleDataPlan = async (value: any) => {
        const payload = `${value}-data`;
        setSelectedDataPlan(payload)
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
                {({ handleSubmit, values ,isValid, dirty }) => (
                    <View>
                        <View>
                            <Text style={{ marginVertical: 10 }}>Service Provider: {selectedDataPlan}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                {NetworkProviders.map((p, index) => (
                                    <TouchableOpacity key={index} onPress={() => {
                                        handleDataPlan(p.value)
                                }}>
                                        <View style={selectedDataPlan === p.value? { position: "relative", borderWidth: 2, borderColor: "red", borderRadius: 4, padding: 4 } : {}}>
                                            <Image
                                                source={p.img}
                                                style={{ width: 75, height: 75, borderRadius: 10 }}
                                            />
                                            {selectedDataPlan === p.value && (
                                                <View style={{ position: "absolute", top: 20, left: 25 }}>
                                                    <ApIcon size={25} name="check" type="Entypo" color="red" />
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                       <View style={{paddingVertical:10, borderWidth:1, borderColor:"grey", marginTop:10}}>
                        <Text style={{fontWeight:"bold", paddingLeft:8}}>{inputValue.variation_code}</Text>
                       </View>


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

                        <ApButton label="Continue..." 
                       onPress={() => handleOpenModal(values)}
                            disabled={!(isValid && dirty)} 
                         />
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

                                    <Text style={{color:"white", marginVertical:4, backgroundColor:"#362756", paddingHorizontal:20, 
                                        paddingVertical:10
                                    }}>{s.name}</Text>
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
                        <ApButton label="Try Again" onPress={handleCloseModal} />
                    </View>
                )}

            </ApModal>

        </ApSafeAreaView>
    )
}

export default DataForm;