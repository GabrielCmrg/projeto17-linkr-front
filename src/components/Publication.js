import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { ImPencil } from "react-icons/im";

export default function Publication({ userImage, userName, postTitle, postLink, LinkName, LinkSummary, LinkImg, userauthorship }) {
    const navigate = useNavigate();

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

    return (
        <Post>
            <img src={userImage} alt="User" />
            <div>
                <UserName>{userName}</UserName>
                <Buttons>{userauthorship ? <><ImPencil /><IoMdTrash /></> : ''}</Buttons>
                <ReactTagify tagStyle={tagStyle} mentionStyle={{}} tagClicked={redirect}>
                    <Content>{postTitle}</Content>
                </ReactTagify>
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
    position: absolute;
    top:22px;
    right:22px;
    display: flex;
`;
