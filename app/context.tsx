
import { CreateUserInput } from '@/service/types';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { createContext, useContext, useState } from 'react'
import { useWalletContext } from './form/wallet/context';
import { Alert } from 'react-native';

const SIGNIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        email
      }
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      email
      phone
      bvn
      password
    }
  }
`;


interface IProp {
    loading: boolean;
    success: boolean;
    isError: boolean;
    user: any;
    resetError: () => void;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (value: CreateUserInput) => Promise<void>;



}
const AuthContext = createContext<IProp>({
    loading: false,
    success: false,
    isError: false,
    resetError: () => { },
    user: {},
    signIn: () => Promise.resolve(),
    signUp: () => Promise.resolve(),
});

export const useAuthContext = () => {
    let context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [user, setUser] = useState([])
    const [signinMutation] = useMutation(SIGNIN_MUTATION);
    const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            const { data } = await signinMutation({
                variables: {
                    email,
                    password,
                },
            });
            setUser(data)
            setLoading(false)
            console.log('SignIn successful:', data);

            return data;

        } catch (error) {
            setLoading(false)
            console.error('SignIn error:', error);
            throw error
        }
    };



    const signUp = async (userData: CreateUserInput) => {
        setLoading(true)

        try {
            const { data } = await createUserMutation({
                variables: {
                    input: userData,
                },
            });
            // Handle successful user creation
            const payload = {
                walletName: userData.firstName,
                customerName: userData.firstName + userData.lastName,
                customerEmail: userData.email,
                bvn: userData.bvn,
                bvnDateOfBirth: "1993-04-23"
            }
            setLoading(false)
            console.log('User created successfully:', data);
        } catch (error) {
            // Handle user creation error
            console.error('User creation error:', error);
            setLoading(false)

        }
    };





    return (
        <AuthContext.Provider
            value={{
                loading,
                success,
                isError,
                user,
                resetError,
                signIn,
                signUp
            }}>
            {children}

        </AuthContext.Provider>
    )
}