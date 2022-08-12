import styled from "styled-components";

const hashtags = ["javascript","react", "react-native","material", "web-dev", "mobile", "css", "html", "node", "sql"];

export default function Trending(){
    return (
        <TrendingContainer>
            <Title>trending</Title>
            <div></div>
            <ul>{hashtags.map((item,index)=><li key={index}> # {item}</li>)}</ul>
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
        font: 700 19px 'Lato', sans-serif;
        color: #FFFFFF;
        padding: 4px 0;
    };
`;
const Title = styled.h2`
    font: 700 27px 'Oswald', sans-serif;
    color: #FFFFFF;
    padding: 9px 0  12px 16px;
`
