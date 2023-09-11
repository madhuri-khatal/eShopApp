import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';

const getRandomColor = () => {
  const colors = [
    '#fc5603',
    '#fa5f11',
    '#f76a23',
    '#f57738',
    '#f78952',
    '#f79b6d',
    '#f7b492',
    '#facdb6',
    '#d6b7a7',
    '#e87a1a',
    '#f59c4e',
    '#f7c599',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#ed991a',
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const RandomAvatar = () => {
  const randomColor = getRandomColor();

  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <Avatar.Text
        size={130}
        label="JD"
        style={{backgroundColor: randomColor}}
        labelStyle={{fontSize: 50}}
      />
    </View>
  );
};

export default RandomAvatar;
