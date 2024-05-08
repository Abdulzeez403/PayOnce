import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import client from '@/apolloclient';
import { GraphqlApiProvider } from './form/graphql/content';
import { BuyAirtimeProvider } from './form/airtime/context';
import { BuyTvScriptionProvider } from './form/tvsubscription/context';
import { BuyDataBundleProvider } from './form/databundle/context';
import { BuyElectricityProvider } from './form/electricity/context';
import { VtpassProvider } from './form/context';
import { WalletProvider } from './form/wallet/context';
import { AuthContextProvider } from './context';


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Ubuntu_Bold": require('../assets/fonts/Ubuntu-Bold.ttf'),
        "Ubuntu_BoldItalic": require('../assets/fonts/Ubuntu-BoldItalic.ttf'),
        "Ubuntu_Regular": require('../assets/fonts/Ubuntu-Regular.ttf'),
        "Ubuntu_Medium": require('../assets/fonts/Ubuntu-Medium.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (


        <ApolloProvider client={client}>
            {/* <Provider store={store}> */}
            <AuthContextProvider>

                <VtpassProvider>

                    <BuyAirtimeProvider>
                        <BuyTvScriptionProvider>
                            <BuyDataBundleProvider>
                                <BuyElectricityProvider>
                                    <WalletProvider>

                                        <GraphqlApiProvider>
                                            <GestureHandlerRootView style={{ flex: 1 }}>
                                                <BottomSheetModalProvider>
                                                    <SafeAreaProvider>
                                                        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                                                            <Stack>
                                                                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                                                <Stack.Screen name="index" options={{ headerShown: false }} />
                                                                <Stack.Screen name="signin" options={{ headerShown: false }} />

                                                                <Stack.Screen name="signup" options={{ headerShown: false }} />
                                                                <Stack.Screen name="form" options={{ headerShown: false }} />
                                                                <Stack.Screen name="passcode" options={{ headerShown: false }} />  <Stack.Screen name="passcodesetup" options={{ headerShown: false }} />



                                                            </Stack>
                                                        </ThemeProvider>
                                                    </SafeAreaProvider>
                                                </BottomSheetModalProvider>
                                            </GestureHandlerRootView>
                                        </GraphqlApiProvider>
                                    </WalletProvider>

                                </BuyElectricityProvider>

                            </BuyDataBundleProvider>

                        </BuyTvScriptionProvider>
                    </BuyAirtimeProvider>
                </VtpassProvider>

            </AuthContextProvider>


            {/* </Provider> */}
        </ApolloProvider>


    );
}
