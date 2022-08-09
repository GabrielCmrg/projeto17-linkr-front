import { createGlobalStyle } from "styled-components";

import resetCSS from "./resetCSS";

// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

const GlobalStyle = createGlobalStyle`
    ${resetCSS}
    body {
        background-color: #333333;
    }
    #root {
        height: 100vh;
        padding: 25px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`;

export default GlobalStyle;