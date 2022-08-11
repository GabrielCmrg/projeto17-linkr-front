import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { signupRequest } from "../services/api";

import Brand from "../components/Brand";
import Form from "../components/Form";

export default function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [picUrl, setPicUrl] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    function createAlertMessage() {
        let alertMessage = 'Please, fill up the fields:'
        if (!email) {
            alertMessage += '\ne-mail';
        }
        if (!password) {
            alertMessage += '\npassword';
        }
        if (!name) {
            alertMessage += '\nusername';
        }
        if (!picUrl) {
            alertMessage += '\npicture url';
        }
        return alertMessage;
    }

    async function register(e) {
        e.preventDefault();
        setIsLoading(true);

        // alert if any field is missing and stop function
        if (!email || !password || !name || !picUrl) {
            alert(createAlertMessage());
            setIsLoading(false);
            return;
        }
        
        const code = await signupRequest(email, name, password, picUrl);
        if (code === 409) {
            alert("This e-mail is already in use.");
            setIsLoading(false);
            return;
        }

        if (code === 201) {
            navigate("/");
            setIsLoading(false);
            return;
        }

        if (code === 422) {
            alert("One or more fields are filled incorrectly.");
            setIsLoading(false);
            return;
        }
    }

    return (
        <Container>
            <Brand />
            <Form>
                <form onSubmit={register}>
                    <input 
                        type="email"
                        placeholder="e-mail"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <input 
                        type="password"
                        placeholder="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&(){}[\]:;<>,.?/~_+-=|]).{8,32}$"
                        title="Passwords must have at least 8 characters, at most 32, have a lower case and a upper case letter and one of the following symbols: *!@$%^&(){}[\]:;<>,.?/~_+-=|"
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        placeholder="username"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={isLoading}
                    />
                    <input
                        type="url"
                        placeholder="picture url"
                        id="url"
                        value={picUrl}
                        onChange={e => setPicUrl(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>Sign Up</button>
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
