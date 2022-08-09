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
    width: 100vw;
    margin: auto;
`