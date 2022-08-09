import styled from "styled-components";

export default function Signup() {
    return (
        <Container>
            <Brand>
                <div>
                    <h1>Linkr</h1>
                    <h2>save, share and discover the best links on the web</h2>
                </div>
            </Brand>
            <div>
                <form>
                    <input type="email" placeholder="e-mail" id="email" />
                    <input type="password" placeholder="password" id="password" />
                    <input type="text" placeholder="username" id="username" />
                    <input type="url" placeholder="picture url" id="url" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 700;

    h1 {
        font-size: 106px;
        font-family: 'Passion One', cursive;
    }

    h2 {
        font-size: 43px;
        font-family: 'Oswald', sans-serif;
        width: 442px;
    }
`