
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface RatingProps {
  rating: number;
  maxRating: number;
  iconFilled: JSX.Element;
  iconEmpty: JSX.Element;
  iconSize?: any;
  iconStyle?: object;
  editable?: boolean;
  onRatingChange?: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating,
  iconFilled,
  iconEmpty,
  iconSize,
  iconStyle,
  editable = true,
  onRatingChange,
}) => {
  const handleIconPress = (newRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const renderRatingIcons = () => {
    const ratingIcons = [];
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      ratingIcons.push(
        <TouchableOpacity
          key={i}
          style={{ ...styles.iconContainer, ...iconStyle }}
          onPress={() => handleIconPress(i)}
          activeOpacity={0.7}
          disabled={!editable}
            
          >
    
          {isFilled ? React.cloneElement(iconFilled, { style: { fontSize: iconSize } }) : React.cloneElement(iconEmpty, { style: { fontSize: iconSize } })}
        </TouchableOpacity>
      );
    }
    return ratingIcons;
  };

  return <View style={styles.container}>{renderRatingIcons()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  iconContainer: {
    margin: 5,
    },
});

export default Rating;
