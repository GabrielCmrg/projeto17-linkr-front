import { createGlobalStyle } from "styled-components";

import resetCSS from "./resetCSS";

// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

const GlobalStyle = createGlobalStyle`
    ${resetCSS}
    
    *{
        box-sizing: border-box;
    }
    body {
        background-color: #333333;
    }
    #root{
    
    }
   
`;

export default GlobalStyle;