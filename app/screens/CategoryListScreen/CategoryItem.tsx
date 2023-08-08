import React from 'react';
import {  Chip } from 'react-native-paper';
import { Image } from 'react-native';

interface IProps {
  icon: any;
  title: any;
}

export default function CategoryItem({ icon, title }: IProps) {
     return (
       <Chip
      icon={() => <Image source={{ uri: icon }} style={{ width: 24, height: 24 }} />} 
          style={{marginLeft:10,padding:5,marginTop:5, backgroundColor:'#f77239'}}
          >
      {title}
    </Chip>
   );
}
