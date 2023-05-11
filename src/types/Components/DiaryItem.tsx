import { DiaryType } from "../Diary/DiaryType";

export type DiaryItemProps = {
  diary: DiaryType;
  onPress: () => void;
  onDelete: () => Promise<void>;
};
