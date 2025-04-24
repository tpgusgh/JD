import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from 'expo-router';




export default function BigBox({text, go}){
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
  width: 340px;
  display: flex;
  height: 70px;
  gap: 10px;
  left: 6%;
  elevation: 3;
  border-radius: 16px;
  background-color: #fff;
`;


const BoxText = styled.Text`
  color: #000;
  font-size: 20px;
  left: 5px;
  width: 100px;
  font-family: "CustomFont";
  font-weight: bold;
`;
