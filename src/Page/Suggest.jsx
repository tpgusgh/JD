import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useNavigation } from 'expo-router';
export default function Suggest() {
  const [step, setStep] = useState("input"); 
  const [inputText, setInputText] = useState("");
  const [responseData, setResponseData] = useState(null);
  const navigation = useNavigation();
  const levelToSliderValue = (level) => {
  switch (level?.toLowerCase()) {
    case "none":
      return 0.0;
    case "None":
      return 0.0;
    case " None ":
      return 0.0;
    case " none ":
      return 0.0;
    case "low":
      return 0.25;
    case " low ":
      return 0.25;
    case "Low":
      return 0.25;
    case " Low ":
      return 0.25;
    case "medium":
      return 0.5;
    case " medium ":
      return 0.5;
    case "Medium":
      return 0.5;
    case " Medium ":
      return 0.5;
    case "high":
      return 1.0;
    case " high ":
      return 1.0;
    case "High":
      return 1.0;
    case " High ":
      return 1.0;
    default:
      return 0.5; 
  }
};
  const convertLevel = (level) => {
    switch (level) {
      case "none": return "없음";
      case " none ": return "없음";
      case "None ": return "없음";
      case "None": return "없음";
      case " None ": return "없음";
      case "low": return "적음";
      case " low ": return "적음";
      case "Low": return "적음";
      case " Low ": return "적음";
      case "medium": return "중간";
      case " medium ": return "중간";
      case " Medium ": return "중간";
      case "Medium": return "중간";
      case "high": return "많음";
      case "High": return "많음";
      case " high ": return "많음";
      default: return level;
    }
  };

   const handleOrder = () => {
    const levels = [
      levelToSliderValue(responseData?.water),
      levelToSliderValue(responseData?.coffee_powder),
      levelToSliderValue(responseData?.iced_tea_powder),
      levelToSliderValue(responseData?.green_tea),
      levelToSliderValue(responseData?.sugar),
    ];


    navigation.navigate("SugarScreen", { levels });
  };
  const handleSubmit = async () => {
    setStep("loading");

    try {
      const res = await fetch("http://10.129.57.133:8080/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });
      
      const data = await res.json();
      console.log(data);
      setResponseData(data);
      setStep("result");
    } catch (error) {
      console.error("에러 발생:", error);
      setResponseData({
        text: "서버와의 연결에 실패했어요. 다시 시도해주세요.",
      });
      setStep("result");
    }
  };

  const renderInput = () => (
    <Container>
      <MainText>기분을 입력해주세요</MainText>
      <InputContainer>
        <StyledInput
          placeholder="예: 기분이 처지고 피곤해요"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>제출</SubmitButtonText>
        </SubmitButton>
      </InputContainer>
    </Container>
  );

  const renderLoading = () => (
    <Container>
      <MainText>추천을 생성 중이에요...</MainText>
      <LoadingSpinner />
    </Container>
  );

  const renderResult = () => (
    <Container>
      <MainText>이렇게 주문할까요?</MainText>
      <ResultBox>
        {responseData?.title && <ResultText>제목:{responseData.title}</ResultText>}
        {responseData?.text && <ResultText>{responseData.text}</ResultText>}

        {responseData?.water && (
          <>
            <Label>물: {convertLevel(responseData.water)}</Label>
            {responseData?.coffee_powder && convertLevel(responseData.coffee_powder) !== "없음" && (
              <Label>커피 가루: {convertLevel(responseData.coffee_powder)}</Label>
            )}

            {responseData?.iced_tea_powder && convertLevel(responseData.iced_tea_powder) !== "없음" && (
              <Label>아이스티 가루: {convertLevel(responseData.iced_tea_powder)}</Label>
            )}

            {responseData?.green_tea && convertLevel(responseData.green_tea) !== "없음" && (
              <Label>녹차 가루: {convertLevel(responseData.green_tea)}</Label>
            )}

            {responseData?.sugar && convertLevel(responseData.sugar) !== "없음" && (
              <Label>설탕: {convertLevel(responseData.sugar)}</Label>
            )}
          </>
        )}
      </ResultBox>
      <>
      <SubmitButton onPress={handleOrder}>
        <SubmitButtonText>주문</SubmitButtonText>
      </SubmitButton>
      <SubmitButton onPress={() => setStep("input")}>
        <SubmitButtonText>다시 하기</SubmitButtonText>
      </SubmitButton>
      </>
      
    </Container>
  );

  if (step === "loading") return renderLoading();
  if (step === "result") return renderResult();
  return renderInput();
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding: 20px;
`;

const MainText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const InputContainer = styled.View`
  margin-top: 10px;
`;

const StyledInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  background-color: #f9f9f9;
  height: 120px;
  text-align-vertical: top;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #007aff;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const ResultBox = styled.View`
  background-color: #f2f2f2;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const ResultText = styled.Text`
  font-size: 16px;
  margin-bottom: 12px;
`;

const Label = styled.Text`
  font-size: 15px;
  margin-bottom: 6px;
`;

const LoadingSpinner = styled.ActivityIndicator.attrs(() => ({
  size: "large",
  color: "#007aff",
}))``;
