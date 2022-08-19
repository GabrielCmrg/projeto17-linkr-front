import styled from "styled-components";
import Modal from 'react-modal';
import ApplicationContext from "../contexts/ApplicationContext";
import { useContext, useState } from "react";
import { deletePostRequest, sharePostRequest } from "../services/api";

Modal.setAppElement('#root');

export default function ModalAction({ ModalIsOpen, setModalIsOpen, postId, action, data }) {
    const [actionDisabled, setActionDisabled] = useState(false);
    const { userToken } = useContext(ApplicationContext);
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    };
   
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "597px",
            backgroundColor: "#333333",
            borderRadius: "50px",
            padding: "38px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontFamily: 'Lato'
        }
    };
    async function deletePost() {
        setActionDisabled(true);
        const response = await deletePostRequest(postId, config);
        if (response.status === 200) {
            setActionDisabled(false)
            setModalIsOpen(false);
            window.location.reload();
            return;
        }
        else {
            setActionDisabled(false)
            setModalIsOpen(false);
            alert("Could not delete post.");
            return;
        }
    }
    async function sharePost (){
        setActionDisabled(true);
        const response = await sharePostRequest(postId, config);
        console.log(response);
        if(response.status === 201) {
            setModalIsOpen(false);
            data();
            return;
        
        }else{
            console.log(response)
            setActionDisabled(false)
            setModalIsOpen(false);
            alert("Could not share post.");
            return;
        }
    }
    return (
        <>
        {   action === "delete"? 
            <>
            <Modal isOpen={ModalIsOpen} style={customStyles}>
            <Title>Are you sure you want to delete this post?</Title>
            <CommandBar>
                <QuitButton disabled={actionDisabled} onClick={() => setModalIsOpen(false)}>No, go back</QuitButton>
                <ConfirmButton disabled={actionDisabled} onClick={() => deletePost()}>{actionDisabled ? "Deleting..." : "Yes, delete it"}</ConfirmButton>
            </CommandBar>
            </Modal>           
            
            </>:
            <>
            <Modal isOpen={ModalIsOpen} style={customStyles}>
            <Title>Do you want to re-post this link?</Title>
            <CommandBar>
                <QuitButton disabled={actionDisabled} onClick={() => setModalIsOpen(false)}>No, cancel</QuitButton>
                <ConfirmButton disabled={actionDisabled} onClick={sharePost}>{actionDisabled ? "sharing..." : "Yes, share!"}</ConfirmButton>
            </CommandBar>
            </Modal>
            
            </>}
        </>
    );
};

const Title = styled.div`
  min-width: 60%;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #ffffff;
`;

const CommandBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 288px;
  margin-top: 38px;

  button {
    font-family: 'Lato';
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    font-size: 18px;
  }
`;

const QuitButton = styled.button`
  background-color: #ffffff;
  color: #1877f2;
`;

const ConfirmButton = styled.button`
  background-color: #1877f2;
  color: #ffffff;
`;