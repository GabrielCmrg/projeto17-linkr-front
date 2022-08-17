import styled from "styled-components";
import React from "react";
import { useParams } from 'react-router-dom';

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { getUserPostsRequest, followUserRequest, unfollowUserRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext.js";
import Publication from "../components/Publication.js";
import Trending from "../components/Trending";

export default function UserPosts() {
    const [posts, setPosts] = React.useState(null);
    const [ notFound, setNotFound ] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [userPic, setUserPic] = React.useState("");
    const [followStatus, setFollowStatus] = React.useState(false);
    const [isOwner, setIsOwner] = React.useState(true);
    const { userToken } = React.useContext(ApplicationContext);
    const [loading, setLoading] = React.useState(false);

    const { id } = useParams()
    
    const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
    };
    React.useEffect(() => {
        setNotFound(false)
        async function data(){
            const response = getUserPostsRequest(id, config);
            response.then( res => {
                if (res.status === 404) {
                    setNotFound(true)
                } else {
                    setUsername(res.data.userName);
                    setIsOwner(res.data.accountOwner);
                    setFollowStatus(res.data.followStatus);
                    setUserPic(res.data.userPicUrl);
                    setPosts([...res.data.userPosts]);
                }
            });
            response.catch( err => {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            });
        };
        data()
    },[id]);
    
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
                        postId={item.id}
                        userImage={item.pic_url}
                        userName={item.name}
                        authorId={item.author_id}
                        postTitle={item.content}
                        postLink={item.link_url}
                        LinkName={item.link_title}
                        LinkSummary={item.link_description}
                        LinkImg={item.link_image}
                        userauthorship={item.userauthorship}
                    />))
            );
        };
    };
    const renderPosts = checkForPosts();

    function displayFollowButton () {
        if (isOwner) {
            return null
        } else if (followStatus) {
            return (
                <FollowButton color='#1877F2' background='#FFFFFF' onClick={changeFollowStatus} disabled={loading}>
                    Unfollow
                </FollowButton>
            )
        } else {
            return (
                <FollowButton color='#FFFFFF' background='#1877F2' onClick={changeFollowStatus} disabled={loading}>
                    Follow
                </FollowButton>
            )
        }
    }
    const renderButton = displayFollowButton ()

    function changeFollowStatus () {
        setLoading(true)
        if (followStatus) {
            const response = unfollowUserRequest(id, config);
            response.then( res => {
                setLoading(false)
                if (res.status === 409) {
                    alert('Unfollow request failed, user should already be followed');
                } else {
                    setFollowStatus(false)
                }
            });
            response.catch( err => {
                setLoading(false)
                alert("An error occured while trying to unfollow user, please refresh the page")
            });
        }
        else {
            const response = followUserRequest(id, config);
            response.then( res => {
                setLoading(false)
                if (res.status === 409) {
                    alert('Unfollow request failed, user should already be followed');
                } else {
                    setFollowStatus(true)
                }
            });
            response.catch( err => {
                setLoading(false)
                alert("Follow request failed, user already followed")
            });
        }

    }
    return (
        <TimelineContainer>
            <Header />
            <SearchBar />
            {notFound ? 
                <h1>Usuário não encontrado</h1> 
                :
                <Container>
                    <div>
                        <Title>
                            <img src={userPic} alt="user profile pic" />
                            {username}
                        </Title>
                        {renderPosts}
                    </div>
                    <div>
                        <Trending /> 
                    </div>
                    {renderButton}
                </Container>
            }
        </TimelineContainer>
    );
};

const TimelineContainer = styled.div`
    max-width: 100vw;
    margin: auto;
    position: relative;

    > h1 {
        margin-top: 100px;
        font: 700 42px 'Oswald', sans-serif;
        color: #FFFFFF;
        width: 100vw;
        text-align: center;
    }
    
`;
const Container = styled.div`
    position: relative;
    width: 76%;
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
    min-width: 30vw;

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

const FollowButton = styled.button`
    position: absolute;
    right: 15vw;
    top: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 0;
    width: 112px;
    height: 31px;
    color: ${props => props.color};
    background-color: ${props => props.background};
    cursor: pointer;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;

    :disabled {
        opacity: 0.6;
    }
`