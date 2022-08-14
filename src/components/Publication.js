import React from "react";
import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate} from "react-router-dom";
import {FiHeart} from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";

export default function Publication({ postId, userImage, userName, postTitle, postLink, LinkName, LinkSummary, LinkImg, userauthorship }) {
    const navigate = useNavigate();
    const [liked, setLiked] = React.useState(false);
    

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
    function likePost (){
        if(!liked){
            setLiked(true);
        }else{
            setLiked(false);
        };
    };
    // function showLikes (){
    //     if(){
    //         return  "";
    //     }else if(likes === 1){
    //         return `${likes} like`
    //     }else{
    //         return `${likes} likes`
    //     }
    // };
    const renderLikes = 0;
    return (
        <Post>
            <AvatarLinkContainer>
                <Avatar src={userImage} alt="User" />
                <FiHeart onClick={likePost} size={20} color={liked?"red":"white"} fill={liked?"red":""}/>
                <Likes>{renderLikes}</Likes>
            </AvatarLinkContainer>
            <ContentContainer>
                <UserName>{userName}</UserName>
                <Trash>{userauthorship ? <IoMdTrash /> : ''}</Trash>
                <ReactTagify tagStyle={tagStyle} mentionStyle={{}} tagClicked={redirect}>
                    <ContentTitle>{postTitle}</ContentTitle>
                </ReactTagify>
                <LinkContainer>
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
    justify-content:;
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

const LinkContainer = styled.div`
    display: flex;
    border: 1px solid #4D4D4D;
    border-radius: 10px;
    justify-content:space-between;
    align-items: center;
    width:100%;
    height:155px;
    cursor:pointer;
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

const Trash = styled.div`
    color: #ffffff;
    font-size:14px;
    position: absolute;
    top:22px;
    right:22px;
`