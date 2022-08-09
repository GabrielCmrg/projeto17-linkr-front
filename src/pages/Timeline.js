import styled from "styled-components"
import Header from "../componets/Header"
export default function Timeline(){
    return(
        <TimelineContainer>
            <Header ></Header>
        </TimelineContainer>
    );
};

const TimelineContainer = styled.div`
    width: 100vw;
    height: 100vh;
`