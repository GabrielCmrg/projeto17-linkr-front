import styled from "styled-components"


import Header from "../components/Header"
import PublicationForm  from "../components/PublicationForm.js";

export default function Timeline(){
    return(
        <TimelineContainer>
            <Header />
            <PublicationForm />
        </TimelineContainer>
    );
};

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
`