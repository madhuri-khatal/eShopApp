import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
export default function CheckoutAsRole(props: any) {
  const navigation: any = useNavigation();
  return (
    <>
      <ScrollView>
        <View style={{marginVertical: 20, padding: 7}}>
          <View style={{marginTop: 14}}>
            <Button
              style={{
                width: '97%',
                height: 50,
                backgroundColor: '#f25616',
                borderRadius: 10,
                padding: 3,
                justifyContent: 'center',
              }}
              mode="contained"
              onPress={() => navigation.navigate('CheckoutScreen')}
              >
              <Text
                style={{
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  fontSize: 17,
                  textTransform: 'capitalize',
                  color: '#ffffff',
                }}>
                Checkout as a guest
              </Text>
            </Button>
            <Button
              style={{
                width: '97%',
                height: 50,
                backgroundColor: '#f25616',
                borderRadius: 10,
                padding: 3,
                marginTop: 30,
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  fontSize: 17,
                  textTransform: 'capitalize',
                  color: '#ffffff',
                }}>
                Log In
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  methodText: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedMethod: {
    backgroundColor: '#F7B492',
    borderColor: '#F7B492',
  },
  selectedMethodText: {
    color: '#ffffff',
  },
  methodDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  methodDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
