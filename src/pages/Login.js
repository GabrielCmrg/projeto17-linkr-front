import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

import { loginRequest } from "../services/api";

import Brand from "../components/Brand";
import Form from "../components/Form";

export default function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { setUserToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate();

    function createAlertMessage() {
        let alertMessage = 'Please, fill up the fields:'
        if (!email) {
            alertMessage += '\ne-mail';
        }
        if (!password) {
            alertMessage += '\npassword';
        }
        return alertMessage;
    }

    async function register(e) {
        e.preventDefault();
        setIsLoading(true);

        // alert if any field is missing and stop function
        if (!email || !password) {
            alert(createAlertMessage());
            setIsLoading(false);
            return;
        }
        
        const response = await loginRequest(email, password);
        if (response.status === 401) {
            alert(response.data);
            setIsLoading(false);
            return;
        }

        if (response.status === 200) {
            setIsLoading(false);
            setUserToken(response.data.token);
            navigate("/timeline");
            return;
        }

        if (response.status === 422) {
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
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>Log In</button>
                </form>
                <Link to="/sign-up">First time? Create an account!</Link>
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
