import React from "react";
import { BaseToast, BaseToastProps } from "react-native-toast-message";

export interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
  type?: 'error' | 'success' | 'normal'
}


export const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, type }) => {
  const lines = text2 ? text2.split('\n').length : 0;
  const minHeight = 50 + 7 * lines;
  const marginTop = 2.5 * lines;
  let borderColor;

  if(type === "success"){
    borderColor = '#3ef74e'
  } else if(type === 'error'){
    borderColor = '#fa4747'
  } else {
    borderColor = '#17d4f5'
  }

  return (
    <BaseToast
      style={{ borderLeftColor: borderColor, minHeight, borderRadius: 8, backgroundColor: '#fafafa', padding: 10, marginTop }}
      text1Style={{ fontWeight: 'bold', color: '#444444' }}
      text2Style={{ color: '#444444' }}
      text1={text1}
      text2={text2}
      text2NumberOfLines={6}
    />
  );
};
