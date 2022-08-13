import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi"
import React from "react";

import ApplicationContext from "../contexts/ApplicationContext";

export default function Header(){
    const { userImage } = React.useContext(ApplicationContext);
    return ( 
        <HeaderContainer>
            <h1>linkr</h1>
            <div>
                <FiChevronDown color={"#FFFFFF"} size={"30"} />
                <img src={userImage} alt="User"/>
            </div>
            
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
    div{
       display: flex;
       align-items: center;
       justify-content: center;
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
    };
    
`;
 