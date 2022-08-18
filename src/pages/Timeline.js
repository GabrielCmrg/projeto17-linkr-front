import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PublicationForm from "../components/PublicationForm.js";
import PublicationList from "../components/Publication";
import Trending from "../components/Trending";

import { getAllPostRequest } from "../services/api";

import ApplicationContext from "../contexts/ApplicationContext.js";


export default function Timeline() {
    const [posts, setPosts] = React.useState("");
    const [numberVisiblePosts, setNumberVisiblePosts] = React.useState("");
    const { userToken } = React.useContext(ApplicationContext);
    const navigate = useNavigate();


    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };

    async function data() {
        const response = await getAllPostRequest(config);
        if (response.status === 200) {
            setPosts([...response.data])
            setNumberVisiblePosts(response.data.length);
        } else {
            alert("An error occured while trying to fetch the posts, please refresh the page")
        };
    };

    React.useEffect(() => {
        if (!userToken) {
            navigate("/", { replace: true });
            return;
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

    return (
        <TimelineContainer>
            <Header />
            <SearchBar />
            <Container>
                <div>
                    <Title>timeline</Title>
                    <PublicationForm data={data} />
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