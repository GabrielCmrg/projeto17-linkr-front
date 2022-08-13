import styled from "styled-components";
import React from "react";
import { useParams } from 'react-router-dom';

import Header from "../components/Header";
import { getTagPostsRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext.js";
import Publication from "../components/Publication.js";
import Trending from "../components/Trending";

export default function Hashtag() {
    const [posts, setPosts] = React.useState(null);
    const { userToken } = React.useContext(ApplicationContext);

    const { hashtag } = useParams()
    
    const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
    };

    React.useEffect(() => {
        async function data(){
            const response = getTagPostsRequest(hashtag, config);
            response.then( res => {
                if (res.status === 404) {
                } else {
                    setPosts([...res.data.tagPosts]);
                }
            });
            response.catch( err => {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            });
        };
        data()
    },[hashtag]);
    
    function checkForPosts (){
        if(posts === null){
            return(
                <TextContainer>
                    <h2>Loading...</h2>
                </TextContainer>
            );
        }else if(posts.length === 0){
            return (
                <TextContainer>
                    <h2>There are no posts yet</h2>
                </TextContainer>
            );
        }else{
            return(
                posts.map(item=>(
                    <Publication  
                        key={item.id}
                        userImage={item.pic_url}
                        userName={item.name}
                        postTitle={item.content}
                        postLink={item.link_url}
                        LinkName={item.link_title}
                        LinkSummary={item.link_description}
                        LinkImg={item.link_image}
                    />))
            );
        };
    };
    const renderPosts = checkForPosts();
    return (
        <TimelineContainer>
            <Header />
            <Container>
                <div>
                    <Title># {hashtag}</Title>
                    {renderPosts}
                </div>
                <div>
                    <Trending /> 
                </div>
            </Container>
        </TimelineContainer>
    );
};

const TimelineContainer = styled.div`
    max-width: 100vw;
    margin: auto;

    > h1 {
        margin-top: 100px;
        font: 700 42px 'Oswald', sans-serif;
        color: #FFFFFF;
        width: 100vw;
        text-align: center;
    }
    
`;
const Container = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    gap: 25px;
    @media(max-width:960px){
        gap:0;
    };
`;
const Title = styled.h1`
    margin-top: 100px;
    font: 700 42px 'Oswald', sans-serif;
    color: #FFFFFF;
    display: flex;
    align-items: center;

    img {
        height: 53px;
        width: 53px;
        margin-right: 5%;
        border-radius: 50%;
    }
    @media(max-width: 414px){
        font-size: 33px;
        margin-left: 20px;
    }
`;
const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    h2{
        font: 400 20px 'Oswald', sans-serif;
        color: #FFFFFF;
    }
`