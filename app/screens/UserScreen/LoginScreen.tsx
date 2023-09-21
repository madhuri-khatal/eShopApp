import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ActivityIndicator, Checkbox, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {TextInputController} from '../../components/ui/TextInput';
interface LoginScreenProps {
  username: string;
  password: string;
}

export const LoginScreen: any = function LoginScreen({navigation}: any) {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
      }}>
      {/* <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View> */}
      <View style={{justifyContent: 'center'}}>
        <Image
          style={{width: '100%', height: '60%'}}
          source={require('../../../assets/image/LoginPage.png')}
        />
      </View>
      <View style={{justifyContent: 'flex-start', padding: 20, paddingTop: 10}}>
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
          // onPress={handleSubmit(onLogin)}
          // disabled={isLoginLoading}
        >
          <Text
            style={{
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
