import styled from "styled-components";
import { DebounceInput } from 'react-debounce-input';
import { searchUserRequest } from "../services/api";
import React from "react";

import User from "../components/User";
import ApplicationContext from "../contexts/ApplicationContext";

export default function SearchBar(){
    const { userToken } = React.useContext(ApplicationContext);
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState(null);

    const config = {
        headers: {
        Authorization: `Bearer ${userToken}`,
        }
    };
    React.useEffect(() => {
        async function data(){

            const body = {
                search
            }

            const response = searchUserRequest(body, config);
            response.then( res => {
                setSearchResult([...res.data]);
            });
            response.catch( err => {
                alert("An error occured while trying search for users, please refresh the page")
            });
        };
        if (search) {
            data()
        }
        if (search.length < 3) {
            setSearchResult(null)
        }
        
    },[search]);

    function closeBar () {
        setSearch("")
    }

    function checkForUsers (){
        if(searchResult === null){
            return(
                null
            );
        }else if(searchResult.length === 0){
            return (
                <h1>User not found</h1>
            );
        }else{
            return(
                searchResult.map(item=>(
                    <User
                        key={item.id}
                        userId={item.id}
                        userImage={item.pic_url}
                        userName={item.name}
                        setSearch={setSearch}
                    />))
            );
        };
    };

    const renderUsers = checkForUsers ()
    return (
        <Container>
            <StyledDebounceInput
                minLength={3}
                debounceTimeout={300}
                placeholder="Search for people"
                value={search}
                onChange={e => setSearch(e.target.value)} 
            />
            {renderUsers}

        </Container>
    );


};

const Container = styled.div`
    width: 40vw;
    height: auto;
    background-color: #E7E7E7;
    z-index: 2;
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
`

const StyledDebounceInput = styled(DebounceInput)`
    width: 100%;
    height: 45px;
    background-color: #FFFFFF;
    border-radius: 8px;
    border: 0;
    outline: none;
    padding-left: 15px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;


    color: #515151;

    ::placeholder {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;


        color: #C6C6C6;
    }

`;
