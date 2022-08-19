import styled from "styled-components";
import React from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

import ApplicationContext from "../contexts/ApplicationContext";

import { sendCommentRequest, getPostComments } from "../services/api";

import Comment from './Comment';

export default function CommentSection({ postId, totalComments, setTotalComments }) {
    const { userImage, userToken } = React.useContext(ApplicationContext);
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };

    async function populateComments() {
        const response = await getPostComments(config, postId);
        if (response.status === 200) {
            setComments(response.data);
            return;
        }

        alert("Can't access the comments. Please try logging in again.")
    }

    React.useEffect(() => {
        populateComments();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function makeComment() {
        const response = await sendCommentRequest(postId, comment, config);
        if (response.status === 201) {
            populateComments();
            setTotalComments(parseInt(totalComments) + 1);
            setComment("");
            return;
        }

        alert("Something is wrong!");
    }

    return (
        <Background>
            {comments.map(cmnt => (
                <>
                    <Comment
                        key={cmnt.id}
                        commentAuthorImage={cmnt.pic_url}
                        commentAuthor={cmnt.name}
                        isFollowing={cmnt.is_followed}
                        isAuthor={cmnt.authorship}
                        comment={cmnt.comment}
                    />
                    <Separator />
                </>
            ))}
            <CommentBox>
                <Avatar src={userImage} alt="User" />
                <Input
                    placeholder="write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <IoPaperPlaneOutline onClick={makeComment} size={16} color="white" />
            </CommentBox>
        </Background>
    );
};

const Background = styled.div`
    background-color: #1E1E1E;
    border-radius: 0 0 16px 16px;
    padding: 10px 20px;
`;

const CommentBox = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 15px;
    position: relative;

    svg {
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
`;

const Avatar = styled.img`
    height: 39px;
    width: 39px;
    border-radius: 50%;
    object-fit: cover;
`;

const Input = styled.input`
    width: 100%;
    height: 39px;
    background-color: #252525;
    border-radius: 8px;
    border: none;
    padding: 10px 15px;
    color: white;

    ::placeholder {
        font-family: 'Lato', sans-serif;
        font-style: italic;
        font-size: 14px;
        color: #575757;
    }
`;

const Separator = styled.div`
    width: 100%;
    border: 1px solid #353535;
    margin: 10px 0;
`;
