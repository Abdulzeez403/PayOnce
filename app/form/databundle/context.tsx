
import { generateRequestID } from '@/service/apis';
import { IBuyAirtime, IBuyData, IVerifyMeterNumber } from '@/service/types';
import React, { createContext, useContext, useState } from 'react'
interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    dataServices: any;
    resetError: () => void;
    getDataPlans: (serviceID: any) => void
    buyDatabundle: (values: IBuyData) => void
    getDataQuery: (request_id: any) => void




}
const BuyDataBundleContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    dataServices: [],
    resetError: () => { },
    getDataPlans: (serviceID: any) => {
        return serviceID
    },
    buyDatabundle: () => { },

    getDataQuery: (request_id: any) => {
        return request_id
    },

});

export const useBuyDataBundleContext = () => {
    let context = useContext(BuyDataBundleContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const BuyDataBundleProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataServices, setDataServices] = useState()
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
    const s_public = "PK_966b09134d907cd9cabe2d8f061c612f7e257742bd1";
    const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f";



    const querydataplansUri = "https://sandbox.vtpass.com/api/service-variations?serviceID="
    const purchaseDatabundleUri = "https://sandbox.vtpass.com/api/pay"
    const querySuccessResponseUrl = "https://sandbox.vtpass.com/api/requery"




    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };

    const getDataPlans = async (serviceID: any) => {
        setLoading(true)
        try {
            const response = await fetch(`${querydataplansUri}${serviceID}`,
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

    const buyDatabundle = async ({  billersCode, phone, variation_code, serviceID, request_id }: IBuyData) => {
        setLoading(true)
        try {

            const requestBody = {
                phone: phone,
                serviceID: serviceID,
                billersCode: billersCode,
                variation_code: variation_code,
                request_id: request_id,
            };

            const response = await fetch(purchaseDatabundleUri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": s_api_key,
                    "secret-key": s_secret,
                },
                body: JSON.stringify(requestBody),
            });
           
            if (!response.ok) {
                throw new Error("Purchase request failed");
                
            } 

            const purchaseData = await response.json();


             // Check if purchase was successful
             if (purchaseData.code === "000") {
                console.log("Purchase successful");

                const requeryResponse = await fetch(querySuccessResponseUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": s_api_key,
                        "secret-key": s_secret,
                    },
                    body: JSON.stringify({ request_id: request_id }),
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
        } catch (error:any) {
            console.error("Error:", error);
            setLoading(false)

        }

    }

    const getDataQuery = (request_id: any) => {
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






    return (
        <BuyDataBundleContext.Provider
            value={{
                loading, success, isError, dataServices,
                buyDatabundle, getDataPlans,getDataQuery, resetError,
            }}>
            {children}

        </BuyDataBundleContext.Provider>
    )
}