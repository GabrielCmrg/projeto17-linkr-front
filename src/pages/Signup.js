import { Link } from "react-router-dom";
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
            <Form>
                <form>
                    <input type="email" placeholder="e-mail" id="email" />
                    <input type="password" placeholder="password" id="password" />
                    <input type="text" placeholder="username" id="username" />
                    <input type="url" placeholder="picture url" id="url" />
                    <button type="submit">Sign Up</button>
                </form>
                <Link to="/">Switch back to log in</Link>
            </Form>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const Brand = styled.div`
    background-color: #151515;
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 700;
    flex-shrink: 0;

    h1 {
        font-size: 106px;
        font-family: 'Passion One', cursive;
    }

    h2 {
        font-size: 43px;
        font-family: 'Oswald', sans-serif;
        width: 442px;
    }

    @media (max-width: 800px) {
        width: 100%;
        height: initial;
        padding: 27px;

        h1 {
            font-size: 76px;
        }

        h2 {
            font-size: 23px;
            width: 237px;
        }
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 54px;

    form {
        width: 100%;

        input {
            width: 100%;
            height: 65px;
            border-radius: 6px;
            border: none;
            background-color: white;
            color: black;
            font-size: 27px;
            font-family: 'Oswald', sans-serif;
            margin-bottom: 13px;
            padding: 17px;

            ::placeholder {
                color: #9F9F9F;
                opacity: 1;
            }
        }

        button {
            width: 100%;
            height: 65px;
            border-radius: 6px;
            border: none;
            background-color: #1877F2;
            color: white;
            font-size: 27px;
            font-family: 'Oswald', sans-serif;
            margin-bottom: 14px;

            :hover {
                filter: brightness(1.2);
                cursor: pointer;
            }
        }
    }

    a {
        font-family: 'Lato', sans-serif;
        color: white;
    }
`;
