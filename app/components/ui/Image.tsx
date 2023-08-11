import React from 'react';
import {View, Image, TextInput, StyleSheet} from 'react-native';

interface IProps {
  src: any;
  borderRadius?: any;
  width?: number;
  height?: number;
  alt: string;
}

const ImageComponent: React.FC<IProps> = ({
  src,
  borderRadius = 5,
  width = 100,
  height = 100,
  alt,
}) => {
  return (
    <View>
      <Image
        source={src}
        style={{width, height, borderRadius, backgroundColor: 'red'}}
        resizeMode="cover"
        alt={alt}
      />
    </View>
  );
};

export default ImageComponent;
