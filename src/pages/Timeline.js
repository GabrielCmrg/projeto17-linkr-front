import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import PublicationForm  from "../components/PublicationForm.js";
import { getAllPostRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext.js";
import Publication from "../components/Publication.js";
import Trending from "../components/Trending";


export default function Timeline() {
    const [posts, setPosts] = React.useState(null);
    const { userToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate()
    
    const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
    };
    React.useEffect(() => {
        if(!userToken){
            navigate("/",{replace:true});
            return;
        };
        async function data(){
            const response = await getAllPostRequest(config);
            if(response.status === 200){
                setPosts([...response.data]);
            }else{
                alert("An error occured while trying to fetch the posts, please refresh the page")
            };
        };
        data()
    },[]);
    
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
                        userLiked={item.userliked}
                        likesAmount={item.likes_amount}
                        postId={item.id}
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
                    <Title>timeline</Title>
                    <PublicationForm />
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