import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    * {
        box-sizing : border-box;
    }
    body{
        background-color : ${props => props.theme.bgColor};
        color : ${props => props.theme.blackColor};
        font-family: 'Open Sans', sans-serif;
    }
    a{
        color : ${props => props.theme.blueColor};
        text-decoration : none;
    }
    .no-drag{
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
`;