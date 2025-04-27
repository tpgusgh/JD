import React from "react";
import styled from "styled-components/native";

export default function DeliveryTracking() {
    return (
        <Container>
            <TopSection>
                <Title>배달 중이에요</Title>
                <SubTitle>배달로봇이 배달중입니다</SubTitle>
                <TimeBadge>
                    <TimeText>남은시간 21분</TimeText>
                </TimeBadge>
                <ProgressBarContainer>
                    <ProgressBarBackground>
                        <ProgressBarFill />
                    </ProgressBarBackground>
                    <ProgressSteps>
                        <StepText>주문접수</StepText>
                        <StepText>배달시작</StepText>
                        <StepText>배달완료</StepText>
                    </ProgressSteps>
                </ProgressBarContainer>
            </TopSection>

            
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const TopSection = styled.View`
    padding: 20px;
    background-color: #ffffff;
`;

const Title = styled.Text`
    font-size: 22px;
    font-weight: bold;
`;

const SubTitle = styled.Text`
    margin-top: 5px;
    font-size: 14px;
    color: #666;
`;

const TimeBadge = styled.View`
    margin-top: 10px;
    background-color: #E0F7FA;
    padding: 5px 10px;
    border-radius: 10px;
    align-self: flex-start;
`;

const TimeText = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

const ProgressBarContainer = styled.View`
    margin-top: 20px;
`;

const ProgressBarBackground = styled.View`
    width: 100%;
    height: 6px;
    background-color: #eee;
    border-radius: 3px;
    overflow: hidden;
`;

const ProgressBarFill = styled.View`
    width: 50%;
    height: 100%;
    background-color: #00C853;
`;

const ProgressSteps = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
`;

const StepText = styled.Text`
    font-size: 12px;
    color: #666;
`;
