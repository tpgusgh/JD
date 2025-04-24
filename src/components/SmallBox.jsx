import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from 'expo-router';




export default function SmallBox({text , go}){
  const navigation = useNavigation();
 
  return (
    <BoxContainer onPress={() => navigation.navigate(go)}>

      <BoxText>{text}</BoxText>
    </BoxContainer>
  );
};

const BoxContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 128px;
  gap: 10px;
  elevation: 5;
  border-radius: 16px;
  background-color: #fff;
`;

const BoxImage = styled.View`
  width: 53px;
  height: 53px;
  align-items: center;
  top: -19px;
`;

const BoxText = styled.Text`
  color: #000;
  font-size: 18px;
  left: 5px;
  width: 100px;
  font-family: "CustomFont";
  text-align: center;
  font-weight: bold;
  align-items: center;
`;
