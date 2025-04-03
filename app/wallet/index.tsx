import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ApIcon } from "@/components/icon";
import ApSafeAreaView from "@/components/safeAreaView";
import { ApButton } from "@/components/button";
import { router } from "expo-router";

type Props = {};

const index = (props: Props) => {
  return (
    <ApSafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: "#362756",
            width: "100%",
            paddingVertical: 50,
          }}
        >
          <View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "800",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Current Balance
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ApIcon
                  size={30}
                  name="naira-sign"
                  type="FontAwesome6"
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 38,
                    fontFamily: "Ubuntu_Bold",
                  }}
                >
                  500
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ width: "80%", marginHorizontal: "auto", paddingBottom: 15 }}
        >
          <ApButton
            label="Fund With PayStack"
            iconName="money-check"
            iconFamily="FontAwesome6"
            onPress={() => {
              router.push("/wallet/account");
            }}
          />
        </View>
      </View>
    </ApSafeAreaView>
  );
};

export default index;
