import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { CreateUserInput } from '@/service/types';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { apiUrl } from '@/constants/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    user: any;
    isVerified:boolean;
    resetError: () => void;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (value: CreateUserInput) => Promise<void>;
    verifyEmail: (email: string, verificationCode: string) => Promise<void>;
    currentUser:()=>Promise<void>
}

const AuthContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    user: {},
    isVerified:false,
    resetError: () => { },
    signIn: () => Promise.resolve(),
    signUp: () => Promise.resolve(),
    verifyEmail: () => Promise.resolve(),
    currentUser:()=>Promise.resolve()
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const PUBLIC_API_ROUTE="http://192.168.43.233:3000/api"
    
    const resetError = () => {
        setIsError(false);
        setLoading(false);
        setSuccess(false);
    };
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post(`${PUBLIC_API_ROUTE}/auth/login`, { email, password });
            await AsyncStorage.setItem('token', response?.data?.token);
            setUser(response?.data?.user);
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: response.data?.msg || 'Welcome back!',
            });
            console.log('SignIn successful:', response?.data);
        } catch (error: any) {
            setLoading(false);
            setIsError(true);
            console.error('SignIn error:', error);
            const errorMessage = error.response?.data?.msg || error.message || "Internal Server Error!";
    
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: errorMessage,
            });
            throw error;
        }
    };

    const signUp = async (userData: CreateUserInput) => {
        setLoading(true);
        try {
            const response = await axios.post(`${PUBLIC_API_ROUTE}/auth/signup`, userData);
    
            await AsyncStorage.setItem('token', response?.data?.token);
            setUser(response?.data?.user); 
            setLoading(false);
    
            // Display success toast
            Toast.show({
                type: 'success',
                text1: "You're welcome",
                text2: response.data?.msg,
            });
    
            console.log('User created successfully:', response?.data?.user);
        } catch (error: any) {
            setLoading(false);
            setIsError(true);
    
            // Handle error from the API response
            const errorMessage = error.response?.data?.msg || error.message || "Internal Server Error!";
    
            Toast.show({
                type: 'error',
                text1: 'Sign Up Failed',
                text2: errorMessage,
            });
    
            console.error('User creation error:', error);
            throw error;
        }
    };
    
    

   


    const verifyEmail = async (email: string, verificationCode: string) => {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
    
        try {
            const response = await axios.post(
                `${PUBLIC_API_ROUTE}/auth/verify`,
                { email, verificationCode },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
                    },
                }
            );
    
            setIsVerified(true);
            Toast.show({
                type: 'success',
                text1: 'Email Verified',
                text2: response.data?.msg,
            });
    
            console.log(response.data?.msg);
        } catch (err: any) {
            setIsVerified(false);
            const errorMessage = err.response?.data?.msg || 'Something went wrong';
            setIsError(errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Verification Failed',
                text2: errorMessage,
            });
    
            console.error('Email verification error:', err);
        } finally {
            // Ensure loading state is reset
            setLoading(false);
        }
    };
    

  const currentUser = async ()=>{
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.get(`${PUBLIC_API_ROUTE}/auth/user`,{
            headers: {
                Authorization: `Bearer ${token}`
              },
        });
        setUser(response?.data?.user);
        console.log(response?.data?.user, 'the user info...')
      } catch (err: any) {
        setIsError(err.response?.data?.msg || 'Something went wrong');
      }
    
  }

    return (
        <AuthContext.Provider
            value={{
                loading,
                success,
                isError,
                user,
                isVerified,
                resetError,
                signIn,
                signUp,
                verifyEmail,
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
