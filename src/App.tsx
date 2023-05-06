import React from 'react';
import TabNavigator from './navigators/TabNavigator';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

const App = () => {
  return <TabNavigator />;
};

registerRootComponent(App);
export default App;
