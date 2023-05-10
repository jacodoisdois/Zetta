import * as SecureStore from 'expo-secure-store';
import { DiaryType } from '../../types/Diary/DiaryType';
import { retrieveData } from './General';

export const saveDiary = async (diary: DiaryType): Promise<void> => {
  try {
    const diaries: string | null = await retrieveData('diaries');
    const diariesArray: DiaryType[] = diaries ? JSON.parse(diaries) : [];

    const newDiariesArray = diariesArray.filter((diaryArray: DiaryType) => diaryArray.id !== diary.id);
    newDiariesArray.push(diary);

    const diaryString = JSON.stringify(newDiariesArray);
    await SecureStore.setItemAsync('diaries', diaryString);
  } catch (error) {
    console.log('Error saving diary:', error);
  }
};
