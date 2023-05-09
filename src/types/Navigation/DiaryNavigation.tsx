import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};
