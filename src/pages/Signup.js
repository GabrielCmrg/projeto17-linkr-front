import styled from "styled-components";

export default function Signup() {
    return (
        <Container>
            <Brand />
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`

const Brand = styled.div`
    background-color: #151515;
    height: 100%;
    width: 60%;
`