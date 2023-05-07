import { StackNavigationProp } from '@react-navigation/stack';
import { workoutType } from '../Workout/WorkoutType';

type WorkoutReadScreenParams = {
  workout: workoutType;
  callBack?: () => void;
};

export type RootStackParamList = {
  Home: undefined;
  WorkoutRead: WorkoutReadScreenParams;
  Workouts: undefined;
  // Add more screen definitions here
};

export type WorkoutReadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutRead'>;
