import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

const Animation = keyframes`
    0% {
        opacity : 0.15;
    }
    50% {
        opacity : 0.4;
    }
    100%{
        opacity : 0.15;
    }
`

const Loader = styled.div`
    animation : ${Animation} 1.8s linear infinite;
`;

export default () => (
    <Loader><Logo size="50"></Logo></Loader>
)