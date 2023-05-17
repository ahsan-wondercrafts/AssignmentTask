import { Box, Image, Card, Text } from 'native-base';
import React from 'react';
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
    <Card flex={1} backgroundColor={'white'} marginX={'5%'} marginTop={'5%'} borderRadius={'md'}
    >
      {item?.image_url && (
        <Box alignItems={'center'} width={'100%'} height={160}
        >
          <Image source={{ uri: item?.image_url }}
            flex={1}
            height={'50%'}
            width={'100%'}
            borderRadius={6}
            overflow={'hidden'}
            resizeMode="cover" />
        </Box>
      )}
      <Box
        flexDirection={'row'}
        marginTop={'4%'}
      >
        <Box
          backgroundColor={'lightgrey'}
          padding={2}
          borderRadius={8}
          marginRight={'2%'}
        >

          <Image
            source={require('../../assets/Images/users.png')}
            width={6}
            height={6}
            tintColor={'white'}
            resizeMode="contain"
          />
        </Box>
        <Box flex={1} justifyContent={'space-between'}>
          <Text color={"black"} fontSize={14}>{item?.name || 'Vito Margiotta'}</Text>
          <Text color={"black"} fontSize={14}>{formattedDate}</Text>
        </Box>
      </Box>
      <Box
        marginTop={'4%'}
      >
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

export default CardView;
