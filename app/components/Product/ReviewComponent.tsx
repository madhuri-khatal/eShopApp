import Rating from '../../components/ui/RatingComponent';
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-paper';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [newReview, setNewReview] = useState({rating: 0, comment: ''});

  const handleSubmit = () => {
    setReviews([...reviews, newReview]);
    setNewReview({rating: 0, comment: ''});
  };

  return (
    <View>
      <Text>Customer Reviews</Text>
      <View>
        {reviews.map((review: any, index: any) => (
          <View key={index} style={{marginBottom: 10}}>
            <Rating
              rating={5}
              maxRating={5}
              iconFilled={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'gold', fontSize: 30}}>★</Text>
                </View>
              }
              iconEmpty={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'gold', fontSize: 30}}>☆</Text>
                </View>
              }
              iconSize={50}
              editable={true}
            />
            <Text>{review.comment}</Text>
          </View>
        ))}
      </View>
      <Text>Add a Review</Text>
      {/* <Rating
        showRating
        onFinishRating={(rating: any) => setNewReview({...newReview, rating})}
      /> */}
      <TextInput
        placeholder="Write your review here..."
        value={newReview.comment}
        onChangeText={comment => setNewReview({...newReview, comment})}
        multiline
        style={{borderWidth: 1, marginBottom: 10, padding: 5}}
      />
      <Button onPress={handleSubmit}>Submit Review</Button>
    </View>
  );
};

export default ReviewComponent;
