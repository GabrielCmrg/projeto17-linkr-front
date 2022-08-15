import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import React from "react";
import { useNavigate } from "react-router-dom";

import ApplicationContext from "../contexts/ApplicationContext";

export default function Header(){
    const { userImage, setUserToken, setUserImage } = React.useContext(ApplicationContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    function logout(e) {
        e.stopPropagation();
        setIsMenuOpen(false);
        setUserToken(null);
        setUserImage(null);
        localStorage.clear();
        navigate("/");
    }

    return ( 
        <HeaderContainer>
            <h1>linkr</h1>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ?
                <FiChevronUp color={"#FFFFFF"} size={"30"} /> :
                <FiChevronDown color={"#FFFFFF"} size={"30"} />}
                <img src={userImage} alt="User"/>
            </MenuButton>
            {isMenuOpen ?
            <Menu onClick={() => setIsMenuOpen(false)}>
                <div>
                    <p onClick={logout}>Logout</p>
                </div>
            </Menu> :
            <></>}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    position: fixed;
    top:0;
    z-index: 1;
    background-color: #151515;
    padding: 20px;
    width:100%;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        font: 700 49px 'Oswald', sans-serif;
        color: #FFFFFF;
        @media(max-width: 414px){
        font-size: 45px;
        };
    };
`;
 
const MenuButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img{
        height: 53px;
        width: 53px;
        border-radius: 50%;
        object-fit: cover;

        @media(max-width: 414px){
            height: 44px;
            width: 44px;
            border-radius: 50%;
            object-fit: cover;
        };  
    };
`;

const Menu = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 1;

    div {
        position: fixed;
        top: 72px;
        right: 0;
        width: 110px;
        font-family: 'Lato', sans-serif;
        height: 48px;
        background-color: #151515;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-radius: 0 0 0 20px;
        color: white;

        p {
            cursor: pointer;
        }
    }
`;
