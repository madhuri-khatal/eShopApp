import {useProductContext} from '../../context/ProductContext';
import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const images = [
  'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image3.png',
  'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image1.png',
  'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image2.png',
];

const ImageCarousel = () => {
  // const {getHomeSlider} = useProductContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );
  };

  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds (adjust the duration as needed)

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  // useEffect(() => {
  //   getHomeSlider();
  // });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowLeft} onPress={prevImage}>
        <AntDesign name="left" size={24} color="lightgray" />
      </TouchableOpacity>
      <View style={styles.carousel}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            style={[styles.image, index === currentIndex && styles.activeImage]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.arrowRight} onPress={nextImage}>
        <AntDesign name="right" size={24} color="lightgray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    flexDirection: 'row',
  },
  image: {
    width: 400,
    height: 155,
    marginHorizontal: 10,
    display: 'none',
  },
  activeImage: {
    display: 'flex',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -12}],
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -12}],
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ImageCarousel;
