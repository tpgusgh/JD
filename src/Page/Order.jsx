import styled from "styled-components/native";
import SmallBox from "../components/SmallBox.jsx";
import HalfArrow from "@/src/assets/images/HalfArrow";
import { useNavigation } from "expo-router";

export default function Order(){
    const navigation = useNavigation();
    return(
        <Container>
            <BackButton onPress={() => navigation.navigate('MainPage')}>
                    <HalfArrow />
            </BackButton>
            <MainText>선택해주세요</MainText>
            <LowContent>
                <SmallBox text="AI에게 추천받기" go="Suggest" />
                <SmallBox text="메뉴 고르기" go="SugarScreen" />
            </LowContent>
        </Container>
    )
}


const LowContent = styled.View`
    top: 40%;
    left: 9%;
    flex-direction: row;
    gap: 15px;
    position: absolute;
`;

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;


const ImageContainer = styled.View`
    align-items: center;
    left: 7%;
    top: 10%;
`

const MainText = styled.Text`
    text-align: center;
    font-size: 20px;
    top: 20%;
    font-weight: bold;
`
const BackButton = styled.TouchableOpacity`
    top: 3%;
    left: 9%;
    position: absolute;
`;