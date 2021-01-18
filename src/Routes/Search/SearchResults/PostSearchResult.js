import styled from "styled-components"

const Post = styled.img`
    width : 250px;
    height : 250px;
    object-fit : cover;
    cursor : pointer;
    transition : 0.1s linear;
    &:hover{
        transform : scale(1.1);
    }
`

export default ({thumbnail}) => (
    <Post src={thumbnail}></Post>
);