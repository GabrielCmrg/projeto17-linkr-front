import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { ImPencil } from "react-icons/im";
import React from "react";

import { editPostRequest } from "../services/api";
import ApplicationContext from "../contexts/ApplicationContext";

export default function Publication({ key, userImage, userName, postTitle, postLink, LinkName, LinkSummary, LinkImg, userauthorship }) {
    const navigate = useNavigate();
    const [editing, setEditing] = React.useState(false);
    const [postContent, setPostContent] = React.useState(postTitle);
    const { userToken } = React.useContext(ApplicationContext);

    const tagStyle = {
        fontWeight: 700,
        cursor: 'pointer',
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
        const response = await editPostRequest(postLink, postContent, config, key);
        if (response.status === 200) {
            window.location.reload();
            return;
        }

        alert("Something went wrong, try editing again in a few seconds or reload the page.");
    }

    return (
        <Post>
            <img src={userImage} alt="User" />
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <UserName>{userName}</UserName>
                    <Buttons>
                        {userauthorship ? 
                        <>
                            <ImPencil onClick={() => setEditing(!editing)}/>
                            <IoMdTrash />
                        </> : 
                        <></>}
                    </Buttons>
                </div>
                {
                    editing ?
                    <form onSubmit={sendEditRequest}>
                        <ContentInput
                            value={postContent}
                            onChange={e => setPostContent(e.target.value)}
                        />
                    </form> :
                    <></>
                }
                {
                    postTitle && !editing ?
                    <ReactTagify tagStyle={tagStyle} mentionStyle={{}} tagClicked={redirect}>
                        <Content>{postTitle}</Content>
                    </ReactTagify>: 
                    <></>
                }
                <a href={postLink}>
                    <Link>
                        <div>
                            <LinkTitle >{LinkName}</LinkTitle>
                            <LinkContent>{LinkSummary}</LinkContent>
                            <LinkUrl>{postLink}</LinkUrl>
                        </div>
                        <img src={LinkImg} alt="ImageLink" />
                    </Link>
                </a>
            </div>
        </Post>
    );
}

const Post = styled.div`
    font-family: 'Lato';
    margin-top: 29px;
    padding: 16px 18px;
    background-color: #171717;
    border-radius: 16px;
    width: 611px;
    display:flex;
    justify-content:space-between;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    img{
        height: 53px;
        width: 53px;
        border-radius: 50%;
    };
    
    &>div{
        width: 85%;
        display:flex;
        flex-direction: column;
    }

    a{
        text-decoration: none;
    }
`;

const UserName = styled.h1`
    font-weight: 400;
    font-size: 19px;
    color: #FFFFFF;
`;

const Content = styled.div`
    font-weight: 400;
    font-size: 17px;
    color: #B7B7B7;
    margin-top: 8px;
`;

const Link = styled.div`
    border: 1px solid #4D4D4D;
    border-radius: 10px;
    height: 155px;
    margin-top: 8px;
    display:flex;
    justify-content: space-between;
    width: 100%;

    img{
        width:155px;
        height: 155px;;
        border-radius: 0px 10px 10px 0px;
    }

    &>div{
        display:flex;
        flex-direction:column;
        padding:19px;
        justify-content: center;
    }
`;

const LinkTitle = styled.div`
    color: #CECECE;
    font-weight: 400;
    font-size: 16px;
`;

const LinkContent = styled.span`
    margin-top: 10px;
    color: #9B9595;
    font-weight: 400;
    font-size: 10px;
`;

const LinkUrl = styled.span`
    margin-top: 12px;
    color: #CECECE;
    font-weight: 400;
    font-size: 10px;
`;

const Buttons = styled.div`
    color: #ffffff;
    font-size:14px;
    top:22px;
    right:22px;
    display: flex;

    svg {
        margin: 0 5px;
        cursor: pointer;
    }
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
