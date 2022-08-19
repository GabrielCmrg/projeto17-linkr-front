import styled from "styled-components";
import React from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

import ApplicationContext from "../contexts/ApplicationContext";

export default function CommentSection() {
    const { userImage } = React.useContext(ApplicationContext);

    return (
        <Background>
            <CommentBox>
                <Avatar src={userImage} alt="User" />
                <Input placeholder="write a comment..." />
                <IoPaperPlaneOutline size={16} color="white"/>
            </CommentBox>
        </Background>
    );
};

const Background = styled.div`
    background-color: #1E1E1E;
    border-radius: 0 0 16px 16px;
    padding: 10px 20px;
`;

const CommentBox = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 15px;
    position: relative;

    svg {
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
`;

const Avatar = styled.img`
    height: 39px;
    width: 39px;
    border-radius: 50%;
    object-fit: cover;
`;

const Input = styled.input`
    width: 100%;
    height: 39px;
    background-color: #252525;
    border-radius: 8px;
    border: none;
    padding: 10px 15px;
    color: white;

    ::placeholder {
        font-family: 'Lato', sans-serif;
        font-style: italic;
        font-size: 14px;
        color: #575757;
    }
`;
