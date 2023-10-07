// import {useProductContext} from '../../context/ProductContext';
// import React, {useState, useEffect} from 'react';
// import {View, Image, StyleSheet} from 'react-native';

// const ImageCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const {images, getHomeSlider} = useProductContext();

//   useEffect(() => {
//     getHomeSlider();
//   }, []);

//   const nextImage = () => {
//     setCurrentIndex(prevIndex => {
//       return (prevIndex + 1) % images.length;
//     });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextImage();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex]);
//   return (
//     <View style={styles.container}>
//       <Image source={{uri: images[currentIndex]}} style={styles.image} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {alignItems: 'center', justifyContent: 'center'},
//   image: {
//     width: 400,
//     height: 155,
//   },
//   controls: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   arrowLeft: {
//     marginRight: 10,
//   },
//   arrowRight: {
//     marginLeft: 10,
//   },
// });

// export default ImageCarousel;








import React, { useState,useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';

const ImageCarousel:React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      title: 'Item 1',
      content: 'Content for Item 1',
    },
    {
      title: 'Item 2',
      content: 'Content for Item 2',
    },
    {
      title: 'Item 3',
      content: 'Content for Item 3',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next index, looping back to 0 when reaching the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // 3 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  const renderItem = (item: any, index: number) => {
    return (
      <Card key={index} style={styles.card}>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.content}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        {data.map((item, index) => (
          <View key={index} style={index === currentIndex ? styles.currentSlide : styles.slide}>
            {renderItem(item, index)}
          </View>
        ))}
      </View>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <Button
            key={index}
            mode="outlined"
            style={index === currentIndex ? styles.activeDot : styles.dot}
            onPress={() => setCurrentIndex(index)}
          >
            {''}
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    paddingHorizontal: 8,
  },
  currentSlide: {
    paddingHorizontal: 8,
    transform: [{ scale: 1.2 }],
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#888',
  },
  activeDot: {
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  card: {
    width: 300,
  },
});

export default ImageCarousel;
