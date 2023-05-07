import { StackNavigationProp } from '@react-navigation/stack';
import { workoutType } from '../Workout/WorkoutType';

type WorkoutReadScreenParams = {
  workout: workoutType;
  callBack: () => void;
};

type RootStackParamList = {
  Home: undefined;
  WorkoutRead: WorkoutReadScreenParams;
  // Add more screen definitions here
};

export type WorkoutReadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutRead'>;
