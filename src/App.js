import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

import ApplicationContext from "./contexts/ApplicationContext";

import GlobalStyle from "./themes/GlobalStyle";

import Timeline from "./pages/Timeline.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App(){
    const [userToken, setUserToken] = React.useState(localStorage.getItem("token"));
    useEffect(() => {
        if (userToken) {
            localStorage.setItem("token", userToken);
        }
    }, [userToken])
    const contextValue = { userToken, setUserToken };

    return(
        <ApplicationContext.Provider value={contextValue}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/sign-up" element={<Signup />} />
                </Routes>
            </BrowserRouter>    
        </ApplicationContext.Provider>
    );
};
