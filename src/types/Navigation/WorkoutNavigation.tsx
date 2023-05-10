import { StackNavigationProp } from '@react-navigation/stack';
import { workoutType } from '../Workout/WorkoutType';
import { RootStackParamList } from './General';

export type WorkoutsProps = {
  navigation: WorkoutsScreenNavigationProp;
};


export type WorkoutReadScreenParams = {
  workout: workoutType;
};

export type WorkoutItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutRead'>;

type WorkoutsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Workouts'>;

