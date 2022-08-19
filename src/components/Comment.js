import styled from "styled-components";

export default function Comment({ commentAuthorImage, commentAuthor, isFollowing, isAuthor, comment }) {
    return (
        <Container>
            <Avatar src={commentAuthorImage} alt="User" />
            <CommentArea>
                <CommentHeader>
                    <Author>{commentAuthor}</Author>
                    {isFollowing ? <Extra>following</Extra> : <></>}
                    {isAuthor ? <Extra>post's author</Extra> : <></>}
                </CommentHeader>
                <CommentBody>
                    {comment}
                </CommentBody>
            </CommentArea>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 18px;
    padding: 5px;
`;

const Avatar = styled.img`
    height: 39px;
    width: 39px;
    border-radius: 50%;
    object-fit: cover;
`;

const CommentArea = styled.div`
    font-family: 'Lato', sans-serif;
    width: 90%;
`;

const CommentHeader = styled.div`
    display: flex;
`;

const Author = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: #F3F3F3;
    margin-right: 4px;
`;

const Extra = styled.div`
    font-weight: 400;
    font-size: 14px;
    color: #565656;
    margin-right: 4px;

    ::before {
        content: "• ";
    }
`;

const CommentBody = styled.div`
    font-size: 14px;
    color: #ACACAC;
    margin-top: 6px;
    word-wrap: break-word;
    max-width: 100%;
`;
