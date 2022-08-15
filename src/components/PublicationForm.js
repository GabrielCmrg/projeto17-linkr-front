import { useContext, useState } from "react";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

import { sendPostRequest } from "../services/api";

export default function PublicationForm(){
    const [postLink, setPostLink] = useState("");
    const [content, setContent] = useState(""); 
    const [actionDisabled, setActionDisabled] = useState(false);   
    
    const { userToken, userImage } = useContext(ApplicationContext);
    const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
    };

    async function sendForm (e) {
        e.preventDefault();
        setActionDisabled(true); 

        if(!postLink){
            alert("Url is required.");
            return;
        }

        const response = await sendPostRequest(postLink, content, config);
        if (response.status === 201) {
            setActionDisabled(false);
            setContent("");
            setPostLink("");
            window.location.reload();
            return;
        }

        alert("There was a problem when publishing your link.");
        setActionDisabled(false);
    };

    return (
        <PublicaionContainer>
            <img src={userImage} alt="User" />
            <form onSubmit={sendForm}>
                <h2>What are you going to share today?</h2>
                <input
                    disabled={actionDisabled}
                    type="url" value={postLink}
                    onChange={e => setPostLink(e.target.value)}
                    placeholder="http://..."
                />
                <textarea
                    disabled={actionDisabled}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Awesome article about #javascript"
                />
                <button disabled={actionDisabled} onClick={sendForm} >
                    {actionDisabled ? "Publishing..." : "Publish"}
                </button>
            </form>
        </PublicaionContainer>
    );
};

const PublicaionContainer = styled.div`
    background: #FFFFFF;
    display:flex;
    margin: 40px auto 30px auto;
    justify-content:space-between;
    width:611px;
    padding: 16px 18px;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    img{
        height: 53px;
        width: 53px;
        border-radius: 50%;
        object-fit: cover;
    };
    form{
        display: flex;
        flex-direction: column;
        gap:5px;
        width:85%;
        h2{
            margin-bottom: 15px;
            font: 300 20px 'Lato', sans-serif;
            color: #707070;
        }
        input{
            border: none;
            background-color: #EFEFEF;
            border-radius: 5px;
            padding: 10px;
            font-family:'Lato', sans-serif;
        
        }
        input:focus{
            outline: none;
            
        }
        textarea{
            border: none;
            background-color: #EFEFEF;
            border-radius: 5px;
            padding: 10px;
            height: 66px;
            resize: none;
            font-family:'Lato', sans-serif;            
        }
        textarea:focus{
            outline: none;
        }
        button{
            align-self: flex-end;
            width:30%;
            height: 31px;
            background-color: #1877F2;
            color: #FFFFFF;
            border: none;
            border-radius: 5px;
            font: 700 14px 'Lato', sans-serif;
            cursor: pointer;
            transition: .3s;
        }
        button:hover{
            filter: brightness(1.5);
        };
    };
    @media(max-width: 611px){
        width:100vw;
        border-radius: 0;
    };
    @media(max-width: 414px){               
        justify-content:center;
        img{
            display: none;
        };
        form{
            width:100%;
            h2{
                text-align: center;
            };
           
        };
        
    };
    
`;
