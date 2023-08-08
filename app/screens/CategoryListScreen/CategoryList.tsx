import {View, Text} from 'react-native';
import React from 'react';
import CategoryItem from './CategoryItem';
import {ScrollView} from 'react-native-gesture-handler';

const Categories = [
  {
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'Papad',
  },
  {
    icon: 'https://img.freepik.com/premium-vector/hand-drawn-jar-canned-cucumbers-colourful-sketch-vector-illustration_163786-893.jpg?w=2000',
    title: 'Pickle',
  },
  {
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'vade',
  },
  {
    icon: 'https://media.istockphoto.com/id/1306889416/vector/package-and-plate-of-chips-in-trendy-cartoon-style.jpg?s=612x612&w=0&k=20&c=2n5i3hqW23uJXxIF8q-QX5QxhR7pJnM7RgZCXq_JAn8=',
    title: 'chips',
  },
];

export default function CategoryList() {
  return (
    <ScrollView
    
      showsHorizontalScrollIndicator={true} // Hide horizontal scroll indicator
      style={{flex: 1, flexDirection: 'column'}}
      //   contentContainerStyle={{
      //     flexDirection: 'column',
      //     flex: 1,
      //     backgroundColor: 'red',
      //   }} // Align items horizontally
    >
      {Categories.map(category => (
        <View
          key={category.title}
          style={{width: '25%', backgroundColor: 'yellow'}}
          //   style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}
        >
          <CategoryItem icon={category.icon} title={category.title} />
        </View>
      ))}
    </ScrollView>
  );
}
