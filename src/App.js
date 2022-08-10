import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./themes/GlobalStyle";

import Timeline from "./pages/Timeline.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App(){
    return(
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/sign-up" element={<Signup />} />
                </Routes>
            </BrowserRouter>    
        </>
    );
};
