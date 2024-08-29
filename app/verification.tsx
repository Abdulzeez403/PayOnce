import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useAuthContext } from './context';
import { router } from 'expo-router'
import {CodeField, Cursor,} from 'react-native-confirmation-code-field';
import { ApButton } from '@/components/button';

const VerificationCodeScreen = () => {
  const [code, setCode] = useState('');
  const {verifyEmail, loading, currentUser, user } = useAuthContext()

  useEffect(()=>{
currentUser()
  },[])

  const handleVerifyCode = async () => {
    try {
      await verifyEmail(user.email, code); // Pass the entered code to the verifyEmail function
      router.navigate('passcodesetup'); // Navigate to the password setup screen upon success
    } catch (error) {
      console.error(error); // Log any errors encountered during the process
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Enter Verification Code</Text>
    <Text style={styles.subtitle}>We sent you a code to your email or phone.</Text>

    <CodeField
        value={code}
        onChangeText={setCode}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoFocus
        onSubmitEditing={handleVerifyCode}
        InputComponent={TextInput} // Add this line
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.cellFocused]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

<ApButton label={loading ? 'Verifying...' : 'Verify'} onPress={handleVerifyCode} />


    {/* <TouchableOpacity style={styles.button} onPress={handleVerifyCode} disabled={loading}>
      <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
    </TouchableOpacity> */}

    {/* {loading && <Text style={styles.loadingText}>Loading...</Text>} */}
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginBottom: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  cellFocused: {
    borderColor: '#007bff',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cellText: {
    fontSize: 24,
  },
});

export default VerificationCodeScreen;
