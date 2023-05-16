import { Box, Text } from 'native-base';
import React from 'react';

interface CustomButtonProps {
  title: string | JSX.Element;
}

const Custom_Button: React.FC<CustomButtonProps> = ({ title }) => {
  return (
    <Box
      backgroundColor="#543cdc"
      padding="5%"
      width="100%"
      alignItems="center"
      borderRadius={10}
    >
      <Text color="white">{title}</Text>
    </Box>
  );
};

export default Custom_Button;
