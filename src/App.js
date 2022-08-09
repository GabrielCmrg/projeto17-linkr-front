import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./themes/GlobalStyle";

import Timeline from "./pages/Timeline.js";
import Signup from "./pages/Signup";

export default function App(){
    return(
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/sign-up" element={<Signup />} />
                </Routes>
            </BrowserRouter>    
            
        </>
        
    );
};
