import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Rating from '../../components/ui/RatingComponent';
import CurrencyComponent from '../../components/ui/Currencycomponent';
import {useNavigation} from '@react-navigation/native';
import {useProductContext} from '../../context/ProductContext';
import he from 'he'; // For decoding HTML entities

interface IProps {
  name?: any;
  description?: any;
  img?: any;
  price?: any;
  rating?: any;
  product?: any;
}

export default function ProductItem({product}: IProps) {
  const {images: [{src = ''} = {}] = []} = product;
  const {getProductById} = useProductContext();
  const navigation: any = useNavigation();

  const handlePress = async () => {
    await getProductById(product.id);
    navigation.navigate('ProductDetailsScreen', {productId: product.id});
  };

  let productImageSrc = product.images?.[0]?.src || product.image?.src;

  const getParsedPriceHtml = (html: string) => {
    // Match and extract the current price
    const currentPriceMatch = html.match(/<ins.*?>(.*?)<\/ins>/);
    const originalPriceMatch = html.match(/<del.*?>(.*?)<\/del>/);

    const stripTags = (htmlString: string) =>
      htmlString.replace(/<[^>]*>/g, '').trim();

    let currentPrice = null;
    let originalPrice = null;

    // Decode and assign prices if found
    if (currentPriceMatch) {
      currentPrice = he.decode(stripTags(currentPriceMatch[1])); // Decode HTML entities for current price
    } else {
      // If there's no <ins> tag, try to get the whole price as the current price
      currentPrice = he.decode(stripTags(html));
    }

    if (originalPriceMatch) {
      originalPrice = he.decode(stripTags(originalPriceMatch[1])); // Decode HTML entities for original price
    }

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* Display the original price with strike-through if available */}
        {originalPrice && (
          <Text
            style={{
              textDecorationLine: 'line-through',
              marginRight: 8,
              fontSize: 17,
              color: '#cc3a1d',
            }}>
            {originalPrice}
          </Text>
        )}

        {/* Display the current price */}
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#506574',
          }}>
          {currentPrice}
        </Text>
      </View>
    );
  };

  return (
    <View style={{padding: 1, width: '50%', paddingHorizontal: 5}}>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          margin: 'auto',
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        {product.on_sale && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#e95d2a',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 5,
              zIndex: 1,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Sale</Text>
          </View>
        )}

        <TouchableOpacity onPress={handlePress}>
          {productImageSrc && (
            <Image
              source={{uri: productImageSrc}}
              style={{height: 180, borderRadius: 10}}
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 17,
            // marginLeft: 5,
            overflow: 'hidden',
            flex: 1,
            marginTop: 8,
            fontWeight: '600',
            color: '#506574',
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {product.name}
        </Text>

        {/* Render the parsed price HTML */}
        {getParsedPriceHtml(product.price_html)}

        {/* <View style={{flex: 1, flexDirection: 'row', marginLeft: 8}}>
          <View style={{marginBottom: 10}}>
            <Rating
              rating={product?.average_rating}
              maxRating={5}
              editable={true}
              iconFilled={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'orange', fontSize: 20}}>★</Text>
                </View>
              }
              iconEmpty={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'orange', fontSize: 20}}>☆</Text>
                </View>
              }
              iconSize={50}
            />
          </View>
        </View> */}
      </View>
    </View>
  );
}
