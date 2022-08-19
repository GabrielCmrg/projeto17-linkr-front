import styled from "styled-components";
import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useInterval from "use-interval";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { getUserPostsRequest, followUserRequest, unfollowUserRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext.js";
import PublicationList from "../components/PublicationList.js";
import Trending from "../components/Trending";

export default function UserPosts() {
    const [posts, setPosts] = React.useState("");
    const [numberVisiblePosts, setNumberVisiblePosts] = React.useState("");
    const [notFound, setNotFound] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [userPic, setUserPic] = React.useState("");
    const [followStatus, setFollowStatus] = React.useState(false);
    const [isOwner, setIsOwner] = React.useState(true);
    const { userToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const { id } = useParams()

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };

    async function data() {
        const response = await getUserPostsRequest(id, config);
        if (response.status === 404) {
            setNotFound(true);
            return;
        }

        if (response.status === 200) {
            setUsername(response.data.userName);
            setUserPic(response.data.userPicUrl);
            setPosts([...response.data.userPosts]);
            setNumberVisiblePosts(response.data.userPosts.length);
        }

        alert("An error occured while trying to fetch the posts, please refresh the page")
    };

    React.useEffect(() => {
        if (!userToken) {
            navigate("/", { replace: true });
            return;
        };
        setNotFound(false)
        data()
    }, [id]);

    useInterval(async () => {
        const response = await getUserPostsRequest(id, config);
        if (response.status !== 404) {
            setPosts([...response.data.userPosts]);
        }
    }, 15000);

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

    const renderButton = displayFollowButton();

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
                        <PublicationList posts={posts} numberVisiblePosts={numberVisiblePosts} setNumberVisiblePosts={setNumberVisiblePosts} />
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
`;
