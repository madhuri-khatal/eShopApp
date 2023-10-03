import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CouponBannerProps {
  coupon: {
    title: string;
    description: string;
  };
}

const CouponBanner: React.FC<CouponBannerProps> = ({coupon}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bannerText}>{coupon.title}</Text>
      <Text style={styles.bannerText}>{coupon.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9a825', // Swiggy's coupon banner color
    padding: 16,
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CouponBanner;
