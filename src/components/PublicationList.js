import { FiRefreshCw } from "react-icons/fi";
import styled from "styled-components";
import Publication from "./Publication.js";

export default function PublicationList({ posts, numberVisiblePosts, setNumberVisiblePosts }) {
    function checkForPosts() {
        if (!posts) {
            return (
                <TextContainer>
                    <h2>Loading...</h2>
                </TextContainer>
            );
        } else if (numberVisiblePosts === 0) {
            return (
                <TextContainer>
                    <h2>There are no posts yet</h2>
                </TextContainer>
            );
        } else {
            return (
                posts.slice(posts.length - numberVisiblePosts).map(item => (
                    <Publication
                        key={Date.now() * item.id}
                        userLiked={item.userliked}
                        firstLike={item.firstlike}
                        secondLike={item.secondlike}
                        likesAmount={item.likes_amount}
                        postId={item.id}
                        originalPostId={item.original_post_id}
                        userImage={item.pic_url}
                        authorName={item.name}
                        authorSharedName={item.name_author_shared}
                        repostAmount={item.reposts}
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
        if (posts.length - numberVisiblePosts > 1) {
            return (
                <LoadMoreButton onClick={() => setNumberVisiblePosts(posts.length)}>
                    {`${posts.length - numberVisiblePosts} new posts, load more!`}
                </LoadMoreButton>
            )
        }
        else if (posts.length - numberVisiblePosts > 0) {
            return (
                <LoadMoreButton onClick={() => setNumberVisiblePosts(posts.length)}>
                    <span>{`${posts.length - numberVisiblePosts} new post, load more!`}</span>
                    <FiRefreshCw />
                </LoadMoreButton>
            )
        }
        return ""
    }

    const renderPosts = checkForPosts();
    const loadMoreButton = renderLoadMoreButton();

    return (
        <>
            {loadMoreButton}
            {renderPosts}
        </>
    )
};

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

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    h2{
        font: 400 20px 'Oswald', sans-serif;
        color: #FFFFFF;
    }
`;
