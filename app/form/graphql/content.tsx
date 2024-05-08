
import React, { createContext, useContext, useState } from 'react'
import { useAirtime, } from './query';
import { IBuyAirtime } from '@/service/types';

interface IProp {
    loading: boolean;
    airtime: IBuyAirtime[] | undefined;
    // postAirtime: (value: any) => Promise<void>;
    getAirtmeInfo: () => void




}
const GraphqlApiContext = createContext<IProp>({
    loading: false,
    airtime: undefined,
    // postAirtime: (value: any) => {
    //     return value
    // },
    getAirtmeInfo() {
    }

});

export const useGraphqlApiContext = () => {
    let context = useContext(GraphqlApiContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const GraphqlApiProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [airtime, setAirtime] = useState<IBuyAirtime[] | undefined>(undefined);
    const [isError, setIsError] = useState()
    const getAirtime = useAirtime()



    const getAirtmeInfo = async () => {
        try {
            setLoading(true);
            const res = await getAirtime.page({
                variables: {}
            });
            console.log('Query response:', res);

            const data = res?.data?.getAirtimeResponses;
            if (data) {
                setAirtime(data); // Directly set the data to state
                setLoading(false);
            } else {
                console.error('Response data is undefined:', res);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching airtime:', error);
        }
    };




    return (
        <GraphqlApiContext.Provider
            value={{ loading, airtime, getAirtmeInfo }}>
            {children}

        </GraphqlApiContext.Provider>
    )
}