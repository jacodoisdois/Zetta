import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DiaryType } from '../types/Diary/DiaryType';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteDiaryById } from '../libs/SecureStore/Diary';

type DiaryReadRouteParams = {
  diary?: DiaryType;
};

export default function DiaryRead() {
  const route = useRoute();
  const { diary }: DiaryReadRouteParams = route.params as DiaryReadRouteParams;
  const navigator = useNavigation();

  const handleDeleteDiary = async () => {
    await deleteDiaryById(diary?.id || '');
    navigator.navigate('Diaries' as never);
  };

  if (!diary) {
    return (
      <View style={styles.container}>
        <Text>No diary data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diary - {diary.workoutName}</Text>
      <View style={styles.exercisesContainer}>
        <Text style={styles.exercisesText}>Exercises:</Text>
        {diary.exercises.map((exercise, count) => (
          <Text key={count}>{`${exercise.exercise} - ${exercise.value} ${exercise.unit}  `}</Text>
        ))}
      </View>
    </ScrollView>
      <View style={styles.actionsContainer}>
      <DefaultScreenButton buttonName="Delete" onPress={handleDeleteDiary} color="#f83e3e" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
  exercisesContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },
  exercisesText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  timestamp: {
    fontStyle: 'italic',
    marginLeft: 20,
    fontSize: 12,
    alignSelf: 'flex-start'
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  }
});
