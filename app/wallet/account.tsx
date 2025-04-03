import React from "react";
import { Paystack } from "react-native-paystack-webview";
import { View } from "react-native";

const AccountScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey="pk_test_2365c336f841503d63bd6c58f49a78e4d3d1409b"
        amount={"25000.00"}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
      />
    </View>
  );
};

export default AccountScreen;
