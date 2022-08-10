import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import ApplicationContext from "./contexts/ApplicationContext";

import GlobalStyle from "./themes/GlobalStyle";

import Timeline from "./pages/Timeline.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App(){
    const [userToken, setUserToken] = React.useState(localStorage.getItem("token"));
    const userImage = "https://upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg";
    React.useEffect(() => {
        if (userToken) {
            localStorage.setItem("token", userToken);
        }
    }, [userToken])
    const contextValue = { userToken, setUserToken, userImage };

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
