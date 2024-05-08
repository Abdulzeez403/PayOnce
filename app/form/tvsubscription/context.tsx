
import { generateRequestID } from '@/service/apis';
import { IBuyAirtime, IBuyData, IVerifyMeterNumber } from '@/service/types';
import React, { createContext, useContext, useState } from 'react'
interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    tvSubPlan: any;
    resetError: () => void;
    getTvSubPlans: (serviceID: string) => void;



}
const BuyTvSubscriptionContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    tvSubPlan: [],
    resetError: () => { },

    getTvSubPlans(serviceID) {
        return serviceID
    },
});

export const useBuyTvSubscriptionContext = () => {
    let context = useContext(BuyTvSubscriptionContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const BuyTvScriptionProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [tvSubPlan, setTvSubPlan] = useState([])

    const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
    const s_public = "PK_966b09134d907cd9cabe2d8f061c612f7e257742bd1";
    const tvsubscriptionUil = "https://sandbox.vtpass.com/api/service-variations?serviceID="



    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };




    const getTvSubPlans = async (serviceID: string) => {
        try {
            const response = await fetch(tvsubscriptionUil + serviceID,
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
        <BuyTvSubscriptionContext.Provider
            value={{
                loading, success, isError,
                tvSubPlan,
                resetError, getTvSubPlans
            }}>
            {children}

        </BuyTvSubscriptionContext.Provider>
    )
}