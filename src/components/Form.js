import styled from "styled-components";

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
            background-color: ${props => props.marked ? "#d5d5d5" : "#ffffff"};
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
            background-color: ${props => props.marked ? "#0b56b7" : "#1877F2"};
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
        font-size: 20px;
    }

    @media (max-width: 800px) {
        padding: 40px 22px;

        form {
            input {
                height: 55px;
                font-size: 22px;
            }

            button {
                height: 55px;
                font-size: 22px;
            }
        }

        a {
            font-size: 17px;
        }
    }
`;

export default Form;
