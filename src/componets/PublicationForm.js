import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


export default function PublicationForm(){
    const [postLink, setPostLink] = useState("");
    const [content, setContent] =useState(""); 
    const [actionDisabled, setActionDisabled] = useState(false);
        
    const navigate = useNavigate()
    const URL = "https://linkr-hml.herokuapp.com/timeline";
    const token = localStorage.getItem("token");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    };
    function sendForm (e){
        e.preventDefault();
        setActionDisabled(true); 
        if(!postLink){
            alert("url is required");
            return;
        };
        const data = {
            postLink,
            content
        };
        const promise = axios.post(URL,data,config);

        promise
            .then(response =>{
                setActionDisabled(false);
                setContent("");
                setPostLink("");
                navigate("\timeline");
            })
            .catch(error =>{
                alert("Houve um erro ao publicar seu link");
                setActionDisabled(false);
            })
        
        
    }

    return(
        <PublicaionContainer>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg" alt="" />
            <form onSubmit={sendForm}>
                <h2>What are you going to share today?</h2>
                <input disabled={actionDisabled} type="url" value={postLink} onChange={e => setPostLink(e.target.value)} placeholder="http://..."></input>
                <textarea disabled={actionDisabled} value={content} onChange={e => setContent(e.target.value)}placeholder="Awesome article about #javascript"></textarea>
                <button disabled={actionDisabled} onClick={sendForm} >{actionDisabled ? "Publishing..." : "Publish"}</button>
            </form>
        </PublicaionContainer>
    );
};

const PublicaionContainer = styled.div`
    background: #FFFFFF;
    display:flex;
    margin-top: 100px;
    justify-content:space-between;
    width: 611px;
    padding: 16px 18px;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    img{
        height: 53px;
        width: 53px;
        border-radius: 50%;
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
            disable
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
            width:112px;
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
        }
    };
`