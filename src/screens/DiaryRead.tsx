import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DiaryType } from '../types/Diary/DiaryType';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteDiaryById } from '../libs/SecureStore/Diary';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, styles.defaultFont]}>Diary - {diary.workoutName}</Text>
      <View style={styles.exercisesContainer}>
        <Text style={[styles.exercisesText, styles.defaultFont]}>Exercises & Weight/Duration:</Text>
        {diary.exercises.map((exercise, count) => (
          <Text style={[styles.defaultFont]}key={count}>{`${exercise.exercise} - ${exercise.value} ${exercise.unit}  `}</Text>
        ))}
      </View>
    </ScrollView>
      <View style={styles.actionsContainer}>
      <DefaultScreenButton buttonName="Delete" onPress={handleDeleteDiary} color="#e74c3c" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    alignSelf: 'center'
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
    alignSelf: 'center'
  },
  defaultFont:{
    color: '#fafafa'
  }
});
