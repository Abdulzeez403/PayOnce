import { generateRequestID } from "@/service/apis";
import { IBuyAirtime, IBuyData, IVerifyMeterNumber } from "@/service/types";
import React, { createContext, useContext, useState } from "react";
interface IProp {
  loading: boolean;
  success: boolean;
  isError: boolean;
  resetError: () => void;
  buyAirtime: (values: IBuyAirtime) => void;
  getAirtimeQuery: (request_id: any) => void;
}
const BuyAirtimeContext = createContext<IProp>({
  loading: false,
  success: false,
  isError: false,
  resetError: () => {},
  buyAirtime: () => {},

  getAirtimeQuery: (request_id: any) => {
    return request_id;
  },
});

export const useBuyAirtimeContext = () => {
  let context = useContext(BuyAirtimeContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const BuyAirtimeProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
  const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f";
  const purchaseAirtimeUrl = "https://sandbox.vtpass.com/api/pay";
  const querySuccessResponseUrl = "https://sandbox.vtpass.com/api/requery";

  const resetError = () => {
    setIsError(false);
    setLoading(false);
    setSuccess(false);
  };

  const buyAirtime = async ({
    amount,
    phoneNumber,
    serviceID,
  }: IBuyAirtime) => {
    setIsError(false);
    setSuccess(false);
    setLoading(false);
    try {
      setLoading(true);
      const id = generateRequestID();
      const requestBody = {
        amount: amount,
        phone: phoneNumber,
        serviceID: serviceID,
        request_id: id,
      };

      // Make the purchase request
      const purchaseResponse = await fetch(purchaseAirtimeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": s_api_key,
          "secret-key": s_secret,
        },
        body: JSON.stringify(requestBody),
      });

      if (!purchaseResponse.ok) {
        throw new Error("Purchase request failed");
      }

      const purchaseData = await purchaseResponse.json();
      console.log("Purchase Response:", purchaseData);

      // Check if purchase was successful
      if (purchaseData.code === "000") {
        console.log("Purchase successful");

        const requeryResponse = await fetch(querySuccessResponseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": s_api_key,
            "secret-key": s_secret,
          },
          body: JSON.stringify({ request_id: id }),
        });

        if (!requeryResponse.ok) {
          throw new Error("Transaction status query failed");
        }

        const requeryData = await requeryResponse.json();
        console.log("Transaction Status:", requeryData);
        setSuccess(true);
        setLoading(false);
        console.log(success);
      } else {
        console.error("Purchase failed:", purchaseData.errors);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAirtimeQuery = (request_id: any) => {
    const url = "https://sandbox.vtpass.com/api/requery";
    const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae"; // Replace with your actual API key
    const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f"; // Replace with your actual secret key

    const requestData = {
      request_id: request_id, // Replace 'YOUR_REQUEST_ID_HERE' with the actual request ID
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": s_api_key,
        "secret-key": s_secret,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        console.log("Response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };
  return (
    <BuyAirtimeContext.Provider
      value={{
        loading,
        success,
        isError,
        buyAirtime,
        getAirtimeQuery,
        resetError,
      }}
    >
      {children}
    </BuyAirtimeContext.Provider>
  );
};
