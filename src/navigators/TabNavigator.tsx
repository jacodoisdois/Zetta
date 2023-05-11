import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, FontAwesome, AntDesign, Ionicons, Octicons } from '@expo/vector-icons';

import WorkoutNavigation from './WorkoutNavigation';
import CurrentWorkout from '../screens/CreateDiary';
const Tab = createBottomTabNavigator();
import TabBarIconWrapper from '../components/TabBarIconWrapper/TabBarIconWrapper';
import DiaryNavigation from './DiaryNavigation';

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#62c0ff',
      shadowOpacity: 0,
      elevation: 0,
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <Octicons
        name="zap"
        size={30}
        color="white"
        style={{ marginLeft: 20 }}
      />
    ),
    tabBarStyle: {
      backgroundColor: '#62c0ff',
      borderWidth: 0,
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarLabelStyle: {},
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: '#a6dcf0',
  }}
>
        <Tab.Screen name="DiaryStack" component={DiaryNavigation} options={
          {
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="calendar" size={size} color={color} />
            ),
            tabBarLabel: 'Diaries',
            title: 'Diaries',
          }
        } />
        <Tab.Screen name="CurrentWorkout"
        component={CurrentWorkout}
        options={
          {
            tabBarIcon: ({ color, size }) => (
              <TabBarIconWrapper>
                <AntDesign name="pluscircleo" size={size} color={color} />
              </TabBarIconWrapper>
            ),
            tabBarLabel: 'Add',
            title: 'Today Workout',
          }
        }
        />
        <Tab.Screen name="WorkoutStack" component={WorkoutNavigation}
        options={
          {
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="dumbbell" size={size} color={color} />
            ),
            tabBarLabel: 'Workouts',
            title: 'Workouts',
          }
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
