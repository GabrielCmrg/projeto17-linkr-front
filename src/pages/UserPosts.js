import styled from "styled-components";
import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useInterval from "use-interval";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { getUserPostsRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext.js";
import PublicationList from "../components/PublicationList.js";
import Trending from "../components/Trending";

export default function UserPosts() {
    const [posts, setPosts] = React.useState("");
    const [numberVisiblePosts, setNumberVisiblePosts] = React.useState("");
    const [notFound, setNotFound] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [userPic, setUserPic] = React.useState("");
    const { userToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate();

    const { id } = useParams()

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };

    async function data() {
        const response = getUserPostsRequest(id, config);
        response.then(res => {
            if (res.status === 404) {
                setNotFound(true)
            } else {
                setUsername(res.data.userName);
                setUserPic(res.data.userPicUrl);
                setPosts([...res.data.userPosts]);
                setNumberVisiblePosts(res.data.userPosts.length);
            }
        });
        response.catch(err => {
            alert("An error occured while trying to fetch the posts, please refresh the page")
        });
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
                </Container>
            }
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