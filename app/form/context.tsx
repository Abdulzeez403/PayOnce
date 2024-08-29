
import { generateRequestID } from '@/service/apis';
import { IBuyAirtime, IBuyData, IVerifyMeterNumber } from '@/service/types';
import React, { createContext, useContext, useState } from 'react'
interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    dataServices: any;
    tvSubPlan: any;
    resetError: () => void;
    vpassBuyAirtime: (values: IBuyAirtime) => void;
    getDataPlan: (serviceID: any) => void
    vpassBuyData: (values: IBuyData) => void
    airtimeQuery: (request_id: any) => void
    electricityProvider: string[];
    electricityFunction: (values: any) => void;
    getTvSubPlans: (serviceID: string) => void;



}
const VtpassContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    electricityProvider: [],
    dataServices: [],
    tvSubPlan: [],
    resetError: () => { },
    vpassBuyAirtime: () => { },
    getDataPlan: (serviceID: any) => {
        return serviceID
    },
    vpassBuyData: () => { },
    airtimeQuery: (request_id: any) => {
        return request_id
    },
    electricityFunction: (values) => {
        return null
    },
    getTvSubPlans(serviceID) {
        return serviceID
    },
});

export const useVtpassContext = () => {
    let context = useContext(VtpassContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const VtpassProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataServices, setDataServices] = useState()
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [electricityProvider, setElectricityProvder] = useState([])
    const [tvSubPlan, setTvSubPlan] = useState([])
    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };


    const vpassBuyAirtime = async ({
        amount,
        phoneNumber,
        serviceID,
    }: IBuyAirtime) => {

        setIsError(false)
        setSuccess(false)
        setLoading(false)
        try {
            setLoading(true)
            const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae"; // Replace with your actual API key
            const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f"; // Replace with your actual secret key

            const id = generateRequestID();
            const requestBody = {
                amount: amount,
                phone: phoneNumber,
                serviceID: serviceID,
                request_id: id,
            };

            // Make the purchase request
            const purchaseResponse = await fetch("https://sandbox.vtpass.com/api/pay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": s_api_key,
                    "secret-key": s_secret,
                },
                body: JSON.stringify(requestBody),
            });

            if (!purchaseResponse.ok) {
                throw new Error("Purchase request failed");
            }

            const purchaseData = await purchaseResponse.json();
            console.log("Purchase Response:", purchaseData);

            // Check if purchase was successful
            if (purchaseData.code === "000") {
                console.log("Purchase successful");

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
                console.log(success)
            } else {
                console.error("Purchase failed:", purchaseData.errors);
                setIsError(true)
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle errors
        }
    };


    const getDataPlan = async (serviceID: any) => {
        setLoading(true)
        try {
            const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
            const s_public = "PK_966b09134d907cd9cabe2d8f061c612f7e257742bd1";

            const response = await fetch(
                `https://sandbox.vtpass.com/api/service-variations?serviceID=${serviceID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": s_api_key,
                        "public-key": s_public,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();

                console.log("API Response:", data);
                setDataServices(data)
                return data;
            } else {
                console.error("API Error:", response.statusText);
                setLoading(false)

            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false)

        }
    };

    const vpassBuyData = async ({  billersCode, phone, variation_code, serviceID, request_id }: IBuyData) => {

        setLoading(true)
        try {
            const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae"; // Replace with your actual API key
            const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f"; // Replace with your actual secret key

            const requestBody = {
                phone: phone,
                serviceID: serviceID,
                billersCode: billersCode,
                variation_code: variation_code,
                request_id: request_id,
            };

            const response = await fetch(" https://sandbox.vtpass.com/api/pay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": s_api_key,
                    "secret-key": s_secret,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);
            } else {
                console.error("API Error:", response.statusText);
                setLoading(false)

            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false)

        }

    }

    const airtimeQuery = (request_id: any) => {
        const url = 'https://sandbox.vtpass.com/api/requery'
        const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae"; // Replace with your actual API key
        const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f"; // Replace with your actual secret key

        const requestData = {
            request_id: request_id // Replace 'YOUR_REQUEST_ID_HERE' with the actual request ID
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "api-key": s_api_key,
                "secret-key": s_secret,
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                console.log('Response:', data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

    }

    // const electricityFunction = async ({ serviceID, billersCode, type, amount, phone, variation_code, request_id }: IVerifyMeterNumber) => {

    //     const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae"; // Replace with your actual API key
    //     const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f"; // Replace with your actual secret key
    //     try {
    //         const response = await fetch('https://sandbox.vtpass.com/api/merchant-verify', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 "api-key": s_api_key,
    //                 "secret-key": s_secret,

    //             },
    //             body: JSON.stringify({
    //                 billersCode: billersCode,
    //                 serviceID: serviceID,
    //                 type: type,
    //             }),
    //         });

    //         if (!response.ok) {
    //             throw new Error("Verification request failed");

    //         }

    //         const verifyngMeterNumber = await response.json();
    //         console.log("Verification response", verifyngMeterNumber);

    //         if (verifyngMeterNumber.code === "000") {

    //             const id = generateRequestID();
    //             const purchaseElectric = await fetch('https://sandbox.vtpass.com/api/pay', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     "api-key": s_api_key,
    //                     "secret-key": s_secret,

    //                 },
    //                 body: JSON.stringify({
    //                     amount: amount,
    //                     phone: phone,
    //                     serviceID: serviceID,
    //                     request_id: id,
    //                     variation_code: variation_code
    //                 }),
    //             });

    //             if (!purchaseElectric.ok) {
    //                 throw new Error("purchaseElectric request failed");

    //             }

    //             const purchaseData = purchaseElectric.json();
    //             console.log(purchaseData);

    //         } else {
    //             console.error("purchaseElectric failed:");
    //             setIsError(true)
    //         }
    //     } catch (error) {
    //         console.error(error);

    //     }
    // }

    const electricityFunction = async ({ serviceID, billersCode, type, amount, phone, variation_code, request_id }: IVerifyMeterNumber) => {
        const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae"; // Replace with your actual API key
        const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f"; // Replace with your actual secret key

        try {
            setIsError(false)
            setSuccess(false)
            setLoading(false)
            //Verify if the meter number is correct!
            const verifyngMeterNumber = await fetch('https://sandbox.vtpass.com/api/merchant-verify', {
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

    const getTvSubPlans = async (serviceID: string) => {
        try {
            const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
            const s_public = "PK_966b09134d907cd9cabe2d8f061c612f7e257742bd1";

            const response = await fetch(
                `https://sandbox.vtpass.com/api/service-variations?serviceID=${serviceID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": s_api_key,
                        "public-key": s_public,
                    },
                }
            );

            const variationData = await response.json();
            console.log("tv sub", variationData);
            setTvSubPlan(variationData)
        } catch (error) {
            console.error('Error fetching variation codes:', error);
        }
    };



    return (
        <VtpassContext.Provider
            value={{
                loading, success, isError, dataServices, electricityProvider,
                tvSubPlan,
                vpassBuyAirtime, vpassBuyData, getDataPlan, airtimeQuery, resetError, electricityFunction, getTvSubPlans
            }}>
            {children}

        </VtpassContext.Provider>
    )
}