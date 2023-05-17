import React from 'react';
import { Box, Text } from 'native-base';

interface HandleErrorProps {
  error: Error | undefined;
}

const HandleError: React.FC<HandleErrorProps> = ({ error }) => (
  <Box 
  flex={1}
  alignItems={'center'}
  justifyContent={'center'}
  mx={'5%'}
  // style={styles.container}
  >
    <Text  color={'red.600'} fontSize={20} >{error?.message}</Text>
  </Box>
);

export default HandleError
