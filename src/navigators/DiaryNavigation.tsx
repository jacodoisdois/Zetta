import CreateDiary  from '../screens/CreateDiary';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Diaries from '../screens/Diaries';
import DiaryRead from '../screens/DiaryRead';
const Stack = createStackNavigator();

const DiaryNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }} >
        <Stack.Screen name="Diaries" component={Diaries} />
        <Stack.Screen name="DiaryRead" component={DiaryRead} />
        <Stack.Screen name="CreateDiary" component={CreateDiary}/>
      </Stack.Navigator>
  );
};

export default DiaryNavigation;
