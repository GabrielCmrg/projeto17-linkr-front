import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import { getTrendingTags } from "../services/api.js";

export default function Trending(){
    const [tags, setTags] = React.useState([]);

    let navigate = useNavigate();

    function redirectToRout(tagName){
        const name = tagName.replace("#","");
        navigate(`/hashtag/${name}`);
        
    };

    React.useEffect(() => {
        async function data(){
            const response = await getTrendingTags();
            
            if(response.status === 200){
                setTags([...response.data]);
               
            }else{

                alert("An error occured while trying to fetch the hashtags, please refresh the page")
            };
        };
        data()
    },[]);

    return (
        <TrendingContainer>
            <Title>trending</Title>
            <div></div>
            <ul>{tags.map((tag,index)=><li key={index} onClick={()=>redirectToRout(tag.name)}> {tag.name}</li>)}</ul>
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
    @media(max-width: 960px){
        display: none;
    }
`;
const Title = styled.h2`
    font: 700 27px 'Oswald', sans-serif;
    color: #FFFFFF;
    padding: 9px 0  12px 16px;
`
