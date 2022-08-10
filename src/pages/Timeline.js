import styled from "styled-components"

import Header from "../componets/Header"
import PublicationForm from "../componets/PublicationForm.js";
import Publication from "../componets/Publication.js";

export default function Timeline() {
    return (
        <TimelineContainer>
            <Header ></Header>
            <PublicationForm></PublicationForm>

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