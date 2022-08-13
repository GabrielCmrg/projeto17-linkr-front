import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate} from "react-router-dom";
import {FiHeart} from "react-icons/fi";

export default function Publication({ userImage, userName, postTitle, postLink, LinkName, LinkSummary, LinkImg }) {
    const navigate = useNavigate();

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

    return (
        <Post>
            <AvatarLinkContainer>
                <Avatar src={userImage} alt="User" />
                <FiHeart size={20} color="white"/>
                <Likes>13 likes</Likes>
            </AvatarLinkContainer>
            <ContentContainer>
                <UserName>{userName}</UserName>
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
        // <Post>
        //     <img src={userImage} alt="User" />
        //     <div>
        //         <UserName>{userName}</UserName>
        //         <ReactTagify tagStyle={tagStyle} mentionStyle={{}} tagClicked={redirect}>
        //             <Content>{postTitle}</Content>
        //         </ReactTagify>
        //         <a href={postLink} target={"_blank"} rel="noreferrer">
        //             <Link>
        //                 <div>
        //                     <LinkTitle >{LinkName}</LinkTitle>
        //                     <LinkContent>{LinkSummary}</LinkContent>
        //                     <LinkUrl>{postLink}</LinkUrl>
        //                 </div>
        //                 <img src={LinkImg} alt="ImageLink" />
        //             </Link>
        //         </a>
            
        //     </div>
        // </Post>
    );
}
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
`
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
`
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
        
    }
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
`
const LinkUrl = styled.p`
    font: 400 10px 'Lato', sans-serif;
    color: #CECECE;
    @media(max-width: 414px){
        font-size: 9px;
    };
   
`
// const Post = styled.div`
//     font-family: 'Lato';
//     margin-top: 29px;
//     padding: 16px 18px;
//     background-color: #171717;
//     border-radius: 16px;
//     max-width: 611px;
//     display:flex;
//     justify-content:space-between;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//     margin: 16px auto;
//     img{
//         height: 53px;
//         width: 53px;
//         border-radius: 50%;
//         object-fit: cover;
//         @media(max-width: 414px){
//             height: 40px;
//             width: 40px;
//             border-radius: 50%;
//             object-fit: cover;
//         };   
//     };
    
//     &>div{
//         width: 85%;
//         display:flex;
//         flex-direction: column;
//     }

//     a{
//         text-decoration: none;
        
//     }
//     @media(max-width: 414px){
//     border-radius: 0;
//     /* justify-content:space-between; */
       
    
//     };
    
// `;

// const UserName = styled.h1`
//     font-weight: 400;
//     font-size: 19px;
//     color: #FFFFFF;
//     @media(max-width: 414px){
//         font-size: 17px;
//     }

// `;

// const Content = styled.div`
//     font-weight: 400;
//     font-size: 17px;
//     color: #B7B7B7;
//     margin-top: 8px;
//     @media(max-width: 414px){
//         font-size: 15px;
//     }
// `;

// const Link = styled.div`
//     border: 1px solid #4D4D4D;
//     border-radius: 10px;
//     height: 155px;
//     margin-top: 8px;
//     display:flex;
//     justify-content: space-between;
//     width: 100%;

//     img{
//         /* max-width:%; */
//         height: 155px;
//         border-radius: 0px 10px 10px 0px;
//         object-fit: cover;
//     }


//     &>div{
//         display:flex;
//         flex-direction:column;
//         padding:19px;
//         justify-content: center;
//         width: 100%;
//         @media(max-width: 414px){
//         padding: 11px;
//     }
//     }
// `;

// const LinkTitle = styled.div`
//     color: #CECECE;
//     font-weight: 400;
//     font-size: 16px;
//     @media(max-width: 414px){
//         font-size: 11px;
//     }
// `;

// const LinkContent = styled.span`
//     margin-top: 10px;
//     color: #9B9595;
//     font-weight: 400;
//     font-size: 10px;
//     @media(max-width: 414px){
//         font-size: 9px;
//     }
// `;

// const LinkUrl = styled.span`
//     margin-top: 12px;
//     color: #CECECE;
//     font-weight: 400;
//     font-size: 10px;
//     @media(max-width: 414px){
//         font-size: 9px;
//     }
// `;
