import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PublicationForm from "../components/PublicationForm.js";
import Publication from "../components/Publication";
import Trending from "../components/Trending";

import { getAllPostRequest } from "../services/api";

import ApplicationContext from "../contexts/ApplicationContext.js";
import { FiRefreshCw } from "react-icons/fi";


export default function Timeline() {
    const [posts, setPosts] = React.useState("");
    const [visiblePosts, setVisiblePosts] = React.useState("");
    const { userToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };
    React.useEffect(() => {
        if (!userToken) {
            navigate("/", { replace: true });
            return;
        };
        async function data() {
            const response = await getAllPostRequest(config);
            if (response.status === 200) {
                setVisiblePosts([...response.data]);
            } else {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            };
        };
        data()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useInterval(async () => {
        const response = await getAllPostRequest(config);
        if (response.status === 200) {
            setPosts([...response.data]);
        }
    }, 15000);

    function checkForPosts() {
        if (!visiblePosts) {
            return (
                <TextContainer>
                    <h2>Loading...</h2>
                </TextContainer>
            );
        } else if (visiblePosts.length === 0) {
            return (
                <TextContainer>
                    <h2>There are no posts yet</h2>
                </TextContainer>
            );
        } else {
            return (
                visiblePosts.map(item => (
                    <Publication
                        key={item.id}
                        userLiked={item.userliked}
                        firstLike={item.firstlike}
                        secondLike={item.secondlike}
                        likesAmount={item.likes_amount}
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

    function renderLoadMoreButton() {
        if (posts.length - visiblePosts.length > 1) {
            return (
                <LoadMoreButton onClick={() => setVisiblePosts(posts)}>
                    {`${posts.length - visiblePosts.length} new posts, load more!`}
                </LoadMoreButton>
            )
        }
        else if (posts.length - visiblePosts.length > 0) {
            return (
                <LoadMoreButton onClick={() => setVisiblePosts(posts)}>
                    <span>{`${posts.length - visiblePosts.length} new posts, load more!`}</span>
                    <FiRefreshCw />
                </LoadMoreButton>
            )
        }
        return ""
    }

    const renderPosts = checkForPosts();

    return (
        <TimelineContainer>
            <Header />
            <SearchBar />
            <Container>
                <div>
                    <Title>timeline</Title>
                    <PublicationForm />
                    {renderLoadMoreButton()}
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
    margin: auto;
`;
const Container = styled.div`
    max-width: 100vw;
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
`;

const LoadMoreButton = styled.button`
    width:100%;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    border: none;
    font-weight: 400;
    font-size: 16px;
    font-family: 'Lato';
    color: #FFFFFF;

    span{
        margin-right:10px;
    }
`;
