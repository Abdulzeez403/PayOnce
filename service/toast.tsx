import React from 'react';
import { Image } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }} 
      // renderLeadingIcon={() => (
      //   <Image
      //     source={{ uri: 'https://example.com/success-icon.png' }} // Replace with your icon
      //     style={{ width: 24, height: 24 }}
      //   />
      // )}
      // renderTrailingIcon={() => (
      //   <Image
      //     source={{ uri: 'https://example.com/check-icon.png' }} // Replace with your icon
      //     style={{ width: 24, height: 24 }}
      //   />
      // )}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red' }} // Custom styling for error toast
     
    />
  ),
};

export default toastConfig;
