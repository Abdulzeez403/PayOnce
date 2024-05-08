import AsyncStorage from "@react-native-async-storage/async-storage";

// Assuming you have an object with storeData and getData functions
export const ServiceStorage = {
  storeData: async (data: any, key: any) => {
    try {
      await AsyncStorage.setItem(key, data);
      console.log("Data stored successfully.");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  },
  getData: async (key: any) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log("Data retrieved successfully:", data);
      } else {
        console.log("No data found for key:", key);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  },
};

// // To call storeData function
// dataHandler.storeData("your_data", "your_key");

// // To call getData function
// dataHandler.getData({ key: "your_key" });
