import React from 'react';
import { Box, Text } from 'native-base';
import { StyleSheet } from 'react-native';

interface HandleErrorProps {
  error: Error | undefined;
}

const HandleError: React.FC<HandleErrorProps> = ({ error }) => (
  <Box style={styles.container}>
    <Text  color={'red.600'} fontSize={20} >{error?.message}</Text>
  </Box>
);

export default HandleError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
});
