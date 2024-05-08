
import { generateRequestID } from '@/service/apis';
import { IBuyAirtime, IBuyData, IVerifyMeterNumber } from '@/service/types';
import React, { createContext, useContext, useState } from 'react'
interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    resetError: () => void;
    electricityProvider: string[];
    buyElectricity: (values: any) => void;



}
const BuyElectricityContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    electricityProvider: [],
    resetError: () => { },

    buyElectricity: (values) => {
        return null
    },

});

export const useBuyElectricityContext = () => {
    let context = useContext(BuyElectricityContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const BuyElectricityProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [electricityProvider, setElectricityProvder] = useState([])

    const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
    const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f";
    const verifyMeterNumberUri = "'https://sandbox.vtpass.com/api/merchant-verify"




    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };



    const buyElectricity = async ({ serviceID, billersCode, type, amount, phone, variation_code, }: IVerifyMeterNumber) => {

        try {
            setIsError(false)
            setSuccess(false)
            setLoading(false)
            //Verify if the meter number is correct!
            const verifyngMeterNumber = await fetch(verifyMeterNumberUri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "api-key": s_api_key,
                    "secret-key": s_secret,
                },
                body: JSON.stringify({
                    billersCode: billersCode,
                    serviceID: serviceID,
                    type: type,
                }),
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Verification request failed");
                }
                return response.json();
            });

            // console.log("Verification response", verifyngMeterNumber);

            // purchase electricity if verification is successful
            if (verifyngMeterNumber.code === "000") {
                const id = generateRequestID();
                const purchaseElectric = await fetch('https://sandbox.vtpass.com/api/pay', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        "api-key": s_api_key,
                        "secret-key": s_secret,
                    },
                    body: JSON.stringify({
                        amount: amount,
                        billersCode: billersCode,
                        phone: phone,
                        serviceID: serviceID,
                        request_id: id,
                        variation_code: variation_code
                    }),
                }).then(response => {
                    if (!response.ok) {
                        throw new Error("purchaseElectric request failed");
                    }
                    return response.json();
                });

                //requery transanction status
                if (purchaseElectric.code === "000") {
                    const requeryResponse = await fetch("https://sandbox.vtpass.com/api/requery", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "api-key": s_api_key,
                            "secret-key": s_secret,
                        },
                        body: JSON.stringify({ request_id: id }),
                    });

                    if (!requeryResponse.ok) {
                        throw new Error("Transaction status query failed");
                    }

                    const requeryData = await requeryResponse.json();
                    console.log("Transaction Status:", requeryData);
                    setSuccess(true)
                    setLoading(false)
                }

            } else {
                console.error("purchaseElectric failed:");
                setIsError(true)
            }
        } catch (error) {
            console.error(error);
            setIsError(true)

        }
    }


    return (
        <BuyElectricityContext.Provider
            value={{
                loading, success, isError, electricityProvider, resetError, buyElectricity
            }}>
            {children}

        </BuyElectricityContext.Provider>
    )
}