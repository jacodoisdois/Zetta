import React from 'react';
import TabNavigator from './navigators/TabNavigator';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import Toast, { BaseToastProps, ToastConfig } from 'react-native-toast-message';
import { CustomToast } from './components/CustomToast/CustomToast';


const toastConfig: ToastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <CustomToast text1={text1} text2={text2} type="success"/>
  ),
  error: ({ text1, text2 }: BaseToastProps) => <CustomToast text1={text1} text2={text2} type="error" />,
};

const App = () => {
  return (
    <>
      <TabNavigator />
      <Toast config={toastConfig} />
    </>
  );
};

registerRootComponent(App);
export default App;
