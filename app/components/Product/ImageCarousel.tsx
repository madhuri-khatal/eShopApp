import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const images = [
  require('../../../assets/image/LoginPage.png'),
  require('../../../assets/image/marketing.jpg'),
  require('../../../assets/image/LoginPage.png'),
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowLeft} onPress={prevImage}>
        <AntDesign name="left" size={24} color="lightgray" />
      </TouchableOpacity>
      <View style={styles.carousel}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
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
    paddingTop:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 200,
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
