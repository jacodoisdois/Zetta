import { DIaryItemParams, DiariesScreenParams } from "./DiaryNavigation";
import { WorkoutReadScreenParams } from "./WorkoutNavigation";

export type RootStackParamList = {
  Home: undefined;
  WorkoutRead: WorkoutReadScreenParams;
  Workouts: undefined;
  Diaries: DiariesScreenParams;
  DiaryRead: DIaryItemParams;
  CreateDiary: undefined;
};
