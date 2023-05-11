export type ExercisesWeightType = {
  exercise: string;
  value: number;
  unit: string;
};

export type DiaryType = {
  id: string;
  createdAt: Date;
  diaryDate: string;
  workoutId: string;
  workoutName: string;
  exercises: ExercisesWeightType[];
};
