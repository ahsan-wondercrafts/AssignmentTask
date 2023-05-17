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
    <Card flex={1} backgroundColor={'white'} marginX={5} marginTop={5} borderRadius={'md'}
    >
      {item?.image_url && (
        <Box alignItems={'center'} width={'100%'} height={200}
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
        marginTop={3}
      >
        <Box
          backgroundColor={'lightgrey'}
          width={43}
          height={43}
          borderRadius={8}
          alignItems={'center'}
          justifyContent={'center'}
        >

          <Image
            source={require('../../assets/Images/users.png')}
            width={28}
            height={16}
            tintColor={'white'}
            resizeMode="contain"
          />
        </Box>

        <Box flex={1} marginLeft={2} justifyContent={'flex-start'} >
          <Text color={"black"} fontSize={16}>{item?.name || 'Vito Margiotta'}</Text>
          <Text color={"#4027DF"} fontSize={16}>{formattedDate}</Text>
        </Box>

      </Box>



      <Box
        marginTop={4}
      >
        {item?.comment ? (
          <Text color={"black"} fontSize={16} numberOfLines={3}>
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
