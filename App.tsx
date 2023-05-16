import React from 'react';
import { NativeBaseProvider } from 'native-base';
import TopTabs from './src/Navigations/TopTabs';
import Custom_Header from './src/Components/Custom_Header';

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <>
        <Custom_Header />
        <TopTabs />
      </>
    </NativeBaseProvider>
  );
};

export default App;
