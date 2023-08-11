import React, {useState} from 'react';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper'; // Import necessary components

const RatingComponentEditable = ({initialValue = 0, onChange}: any) => {
  const [rating, setRating] = useState(initialValue);

  const handleRatingChange = (newRating: any) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      stars.push(
        <IconButton
          key={i}
          icon={isFilled ? 'star' : 'star-outline'}
          iconColor="gold"
          onPress={() => handleRatingChange(i)}
          size={30}
        />,
      );
    }
    return stars;
  };

  return <View style={{flexDirection: 'row'}}>{renderStars()}</View>;
};

export default RatingComponentEditable;
