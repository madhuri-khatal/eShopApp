import React from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {ActivityIndicator, Checkbox, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {TextInputController} from '../../components/ui/TextInput';
import {useCartContext} from '../../context/CartContext';
interface LoginScreenProps {
  username: string;
  password: string;
}

export const LoginScreen: any = function LoginScreen({navigation}: any) {
  const {onLogin, isLoginLoading} = useCartContext();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  return (
    <View
      style={{
        width: '100%',
        // marginTop: 100,
      }}>
      {isLoginLoading && (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#e95d2a" />
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 10,
          padding: 20,
          elevation: 8,
          width: '90%',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 50,
        }}>
        <Text
          style={{
            justifyContent: 'center',
            padding: 20,
            fontSize: 22,
            fontWeight: 'bold',
            color: 'gray',
            textAlign: 'center',
          }}>
          You need to Login to view order.
        </Text>
      </View>
      <View style={{padding: 20, paddingTop: 10}}>
        <TextInputController
          control={control}
          name="username"
          label="E-mail"
          errors={errors}
          keyboardType={'default'}
          isRequiredValue
          mode="outlined"
          placeholder={''}
          style={{marginVertical: 10}}
        />
        <TextInputController
          control={control}
          name="password"
          label="Password"
          errors={errors}
          isRequiredValue
          keyboardType={'default'}
          mode="outlined"
          placeholder={''}
          style={{marginVertical: 10}}
        />
        <TouchableOpacity
          style={{height: '100%', width: '100%'}}
          onPress={handleSubmit(onLogin)}
          // disabled={isLoginLoading}
        >
          <Text
            style={{
              elevation: 8,
              backgroundColor: '#e95d2a',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
