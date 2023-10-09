import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useProductContext } from '../../context/ProductContext'

export default function Festival() {
  const {getFestival,festival}=useProductContext();
   useEffect(() => {
    getFestival()
   }, []);
  const data=festival?.image_url 
  return (
     <View style={{paddingTop:10,paddingBottom:10}}>
        <Image source={{uri:data}} style={{height:100 }}/>
      </View>
        )
}
