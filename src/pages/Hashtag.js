import styled from "styled-components";
import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useInterval from "use-interval";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { getTagPostsRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext.js";
import PublicationList from "../components/Publication.js";
import Trending from "../components/Trending";

export default function Hashtag() {
    const [posts, setPosts] = React.useState("");
    const [numberVisiblePosts, setNumberVisiblePosts] = React.useState("");
    const { userToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate();

    const { hashtag } = useParams()

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };

    async function data() {
        const response = getTagPostsRequest(hashtag, config);
        response.then(res => {
            if (res.status === 404) {
            } else {
                setPosts([...res.data.tagPosts]);
                setNumberVisiblePosts(res.data.tagPosts.length);
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
        data()
    }, [hashtag]);


    useInterval(async () => {
        const response = await getTagPostsRequest(hashtag, config);
        if (response.status !== 404) {
            setPosts([...response.data.tagPosts]);
        }
    }, 15000);

    return (
        <TimelineContainer>
            <Header />
            <SearchBar />
            <Container>
                <div>
                    <Title># {hashtag}</Title>
                    <PublicationList posts={posts} numberVisiblePosts={numberVisiblePosts} setNumberVisiblePosts={setNumberVisiblePosts} />
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