import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Field, Formik } from 'formik'
import { ApButton } from '@/components/button'
import ApSafeAreaView from '@/components/safeAreaView'
import ApTextInput from '@/components/input/textInput'
import ApHeader from '@/components/header'
import ApBackButton from '@/components/icon/back'
import { Tv_Subscription } from '@/constants/data'
import { ApIcon } from '@/components/icon'
import CustomBottomSheetModal from '@/components/bottomSheet'
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useBuyTvSubscriptionContext } from './context'

type Props = {}

const CableTvForm = (props: Props) => {

    const [selectedTvSub, setSelectedTvSub] = useState("");
    const { getTvSubPlans, tvSubPlan } = useBuyTvSubscriptionContext()


    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { dismiss } = useBottomSheetModal();

    const handlePresentModalPress = () => bottomSheetRef.current?.present();


    const handleTvSubPlan = async (value: any) => {
        await setSelectedTvSub(value)
        handlePresentModalPress()
        // getTvSubPlans(value)
    }




    const handleFormSubmit = (values: any) => {
        console.log(values)
    }
    return (
        <ApSafeAreaView>
            <ApHeader title='Buy TV Subscription' leftIcon={<ApBackButton />} />

            <Formik
                initialValues={{ amount: "", }}
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, values }) => (
                    <View>

                        <View>
                            <Text style={{ marginVertical: 10 }}>Service Provider:{selectedTvSub}</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                {Tv_Subscription.map((p, index) => (
                                    <TouchableOpacity key={index} onPress={() => {
                                        handleTvSubPlan(p.value)
                                        getTvSubPlans(p.value)
                                        console.log(p.value)

                                    }}>


                                        <View style={selectedTvSub === p.value ? { position: "relative", borderWidth: 2, borderColor: "red", borderRadius: 4, padding: 4 } : {}}>
                                            <Image
                                                source={p.logo}
                                                style={{ width: 75, height: 75, borderRadius: 10 }}
                                            />
                                            {selectedTvSub === p.value && (
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









                        <ApButton label="Continue" />
                    </View>
                )}
            </Formik>

            <CustomBottomSheetModal ref={bottomSheetRef} >
                <View>
                    {tvSubPlan.varations?.map((variation: any, index: number) => (
                        <TouchableOpacity
                            style={{ paddingVertical: 4 }}
                            key={index}
                            onPress={() => {
                                // handleTvSubPlan(variation.name)
                                dismiss();
                            }}
                        >
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={{ color: "red" }}>{variation.name}</Text>
                                <Text>{variation.variation_amount}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>


            </CustomBottomSheetModal>
        </ApSafeAreaView>
    )
}

export default CableTvForm;

const styles = StyleSheet.create({})