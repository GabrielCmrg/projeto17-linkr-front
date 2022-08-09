import styled from "styled-components";
import {FiChevronDown} from "react-icons/fi"
export default function Header(){
    return ( 
        <HeaderContainer>
            <h1>linkr</h1>
            <div>
                <FiChevronDown color={"#FFFFFF"} size={"30"}></FiChevronDown>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg" alt="" />
            </div>
            
        </HeaderContainer>
    );    
};
const HeaderContainer = styled.div`
    position: fixed;
    top:0;
    z-index: 1;
    background-color: #151515;
    padding: 0 20px;
    width:100%;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        font: 700 49px 'Oswald', sans-serif;
        color: #FFFFFF;
    };
    div{
       display: flex;
       align-items: center;
       justify-content: center;
       gap: 10px;

        
       img{
        height: 53px;
        width: 53px;
        border-radius: 50%;
    };
    };
    
`;
 