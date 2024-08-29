import { Alert, View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useAuthContext } from '@/app/context';
import { usePayment } from '@/app/payment/context';
import PaystackWebView from 'react-native-paystack-webview';



const PaymentScreen = () => {
  const { initializePayStackPayment, verifyPayStackPayment, paymentReference, setPaymentReference } = usePayment();
  const { currentUser, user } = useAuthContext();

  useEffect(() => {
    currentUser();
  }, []);

  

  const handlePaymentSuccess = async (data:any) => {
    if (data && data.reference) {
      await verifyPayStackPayment(data.reference);
    }
  };

  const handlePaymentCancel = () => {
    Alert.alert('Payment Cancelled', 'The payment process was cancelled.');
  };

 

  return (
    <View style={styles.container}>
      
        {/* <ApButton
          label="Fund Wallet"
          iconName="money-check"
          iconFamily="FontAwesome6"
          onPress={handlePayNow}
        /> */}
        {/* {paymentReference && ( */}
        <View style={{flex: 1}}>
          <PaystackWebView
           buttonText="Pay Now"
          showPayButton={true}
           ActivityIndicatorColor="green"
          SafeAreaViewContainer={{marginTop: 5}}
          SafeAreaViewContainerModal={{marginTop: 5}}
            paystackKey="pk_test_2365c336f841503d63bd6c58f49a78e4d3d1409b"
            billingEmail={user?.email}
            amount={10000} // Amount in kobo
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
            autoStart={true}
          />

        </View>

        {/* )} */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
 
  paymentContainer: {
    margin: 20,
  },
  activitiesContainer: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  activityDetails: {
    flexDirection: 'row',
    gap: 5,
  },
  iconWrapper: {
    backgroundColor: '#362756',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activitySubtitle: {
    color: 'grey',
    fontSize: 10,
  },
  activityTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityDate: {
    color: 'grey',
    fontSize: 10,
  },
});

export default PaymentScreen;
