import styled from "styled-components";
import BigBox from "../components/BigBox.jsx";
import Coffe from "../assets/images/coffe.jsx"
export default function MainPage(){
    return(
        <Container>
            <ImageContainer><Coffe /></ImageContainer>
            <MainText>어디든 배달 가능한 AI카페</MainText>
            <LowContent>
                <BigBox text="주문하기" go="Order" />
                <BigBox text="조회하기" go=" " />
            </LowContent>
            
        </Container>
    )
}


const LowContent = styled.View`
    top: 60%;
    flex-direction: column;
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
    top: 5%;
    font-weight: bold;
`