import { StackNavigationProp } from '@react-navigation/stack';
import { DiaryType } from '../Diary/DiaryType';
import { RootStackParamList } from './General';
import { RouteProp } from '@react-navigation/native';

export type DiariesScreenParams = {
  diaries: DiaryType[];
};

export type CreateDiaryProps = {
  navigation: CreateDiaryScreenNavigationProps;
};

export type DiariesProps = {
  navigation: DiariesScreenNavigationProps;
};


export type DiariesScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Diaries'>;
export type CreateDiaryScreenNavigationProps = StackNavigationProp<RootStackParamList, 'CreateDiary'>;
