import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./themes/GlobalStyle";
import Timeline from "./pages/Timeline.js";

export default function App(){
    return(
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/timeline" element={<Timeline />}/>
                </Routes>
            </BrowserRouter>    
            
        </>
        
    );
};