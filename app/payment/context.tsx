import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Alert, Linking } from 'react-native';

interface PaymentContextProps {
  initializePayStackPayment: (email: string, amount: number) => Promise<void>;
  verifyPayStackPayment: (reference: string) => Promise<void>;
  paymentStatus: string | null;
  paymentReference: string | null;
  setPaymentReference: (reference: string | null) => void;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  const PUBLIC_API_ROUTE="http://192.168.43.233:3000/api"


  const initializePayStackPayment = async (email: string, amount: number) => {
    try {
      const response = await axios.post(`${PUBLIC_API_ROUTE}/pay/initialize`, { email, amount });
      
      // Extract the payment URL and reference
      const {  reference } = response.data.data;
  
      // Save the payment reference for later verification
      setPaymentReference(reference);
  
      // // Redirect the user to the payment URL in their default browser
      // Linking.openURL(authorization_url)
      //   .catch((err) => {
      //     Alert.alert('Failed to open the payment URL', err.message);
      //   });
    } catch (error: any) {
      Alert.alert('Payment Initialization Failed', error.response?.data?.error || 'Something went wrong.');
    }
  };
  
  const verifyPayStackPayment = async (reference: string) => {
    try {
      const response = await axios.post(`${PUBLIC_API_ROUTE}/api/verify`, { reference });
      
      if (response.data.message === 'Payment verified and wallet updated successfully') {
        setPaymentStatus('success');
        Alert.alert('Payment Successful', 'Your wallet has been updated.');
      } else {
        setPaymentStatus('failed');
        Alert.alert('Payment Verification Failed', response.data.message);
      }
    } catch (error: any) {
      setPaymentStatus('failed');
      Alert.alert('Payment Verification Error', error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <PaymentContext.Provider value={{ initializePayStackPayment, verifyPayStackPayment, paymentStatus, paymentReference, setPaymentReference }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextProps => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
