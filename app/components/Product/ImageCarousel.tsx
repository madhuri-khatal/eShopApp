import {useProductContext} from '../../context/ProductContext';
import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ImageCarousel = () => {
  const {getHomeSlider,sliderData} = useProductContext();
  // console.log(sliderData,"sliderData");
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % sliderData.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + sliderData.length) % sliderData.length,
    );
  };

  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); 

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    getHomeSlider();
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowLeft} onPress={prevImage}>
        <AntDesign name="left" size={24} color="lightgray" />
      </TouchableOpacity>
      <View style={styles.carousel}>
        {/* {sliderData.map((image: any, index:number ) => ( */}
          <Image
            // key={index}
            source={{uri: sliderData[0]}}
            style={[styles.image,     
                  //  index === currentIndex &&
               styles.activeImage]}
          />
       {/* ))}  */}
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
