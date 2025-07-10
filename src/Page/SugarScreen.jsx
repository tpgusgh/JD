import init from '@taoqf/react-native-mqtt';
import React, { useState, useCallback,useEffect } from 'react';
import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';
import { useNavigation } from 'expo-router';
import { useRoute } from "@react-navigation/native";
const mqtt = init;

const CustomSlider = React.memo(({ title, value, onFinalChange }) => {
  const [tempValue, setTempValue] = useState(value);

  return (
    <SliderBlock>
      <SliderTitle>{title}</SliderTitle>
      <LabelRow>
        <Label>없음</Label>
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
        선택: {tempValue <= 0.01 ? '없음' : tempValue <= 0.49 ? "적음" : tempValue <= 0.75 ? '중간' : '많음'}
      </SelectedValue>
    </SliderBlock>
  );
});

export default function SugarScreen() {
  const route = useRoute();
  const initialLevels = route.params?.levels || [0.5, 0.5, 0.5, 0.5, 0.5];
  const [levels, setLevels] = useState(initialLevels);
  
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const clientId = `emqx_react_${Math.random().toString(16).substring(2, 8)}`;
  const username = "bssm_free";
  const password = "bssm_free"; 
  const [client, setClient] = useState(null);

  useEffect(() => {
  const mqttClient = mqtt.connect("ws://10.150.2.255:9001", {
    clientId,
    username,
    password,
  });

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
  });

  mqttClient.on('error', (err) => {
    console.log('Connection error: ', err);
    mqttClient.end();
  });

  setClient(mqttClient);

  return () => {
    mqttClient.end();
  };
}, []);


  const send = () => {
  if (client && client.connected) {
    const payload = JSON.stringify({
      water: levels[0],
      coffee: levels[1],
      ice_tea: levels[2],
      green_tea: levels[3],
      sugar: levels[4],
      room: selectedRoom,
    });

    client.publish('bssm/wodnr', payload, 0, (error) => {
      if (error) {
        console.log('Publish error: ', error);
      } else {
        alert('주문이 완료되었습니다!');
        navigation.navigate('MainPage');
      }
    });
  } else {
    alert('MQTT 서버에 연결되지 않았습니다.');
  }
};


  const updateLevel = useCallback((index, val) => {
    setLevels((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }, []);
  const titles = ['물량', '커피가루량', '아이스티가루량', '녹차가루량', '설탕량'];
  return (
    <Container>
      <BackArrow>{'‹'}</BackArrow>
      <CoffeeIcon>☕</CoffeeIcon>

      {titles.map((title, i) => (
        <CustomSlider
          key={i}
          title={title}
          value={levels[i]}
          onFinalChange={(val) => updateLevel(i, val)}
        />
      ))}


<MidContainer>
  <MidText>배달 장소</MidText>
  <AccordionContainer>
  <AccordionHeader onPress={() => setIsExpanded(!isExpanded)}>
    <AccordionTitle>
      {selectedRoom ? `선택됨: ${selectedRoom}` : '예약 가능한 공간'}
    </AccordionTitle>
  </AccordionHeader>

  {isExpanded && (
    <AccordionContent>
      {['교실', '강당', '회의실'].map((room) => (
        <AccordionItem
          key={room}
          onPress={() => {
            setSelectedRoom(room);
            setIsExpanded(false); 
          }}
          isSelected={selectedRoom === room}
        >
          <ItemText isSelected={selectedRoom === room}>{room}</ItemText>
        </AccordionItem>
      ))}
    </AccordionContent>
  )}
</AccordionContainer>


</MidContainer>
      <OrderButton onPress={send}>
        <OrderText>주문하기</OrderText>
      </OrderButton>
    </Container>
  );
}



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
  margin-bottom: 100px;
`;


const OrderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const AccordionContainer = styled.View`
  margin-top: 30px;
`;

const AccordionHeader = styled.TouchableOpacity`
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 10px;
`;

const AccordionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const AccordionContent = styled.View`
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
`;

const AccordionItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  background-color: ${({ isSelected }) => (isSelected ? '#dfefff' : '#fff')};
  border-radius: 8px;
`;

const ItemText = styled.Text`
  color: ${({ isSelected }) => (isSelected ? '#007aff' : '#333')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
`;

const MidContainer = styled.View`
  align-items: center;
`

const MidText = styled.Text`
  text-align: center;
  font-weight: bold;
`