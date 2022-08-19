import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import ApplicationContext from "./contexts/ApplicationContext";

import GlobalStyle from "./themes/GlobalStyle";

import Timeline from "./pages/Timeline.js";
import UserPosts from "./pages/UserPosts.js";
import Hashtag from "./pages/Hashtag.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App(){
    const [userToken, setUserToken] = React.useState(localStorage.getItem("token"));
    const [userImage, setUserImage] = React.useState(localStorage.getItem("image"));
    const [userName, setUserName] = React.useState(localStorage.getItem("name"));
    
    React.useEffect(() => {
        if (userImage) {
            localStorage.setItem("image", userImage);
        }
    }, [userImage]);
    React.useEffect(() => {
        if (userToken) {
            localStorage.setItem("token", userToken);
        }
    }, [userToken]);
    React.useEffect(()=>{
        if(userName) {
            localStorage.setItem("name", userName);
        }
    },[userName]);
    const contextValue = { userToken, setUserToken, userImage, setUserImage, userName, setUserName, };

    return(
        <ApplicationContext.Provider value={contextValue}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/user/:id" element={<UserPosts />} />
                    <Route path="/hashtag/:hashtag" element={<Hashtag />} />
                </Routes>
            </BrowserRouter>    
        </ApplicationContext.Provider>
    );
};
