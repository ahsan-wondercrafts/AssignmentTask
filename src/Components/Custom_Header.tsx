import { Box, Text } from 'native-base';
import React from 'react';

const Custom_Header: React.FC = () => {
  return (
    <Box
      bg="white"
      p="5%"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize={20} fontWeight="bold" color="#000">
        Checkins
      </Text>
    </Box>
  );
};

export default Custom_Header;
