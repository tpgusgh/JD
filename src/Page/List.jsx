import { useNavigation } from "expo-router";
import React from "react";
import styled from "styled-components/native";

export default function List() {
    const navigation = useNavigation();
    const comeoncomeon = () => {
        navigation.navigate("DeliveryTracking")
    }
    return (

            <Container>
                <Compen>
                    <TopText>주문번호를 입력해주세요</TopText>
                    <IwantInput placeholder="주문번호 입력" />
                    <IwantButton onPress={comeoncomeon}>
                        <IwantText>조회하기</IwantText>
                    </IwantButton>
                </Compen>
            </Container>

    );
}

const Container = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
`;

const Compen = styled.View`
    width: 70%;
    background-color: white;
    padding: 30px 20px;
    border-radius: 20px;
    align-items: center;
    gap: 20px;
`;

const TopText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const IwantInput = styled.TextInput`
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 10px;
    border-width: 1px;
    border-color: black;
    border-radius: 10px;
`;

const IwantButton = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: black;
    border-radius: 10px;
    padding: 12px 20px;
    width: 100%;
    align-items: center;
`;

const IwantText = styled.Text`
    font-size: 18px;
    color: white;
    font-weight: bold;
`;
