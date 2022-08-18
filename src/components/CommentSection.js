import styled from "styled-components";
import React from "react";

import ApplicationContext from "../contexts/ApplicationContext";

export default function CommentSection() {
    const { userImage, userToken } = React.useContext(ApplicationContext);

    return (
        <Background>
            <Avatar src={userImage} alt="User" />
        </Background>
    );
};

const Background = styled.div`
    background-color: #1E1E1E;
    border-radius: 0 0 16px 16px;
    padding: 10px 20px;
`;

const Avatar = styled.img`
    height: 39px;
    width: 39px;
    border-radius: 50%;
    object-fit: cover;
`;
