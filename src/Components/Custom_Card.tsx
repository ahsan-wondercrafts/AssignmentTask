import { Box, Image } from 'native-base';
import {StyleSheet} from 'react-native'
import React from 'react';
import { Card, Text } from 'native-base';
import moment from 'moment';

interface CardViewProps {
  item: {
    created_at: string;
    image_url: string;
    name: string;
    comment: string;
  };
}

const CardView: React.FC<CardViewProps> = ({ item }) => {
  const originalDate = item?.created_at;
  const formattedDate = moment(originalDate).format('Do [of] MMMM YYYY');

  return (
    <Card style={styles.Main_View}>
      {item?.image_url && (
        <Box style={styles.Image_View}>
          <Image source={{ uri: item?.image_url }} style={styles.Image} resizeMode="cover" />
        </Box>
      )}
      <Box style={styles.Text_Area}>
        <Box style={styles.Avatar}>
          <Image
            source={require('../../assets/Images/users.png')}
            style={styles.AvatarImage}
            resizeMode="contain"
          />
        </Box>
        <Box flex={1}>
          <Text color={"black"} fontSize={14}>{item?.name || 'Vito Margiotta'}</Text>
          <Text color={"black"} fontSize={14}>{formattedDate}</Text>
        </Box>
      </Box>
      <Box style={styles.Comment_Area}>
        {item?.comment ? (
          <Text color={"black"} fontSize={14} numberOfLines={3}>
            {item?.comment}
          </Text>
        ) : (
          <Text color={"black"} fontSize={14}>Lorem ipsum dolor is the dummy text</Text>
        )}
      </Box>
    </Card>
  );
};

const styles = StyleSheet.create({
  Main_View: { flex: 1, backgroundColor: 'white', marginHorizontal: '5%', marginVertical: '3%', borderRadius: 10 },
  Image_View: { alignItems: 'center', height: 160, width: '100%' },
  Image: { flex: 1, height: '50%', width: '100%', borderRadius: 6, overflow: 'hidden' },
  Text_Area: { flexDirection: 'row', marginTop: '2%' },
  Avatar: { backgroundColor: 'lightgrey', padding: 8, borderRadius: 8, marginRight: '2%' },
  AvatarImage: { width: 24, height: 22, tintColor: 'white' },
  Comment_Area: { marginVertical: '2%' },
});

export default CardView;
