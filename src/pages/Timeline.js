import styled from "styled-components";

import Header from "../components/Header";
import PublicationForm from "../components/PublicationForm.js";
import Publication from "../components/Publication.js";

export default function Timeline() {
    return (
        <TimelineContainer>
            <Header />
            <PublicationForm />
            <Publication
                userImage="https://pbs.twimg.com/media/FKwA9bBacAIJluC.jpg"
                userName="Tessia Eralith"
                postTitle="isso repetiu tantas vezes???"
                postLink="https://www.youtube.com/watch?v=YXGFUAy97Lk"
                LinkName="Quadra Elementar | Arthur Leywin Pt. ll (The Beginning After the End) | Kaito"
                LinkSummary="Espero que tenham curtido! :)Redes SociaisSpotify:"
                LinkImg="https://i.ytimg.com/vi/YXGFUAy97Lk/maxresdefault.jpg"
                userauthorship={false} />

            <Publication
                userImage="https://pbs.twimg.com/media/FNVoSCJXsAUn1_i.jpg"
                userName="Arthur Leywin"
                postTitle="Não sei mas to gostando!!"
                postLink="https://www.youtube.com/watch?v=YXGFUAy97Lk"
                LinkName="Quadra Elementar | Arthur Leywin Pt. ll (The Beginning After the End) | Kaito"
                LinkSummary="Espero que tenham curtido! :)Redes SociaisSpotify:"
                LinkImg="https://i.ytimg.com/vi/YXGFUAy97Lk/maxresdefault.jpg"
                userauthorship={true} />
        </TimelineContainer>
    );
};

const TimelineContainer = styled.div`
    width: 100vw;
    margin: auto;
`;
