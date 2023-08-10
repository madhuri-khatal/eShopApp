import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function WishlistComponent() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Button onPress={toggleLike} style={{position: 'absolute', zIndex: 10}}>
      <AntDesign
        name={isLiked ? 'heart' : 'hearto'}
        color={isLiked ? '#e03f1f' : 'gray'}
        size={22}
      />
    </Button>
  );
}
