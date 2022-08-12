import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const hashtags = ["javascript","react", "react-native","material", "web-dev", "mobile", "css", "html", "node", "sql"];

export default function Trending(){
    let navigate = useNavigate();

    function redirectToRout(tagName){
        navigate(`/hashtag/${tagName}`);
    };
    return (
        <TrendingContainer>
            <Title>trending</Title>
            <div></div>
            <ul>{hashtags.map((tag,index)=><li key={index} onClick={()=>redirectToRout(tag)}> # {tag}</li>)}</ul>
        </TrendingContainer>
   );
};

const TrendingContainer = styled.div`
    margin-top: 202px;
    background-color: #171717;
    border-radius: 16px;
    width: 301px;
    
    div{
        height: 1px;
        width: 100%;
        background-color: #333333;
    };
    ul{
        padding: 22px 0 30px 16px;
    };
    li{
        display: table;
        font: 700 19px 'Lato', sans-serif;
        color: #FFFFFF;
        padding: 4px 0;
        cursor: pointer;
        
    };
`;
const Title = styled.h2`
    font: 700 27px 'Oswald', sans-serif;
    color: #FFFFFF;
    padding: 9px 0  12px 16px;
`
