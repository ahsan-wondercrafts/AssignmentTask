import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Card } from 'native-base';
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
        <View style={styles.Image_View}>
          <Image source={{ uri: item?.image_url }} style={styles.Image} resizeMode="cover" />
        </View>
      )}
      <View style={styles.Text_Area}>
        <View style={styles.Avatar}>
          <Image source={require('../../assets/Images/users.png')} style={styles.AvatarImage} />
        </View>
        <View style={{ flex: 1 }}>
          {item?.name ?
            <Text style={styles.Desc_Text}>{item?.name}</Text>
            :
            <Text style={styles.Desc_Text}>Vito Margiotta</Text>
          }
          <Text style={styles.Desc_Text}>{formattedDate}</Text>
        </View>
      </View>

      <View style={styles.Comment_Area}>
        {item?.comment ? (
          <Text style={styles.Desc_Text} numberOfLines={3}>
            {item?.comment}
          </Text>
        ) : (
          <Text style={styles.Desc_Text}>Lorem ipsum dolor is the dummy text</Text>
        )}
      </View>

    </Card>
  );
};

const styles = StyleSheet.create({
  Main_View: { flex: 1, backgroundColor: 'white', marginHorizontal: '5%', marginVertical: '3%', borderRadius: 10 },
  Image_View: { alignItems: 'center', height: 160, width: '100%'},
  Image: { flex: 1, height: '50%', width: '100%', borderRadius: 6, overflow: 'hidden' },
  Text_Area: { flexDirection: 'row', marginTop: '2%',  },
  Avatar: { backgroundColor: 'lightgrey', padding: 8, borderRadius: 8, marginRight: '2%' },
  AvatarImage: { width: 24, height: 22, tintColor: 'white' },
  Desc_Text: { color: '#000', fontSize: 14 },
  Comment_Area: {  marginVertical: '2%' },
});

export default CardView;
