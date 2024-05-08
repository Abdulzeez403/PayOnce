
import { generateReferenceNumber } from "@/service/apis";
import btoa from "@/service/btoaPayfill"
import { IWallet } from '@/service/types';
import React, { createContext, useContext, useState } from 'react'
interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    balance: any;
    resetError: () => void;
    getWalletBalance: (walletReference: any) => void;
    createWallet: (values: IWallet) => void;



}
const WalletContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    balance: [],
    resetError: () => { },

    getWalletBalance(walletReference) {
        return walletReference
    },
    createWallet(values) {
        return values;
    }
});

export const useWalletContext = () => {
    let context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const WalletProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [balance, setBalance] = useState('')

    const apiKey = "MK_TEST_QFB4YE5YX5"
    const baseUrl = 'https://sandbox.monnify.com';
    const clientSecret = '48XG25XPH4PQQCJ0K9HQAA5T93SUXAPR'
    const credentials = `${apiKey}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);



    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };


    const getWalletBalance = (walletReference: any) => {
        const authorizationHeader = 'Basic ' + btoa(apiKey + ':' + clientSecret);
        fetch(`${baseUrl}/api/v1/disbursements/wallet/balance?accountNumber=${walletReference}`, {
            method: 'GET',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': 'application/json'
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (status: ${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setBalance(data?.responseBody?.availableBalance as any)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    const createWallet = async ({
        walletName,
        customerName,
        customerEmail,
        bvn,
        bvnDateOfBirth
    }: IWallet) => {


        const dateParts = bvnDateOfBirth.split('-');
        const formattedDateOfBirth = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));


        try {
            const refNumber = generateReferenceNumber();
            const response = await fetch(`${baseUrl}/api/v1/disbursements/wallet`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletReference: refNumber,
                    walletName: walletName,
                    customerName: customerName,
                    bvnDetails: { bvn: bvn, bvnDateOfBirth: formattedDateOfBirth.toISOString().split('T')[0] },
                    customerEmail: customerEmail,
                    feeBearer: "CUSTOM",
                    feeSourceAccountNumber: "8622811762"
                })
            });

            console.log("Response status:", response.status);
            console.log("Response status text:", response.statusText);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Wallet created successfully", data);
            // You can return data or perform additional actions here
            return data;
        } catch (error) {
            console.error('There was a problem with creating the wallet:', error.message);
            throw error; // Re-throw the error for the caller to handle if needed
        }
    };











    return (
        <WalletContext.Provider
            value={{
                loading, success, isError, resetError, balance, getWalletBalance, createWallet
            }}>
            {children}

        </WalletContext.Provider>
    )
}