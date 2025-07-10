import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from 'expo-router';

export default function MainPage() {
  return (
    <Container>
      <ImageContainer>
        <Coffe>☕</Coffe>
      </ImageContainer>

      <MainText>어디든 배달 가능한 AI카페</MainText>

      <LowContent>
        <BigBox text="주문하기" go="Order" />
        <BigBox text="조회하기" go="List" />
        <BigBox text="재고관리" go="StockPage" />
      </LowContent>
    </Container>
  );
}

function BigBox({ text, go }) {
  const navigation = useNavigation();

  return (
    <BoxContainer onPress={() => navigation.navigate(go)}>
      <BoxText>{text}</BoxText>
    </BoxContainer>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  position: relative;
`;

const ImageContainer = styled.View`
  align-items: center;
  margin-top: 80px;
`;

const Coffe = styled.Text`
  font-size: 80px;
`;

const MainText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const LowContent = styled.View`
  position: absolute;
  top: 60%;
  width: 100%;
  align-items: center;
  gap: 15px;
`;

const BoxContainer = styled.TouchableOpacity`
  width: 340px;
  height: 70px;
  background-color: #fff;
  border-radius: 16px;
  elevation: 3;
  align-items: center;
  justify-content: center;
`;

const BoxText = styled.Text`
  color: #000;
  font-size: 20px;
  font-family: "CustomFont";
  font-weight: bold;
  text-align: center;
`;
