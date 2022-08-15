import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import {FiHeart} from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { ImPencil } from "react-icons/im";
import React from "react";

import { editPostRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext";

export default function Publication({ postId, userImage, userName, postTitle, postLink, LinkName, LinkSummary, LinkImg, userauthorship }) {
    const navigate = useNavigate();
    const [editing, setEditing] = React.useState(false);
    const [postContent, setPostContent] = React.useState(postTitle);
    const { userToken } = React.useContext(ApplicationContext);

    const tagStyle = {
        fontWeight: 700,
        cursor: 'pointer',
        color: 'white',
    };

    function redirect(tag) {
        if (tag.match(/(https?:\/\/[^\s]+)/g)) {
            window.open(tag, '_blank');
        }

        if (tag.match(/#\w+/g)) {
            const hashtagName = tag.match(/#\w+/g)[0].replace('#', '');
            navigate(`/hashtag/${hashtagName}`);
        }
    }

    async function sendEditRequest(e) {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await editPostRequest(postLink, postContent, config, postId);
        if (response.status === 200) {
            window.location.reload();
            return;
        }

        alert("Something went wrong, try editing again in a few seconds or reload the page.");
    }

    function postTitleArea() {
        if (editing) {
            return (
                <FormContainer onSubmit={sendEditRequest}>
                    <ContentInput
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        placeholder="Awesome article about #javascript"
                    />
                </FormContainer>
            );
        } else if(postTitle) {
            return (
                <ReactTagify tagStyle={tagStyle} mentionStyle={{}} tagClicked={redirect}>
                    <ContentTitle>{postTitle}</ContentTitle>
                </ReactTagify>
            );
        }

        return (<></>);
    }

    return (
        <Post>
            <AvatarLinkContainer>
                <Avatar src={userImage} alt="User" />
                <FiHeart size={20} color="white"/>
                <Likes>13 likes</Likes>
            </AvatarLinkContainer>
            <ContentContainer>
                <PostTitle>
                    <UserName>{userName}</UserName>
                    <Buttons>
                        {userauthorship ? 
                        <>
                            <ImPencil onClick={() => setEditing(!editing)}/>
                            <IoMdTrash />
                        </> : 
                        <></>}
                    </Buttons>
                </PostTitle>
                {postTitleArea()}
                <LinkContainer href={postLink} target="_blank">
                    <div>
                        <LinkTitle >{LinkName}</LinkTitle>
                        <LinkContent>{LinkSummary}</LinkContent>
                        <LinkUrl>{postLink}</LinkUrl>
                    </div>
                    <img src={LinkImg} alt="ImageLink" />
                </LinkContainer>
            </ContentContainer>
        </Post>
    );
};
const Post = styled.div`
    background: #171717;
    display:flex;
    margin: 40px auto 30px auto;
    width:611px;
    padding: 16px 18px;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap:20px;
    @media(max-width: 611px ){
        width:100%;
    }
`;

const AvatarLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Avatar = styled.img`
    height: 53px;
    width: 53px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
`;

const Likes = styled.p`
    font: 400 10px 'Lato', sans-serif;
    color: #FFFFFF;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap:10px;
    width: 90%; 
`;

const UserName = styled.p`
    font: 400 19px 'Lato', sans-serif;
    color: #FFFFFF;
    @media(max-width: 414px){
        font-size: 17px;
    };
`;

const ContentTitle = styled.p`
    font: 400 17px 'Lato', sans-serif;
    color: #B7B7B7;
    @media(max-width: 414px){
        font-size: 17px;
    };
`;

const LinkContainer = styled.a`
    display: flex;
    border: 1px solid #4D4D4D;
    border-radius: 10px;
    justify-content:space-between;
    align-items: center;
    width:100%;
    height:155px;
    cursor:pointer;
    text-decoration: none;

    div{
        display: flex;
        flex-direction: column;
        gap:10px;
        padding: 24px 0 20px 20px;
    }
    img{
        height:100%;
        width:40%;
        border-radius: 0 10px 10px 0;
        font: inherit;
    };
`;

const LinkTitle = styled.p`
    font: 400 16px 'Lato', sans-serif;
    color: #CECECE;
    @media(max-width: 414px){
        font-size: 11px;
    };
`;

const LinkContent = styled.p`
    font: 400 10px 'Lato', sans-serif;
    color: #9B9595;
    @media(max-width: 414px){
        font-size: 9px;
    };
`;

const LinkUrl = styled.p`
    font: 400 10px 'Lato', sans-serif;
    color: #CECECE;
    @media(max-width: 414px){
        font-size: 9px;
    };
`;

const Buttons = styled.div`
    color: #ffffff;
    font-size:14px;
    display: flex;

    svg {
        margin: 0 5px;
        cursor: pointer;
    }
`;

const PostTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const FormContainer = styled.form`
    width: 100%;
`;

const ContentInput = styled.input`
    border: none;
    background-color: #EFEFEF;
    border-radius: 5px;
    padding: 10px;
    font-family:'Lato', sans-serif;
    margin-top: 8px;
    width: 100%;
`;
