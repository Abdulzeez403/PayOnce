import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ApSafeAreaView from "@/components/safeAreaView";
import { ApIcon } from "@/components/icon";
import { quickAction } from "../../../constants/data";
import { router } from "expo-router";
import { ApHeaderTitle } from "@/components/header/headerTitle";

const index = () => {
  return (
    <ApSafeAreaView>
      <ApHeaderTitle
        title="Services"
        caption="The Best  Services You Can Get"
      />

      <ScrollView
        contentContainerStyle={{ flexDirection: "row", paddingTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {quickAction.map((a, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                router.navigate(a.link);
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  width: 105,
                  justifyContent: "center",
                  height: 100,
                  borderRadius: 10,
                  borderColor: "#362756",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ApIcon
                    size={30}
                    name={a?.iconTitle}
                    type={a?.iconFamily as any}
                    color="#362756"
                  />
                </View>

                <Text style={{ textAlign: "center" }}>{a.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ApSafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
