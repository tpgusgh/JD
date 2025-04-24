import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';
import { useNavigation } from 'expo-router';

const CustomSlider = React.memo(({ title, value, onFinalChange }) => {
  const [tempValue, setTempValue] = useState(value);

  return (
    <SliderBlock>
      <SliderTitle>{title}</SliderTitle>
      <LabelRow>
        <Label>적게</Label>
        <Label>중간</Label>
        <Label>많음</Label>
      </LabelRow>

      <ThumbTouchArea>
        <StyledSlider
          value={tempValue}
          onValueChange={(val) => setTempValue(val)}
          onSlidingComplete={onFinalChange}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#ccc"
        />
      </ThumbTouchArea>

      <SelectedValue>
        선택: {tempValue < 0.33 ? '적게' : tempValue < 0.66 ? '중간' : '많음'}
      </SelectedValue>
    </SliderBlock>
  );
});

export default function SugarScreen() {
  const [levels, setLevels] = useState([0.5, 0.5, 0.5, 0.5]);
  const titles = ['설탕량', '커피량', '얼음량', '우유량'];
  const navigation = useNavigation();

  const send = () => {
    alert("주문이 완료되었습니다");
    navigation.navigate("MainPage");
  }

  const updateLevel = useCallback((index, val) => {
    setLevels((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }, []);

  return (
    <Container>
      <BackArrow>{'‹'}</BackArrow>
      <CoffeeIcon>☕</CoffeeIcon>

      {levels.map((value, i) => (
        <CustomSlider
          key={i}
          title={titles[i]}
          value={value}
          onFinalChange={(val) => updateLevel(i, val)}
        />
      ))}


      <OrderButton onPress={send}>
        <OrderText>주문하기</OrderText>
      </OrderButton>
    </Container>
  );
}

// ===== Styled Components =====

const Container = styled.ScrollView`
  flex: 1;
  padding: 40px 20px;
  background-color: #fff;
`;

const BackArrow = styled.Text`
  font-size: 30px;
  color: #007aff;
  margin-bottom: 10px;
`;

const CoffeeIcon = styled.Text`
  font-size: 48px;
  text-align: center;
  margin: 20px 0;
`;

const SliderBlock = styled.View`
  margin: 25px 0;
`;

const SliderTitle = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LabelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5px;
`;

const Label = styled.Text`
  font-size: 13px;
`;

const ThumbTouchArea = styled.View`
  padding: 10px 0;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 50px;
`;

const SelectedValue = styled.Text`
  text-align: center;
  margin-top: 6px;
  color: #444;
`;

const OrderButton = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 3;
  margin-bottom: 100px;
`;

const OrderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
