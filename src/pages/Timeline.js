import styled from "styled-components";

import Header from "../components/Header";
import Publication from "../components/Publication";
import PublicationForm  from "../components/PublicationForm.js";

export default function Timeline() {
    return (
        <TimelineContainer>
            <Header />
            <PublicationForm />
            <Publication userName='Júlio' userauthorship={true}/>
        </TimelineContainer>
    );
};

const TimelineContainer = styled.div`
    width: 100vw;
    margin: auto;
`;
