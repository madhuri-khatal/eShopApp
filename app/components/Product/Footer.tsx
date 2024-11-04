import {View, Text, Image} from 'react-native';
import React from 'react';
export default function Footer() {
  return (
    <>
      <View style={{paddingBottom: 10}}>
        <View style={{flex: 1, flexDirection: 'row', margin: 15}}>
          <View style={{width: '17%'}}>
            <Image
              source={{
                uri: 'https://shgeshop.com/wp-content/uploads/2020/12/icons8-headset-45.png',
              }}
              style={{width: 40, height: 40, alignItems: 'flex-start'}}
            />
          </View>
          <View style={{width: '86%'}}>
            <Text style={{fontWeight: 'bold', color: '#506574'}}>
              Need help? Call us: (+91) 8459172859
            </Text>
            <Text style={{color: '#506574'}}>
              Monday - Friday: 8:00 - 21:00
            </Text>
            <Text style={{color: '#506574'}}>
              Saturday - Sunday 9:00 - 18:00
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}