import ApBottomSheet from "@/components/bottomSheet";
import { ApButton } from "@/components/button";
import ApHeader from "@/components/header";
import { ApIcon } from "@/components/icon";
import ApBackButton from "@/components/icon/back";
import ApPicker from "@/components/input/picker";
import ApTextInput from "@/components/input/textInput";
import ApSafeAreaView from "@/components/safeAreaView";
import { Formik, Field } from "formik";
import { useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text, Button } from "react-native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/bottomSheet";
import { IBuyData } from "@/service/types";
import { generateRequestID } from "@/service/apis";
import { useBuyDataBundleContext } from "./context";
import { NetworkProviders } from "@/constants/data";
import { useVtpassContext } from "../context";

const DataForm = () => {


    const [selectedDataPlan, setSelectedDataPlan] = useState('')
    const { dataServices, getDataPlan } = useVtpassContext()
    const [inputValue, setInputValue] = useState<{ variation_code: string, amount: number }>({
        variation_code: "mtn-10mb-100",
        amount: 50
    });


    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { dismiss } = useBottomSheetModal();

    const handlePresentModalPress = () => bottomSheetRef.current?.present();

    const handleDataPlan = async (value: any) => {
        await setSelectedDataPlan(value)
        handlePresentModalPress()
        getDataPlan(value)

    }

    console.log(dataServices)

    const handleFormSubmit = async (values: IBuyData) => {
        const id = generateRequestID();

        const payload = {
            amount: Number(values.amount),
            billersCode: "08011111111",
            phone: Number(values.phone),
            serviceID: selectedDataPlan,
            variation_code: inputValue?.variation_code,
            request_id: id
        }
        // getDataPlans(payload)

    };




    return (
        <ApSafeAreaView>
            <ApHeader title='Buy Data Bundles' leftIcon={<ApBackButton />} />
            <Formik
                initialValues={{ amount: 100, phone: '' }}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit }) => (
                    <View>
                        <View>
                            <Text style={{ marginVertical: 10 }}>Service Provider: {selectedDataPlan}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                {NetworkProviders.map((p, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleDataPlan(p.value)}>


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

                        <ApButton label="Continue" onPress={handleSubmit} />
                        <Text>{inputValue.amount}....</Text>


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
                                        amount: s.variation_amount
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

        </ApSafeAreaView>
    )
}

export default DataForm;