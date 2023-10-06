import {View, Text, Image} from 'react-native';
import React from 'react';

export default function Footer() {
  return (
    <>
      <View style={{paddingBottom: 10}}>
        <View style={{flex: 1, flexDirection: 'row', margin: 30}}>
          <View style={{width: '15%'}}>
            <Image
              source={{
                uri: 'https://shgeshop.com/wp-content/uploads/2020/12/icons8-headset-45.png',
              }}
              style={{width: 45, height: 45}}
            />
          </View>
          <View style={{width: '85%'}}>
            <Text style={{fontWeight: 'bold', color: '#506574'}}>
              Need help? Call us: (+91) 8459172859
            </Text>
            <Text style={{color: '#506574'}}>
              Monday - Friday: 8:00 - 21:00 Saturday - Sunday 9:00 - 18:00
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
