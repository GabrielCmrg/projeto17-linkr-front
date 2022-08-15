import React from "react";
import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import {FiHeart} from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import ReactTooltip from 'react-tooltip';
import { ImPencil } from "react-icons/im";

import { editPostRequest, likeRequest, dislikeRequest } from "../services/api";

import ApplicationContext from "../contexts/ApplicationContext";

import DeleteModal from "./DeleteModal"

export default function Publication({
    userLiked,
    firstLike,
    secondLike,
    likesAmount,
    postId, 
    userImage, 
    userName, 
    postTitle, 
    postLink, 
    LinkName, 
    LinkSummary, 
    LinkImg, 
    userauthorship,
    authorId }) {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const [editing, setEditing] = React.useState(false);
    const [editLoading, setEditLoading] = React.useState(false);
    const [postContentInput, setPostContentInput] = React.useState(postTitle);
    const [postContent, setPostContent] = React.useState(postTitle);
    const inputRef = React.useRef(null);
    const [liked, setLiked] = React.useState(userLiked);
    const [totalLikes, setTotalLikes] = React.useState(parseInt(likesAmount));
    
    React.useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const { userToken } = React.useContext(ApplicationContext);
    const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
    };

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
    };
    async function likePost (){
        if(!liked){
            setLiked(true);
            setTotalLikes( totalLikes + 1);
            const response =  await likeRequest(config, postId);
            if(response.status !== 200){
                alert('Something went wrong when trying to like a post');
                setTotalLikes( totalLikes - 1);
                setLiked(false);
            };
        }else{
            setLiked(false);
            setTotalLikes( totalLikes - 1);
            const response = await dislikeRequest(config, postId);
            if(response.status !== 200){
                alert('Something went wrong when trying to like a post');
                setTotalLikes( totalLikes + 1);
                setLiked(true);
            };
        };
    };

    function countLikes (){
        if(totalLikes === 0){
            return 
        }else if( totalLikes === 1){
            return `${totalLikes} like`
        }else{
            return `${totalLikes} likes`
        };
    };

    function showWhoLiked (){
        
        
        if(!userLiked){
            if(totalLikes > 3){
                return `${firstLike}, ${secondLike} e outras ${totalLikes - 2} pessoas`;
            }else if(totalLikes === 3){
                return `${firstLike}, ${secondLike} e mais ${totalLikes - 2} pessoa}`;
            }else if(totalLikes === 2){
                return `${firstLike} e ${secondLike}`;
            }else{
                return `${firstLike}`;
            }   
        }else{
            if(totalLikes > 3){
                return `Você, ${secondLike} e outras ${totalLikes - 2} pessoas`;
            }else if(totalLikes === 3){
                return `Você, ${secondLike} e mais ${totalLikes - 2} pessoa}`;
            }else if(totalLikes === 2){
                return (`Você, ${firstLike===userName?secondLike:firstLike}`);
            }else{
                return `Você`;
            }
        }

    }
    
    function redirectToUserPage () {
        navigate(`/user/${authorId}`)
    }
    

    function escapeEditing(e) {
        const ESC_KEY_CODE = 27;
        if (e.keyCode === ESC_KEY_CODE) {
            setEditing(false);
        }
    }

    async function sendEditRequest(e) {
        e.preventDefault();
        setEditLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await editPostRequest(postLink, postContentInput, config, postId);
        if (response.status === 200) {
            setEditLoading(false);
            setEditing(false);
            setPostContent(postContentInput);
            return;
        }

        alert("Something went wrong, try editing again in a few seconds or reload the page.");
        setEditLoading(false);
    }

    function postTitleArea() {
        if (editing) {
            return (
                <FormContainer onSubmit={sendEditRequest}>
                    <ContentInput
                        value={postContentInput}
                        onChange={e => setPostContentInput(e.target.value)}
                        placeholder="Awesome article about #javascript"
                        ref={inputRef}
                        onKeyDown={escapeEditing}
                        disabled={editLoading}
                    />
                </FormContainer>
            );
        } else if(postTitle) {
            return (
                <ReactTagify tagStyle={tagStyle} mentionStyle={{}} tagClicked={redirect}>
                    <ContentTitle>{postContent}</ContentTitle>
                </ReactTagify>
            );
        }

        return (<></>);
    }

    const renderAmountlikes = countLikes();
    const renderWhoLiked = showWhoLiked();

    return (
        <>
            <Post>
                <AvatarLinkContainer>
                    <Avatar onClick={redirectToUserPage} src={userImage} alt="User" />
                    <FiHeart onClick={likePost} size={20} color={liked?"red":"white"} fill={liked?"red":""}/>
                    <>
                    <Likes data-tip={renderWhoLiked} data-for="likes">{renderAmountlikes}</Likes>
                    <ReactTooltip place="bottom" type="light" id="likes" />
                    </>
                </AvatarLinkContainer>
                <ContentContainer>
                    <PostTitle>
                        <UserName onClick={redirectToUserPage}>{userName}</UserName>
                        <Buttons>
                            {userauthorship ? 
                            <>
                                <ImPencil onClick={() => setEditing(!editing)}/>
                                <IoMdTrash onClick = {() => setDeleteModalIsOpen(true)}/>
                            </> : 
                            <></>}
                        </Buttons>
                    </PostTitle>
                    {postTitleArea()}
                    <LinkContainer href={postLink} target="_blank" rel="noreferrer">
                        <div>
                            <LinkTitle >{LinkName}</LinkTitle>
                            <LinkContent>{LinkSummary}</LinkContent>
                            <LinkUrl>{postLink}</LinkUrl>
                        </div>
                        <img src={LinkImg} alt="ImageLink" />
                    </LinkContainer>
                </ContentContainer>
            </Post>
            <DeleteModal deleteModalIsOpen={deleteModalIsOpen} setDeleteModalIsOpen={setDeleteModalIsOpen} postId={postId} />
        </>                
    );
};
const Post = styled.div`
    background: #171717;
    display:flex;
    margin: 40px auto 30px auto;
    position: relative;
    width:611px;
    padding: 16px 18px;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap:20px;
    @media(max-width: 611px ){
        border-radius: 0;
        width:100vw;
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
    cursor: pointer;
`;

const Likes = styled.div`
    margin-top:5px;
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
    cursor: pointer;
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
    
    :disabled {
        background-color: lightgray;
        color: darkgray;
    }
`;
