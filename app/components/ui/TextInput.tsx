import React from 'react';
import {Control, Controller, FieldValues, useForm} from 'react-hook-form';
import {KeyboardTypeOptions, StyleProp, TextStyle} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
interface ITextInputController {
  control: Control<FieldValues, any>;
  label?: string;
  style?: StyleProp<TextStyle>;
  name?: string;
  textStyle?: StyleProp<TextStyle>;
  mode?: 'flat' | 'outlined';
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  defaultValue?: string;
  errors?: any;
  pattern?: any;
  isRequiredValue?: boolean;
  errorMsg?: string;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
  isdisabled?: boolean;
}
export const TextInputController = ({
  control,
  label = '',
  style,
  name = '',
  mode,
  placeholder,
  keyboardType,
  defaultValue,
  errors,
  pattern,
  isRequiredValue = false,
  errorMsg = 'please write a data!!!',
  maxLength,
  multiline = true,
  numberOfLines = 0,
  secureTextEntry = false,
  textContentType,
  isdisabled,
}: ITextInputController) => {
  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            keyboardType={keyboardType}
            mode={mode}
            textContentType={textContentType}
            style={style}
            multiline={multiline}
            defaultValue={defaultValue}
            placeholder={placeholder}
            label={label}
            numberOfLines={numberOfLines}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            maxLength={maxLength}
            // error={errors[name] && true}
            secureTextEntry={secureTextEntry}
            disabled={isdisabled}
          />
        )}
        name={name}
        rules={{
          pattern: pattern,
          required: {
            value: isRequiredValue,
            message: errorMsg,
          },
        }}
      />
      {/* <Text style={{color: 'red'}}>
        {errors[name] && errors[name]?.message}
      </Text> */}
    </>
  );
};
