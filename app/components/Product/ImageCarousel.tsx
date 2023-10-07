import {useProductContext} from '../../context/ProductContext';
import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {images, getHomeSlider} = useProductContext();

  useEffect(() => {
    getHomeSlider();
   }, []);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <View style={styles.container}>
      <Image source={{uri: images[currentIndex]}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
  image: {
    width: 400,
    height: 155,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 10,
  },
  arrowLeft: {
    marginRight: 10,
  },
  arrowRight: {
    marginLeft: 10,
  },
});

export default ImageCarousel;
