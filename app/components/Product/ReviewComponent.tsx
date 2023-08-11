import RatingComponentEditable from './RatingComponentEditable'; // Import your RatingComponentEditable
import Rating from '../../components/ui/RatingComponent';
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    image: null,
  });
  const [addingReview, setAddingReview] = useState(false);

  const fakeReviews = [
    {rating: 4, comment: 'Great product!', image: null},
    {rating: 5, comment: 'Awesome experience!', image: null},
    {rating: 3, comment: 'Could be better.', image: null},
  ];

  const handleSubmit = () => {
    setReviews([...reviews, newReview]);
    setNewReview({rating: 0, comment: '', image: null});
    setAddingReview(false);
  };

  const handleImageUpload = () => {
    // Implement your logic to open gallery or camera and handle the selected image
  };

  return (
    <View style={{padding: responsiveWidth(3)}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'justify',
          marginBottom: 10,
        }}>
        Customer Reviews
      </Text>
      <View>
        {reviews.concat(fakeReviews).map((review: any, index: any) => (
          <View key={index} style={{marginBottom: 10}}>
            <Rating
              rating={review.rating}
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
      {!addingReview && ( // Conditionally render the "Add Review" button
        <Button onPress={() => setAddingReview(true)}>Add Review</Button>
      )}
      {addingReview && ( // Conditionally render the text input and rating components
        <View>
          <TextInput
            placeholder="Write your review here..."
            value={newReview.comment}
            onChangeText={comment => setNewReview({...newReview, comment})}
            multiline
            style={{
              borderWidth: 0.7,
              marginBottom: 10,
              padding: 5,
              borderRadius: 8,
            }}
          />
          <RatingComponentEditable />
          <Button onPress={handleSubmit}>Submit Review</Button>
        </View>
      )}
    </View>
  );
};

export default ReviewComponent;
