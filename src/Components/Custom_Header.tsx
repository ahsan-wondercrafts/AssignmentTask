import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  Main_Container: {
    backgroundColor: 'white',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

const Custom_Header: React.FC = () => {
  return (
    <View style={styles.Main_Container}>
      <Text style={styles.Header_Text}>Checkins</Text>
    </View>
  );
};

export default Custom_Header;
