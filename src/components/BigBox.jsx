import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from 'expo-router';

export default function BigBox({ text, go }) {
  const navigation = useNavigation();

  return (
    <BoxContainer onPress={() => navigation.navigate(go)}>
      <BoxText>{text}</BoxText>
    </BoxContainer>
  );
}

const BoxContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 340px;
  height: 70px;
  elevation: 3;
  border-radius: 16px;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
`;

const BoxText = styled.Text`
  color: #000;
  font-size: 20px;
  text-align: center;
  font-family: "CustomFont";
  font-weight: bold;
`;
