import styled from "styled-components";

const Footer = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    min-height : 10vh;
    opacity : 0.5;
`
export default () => (
    <Footer className="no-drag">© created by aroundthistime</Footer>
)