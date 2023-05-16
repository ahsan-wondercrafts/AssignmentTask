import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface HandleErrorProps {
  error: Error | undefined;
}

const HandleError: React.FC<HandleErrorProps> = ({ error }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{error?.message}</Text>
  </View>
);

export default HandleError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
  },
});
