import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Publication({ userId, userImage, userName, setSearch}) {
    const navigate = useNavigate();

    function redirect () {
        navigate(`/user/${userId}`);
        setSearch("")
    }

    return (
        <Container onClick={redirect}>
            <img src={userImage} alt="user pic" />
            <h1>{userName}</h1>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%; 
    height: auto;
    margin: 10px 0;
    cursor: pointer;
    > img {
        height: 41px;
        width: 41px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 10px;
    }
    > h1 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;


        color: #515151;
    }
`;