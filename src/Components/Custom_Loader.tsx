import { View, Spinner } from 'native-base';
import React from 'react';

export const Loader: React.FC = () => (
  <View flex={1} alignItems="center" justifyContent="center">
    <Spinner color="#543cdc" size="large" />
  </View>
);
