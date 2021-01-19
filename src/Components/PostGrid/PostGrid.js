import styled from "styled-components"
import Proptypes from "prop-types";
import { HeartFull, SpeechBubbleFull } from "../Icons";

const PostDiv = styled.div`
    position : relative;
    width : 250px;
    height : 250px;
    cursor : pointer;
    transition : 0.1s linear;
    &:hover{
        transform : scale(1.1);
    }
`

const PostThumbnail = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
`

const Overlay = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background-color : rgba(0, 0, 0, 0.3);
    opacity : 0;
    &:hover{
        opacity : 1;
    }
`

const PostPreviewInfo = styled.div`
    display : flex;
    align-items : center;
    font-size : 16px;
    color : #fafafa;
    &:first-child{
        margin-right : 20px;
    }
    svg{
        margin-right : 5px;
    }
`


export const PostItem = ({thumbnail, isMyPost=false, likesCount, commentsCount}) => {
    if (isMyPost){
        return (
            <PostDiv>
                <PostThumbnail src={thumbnail}></PostThumbnail>
                <Overlay>
                    <PostPreviewInfo>
                        <HeartFull fill="#f0f0f0" size={20}/>
                        <span>{likesCount}</span>
                    </PostPreviewInfo>
                    <PostPreviewInfo>
                        <SpeechBubbleFull size={20}/>
                        <span>{commentsCount}</span>
                    </PostPreviewInfo>
                </Overlay>
            </PostDiv>
        )
    } else{
        return <PostDiv>
            <PostThumbnail src={thumbnail}></PostThumbnail>
        </PostDiv>
    }
};

PostItem.proptypes = {
    thumbnail : Proptypes.string.isRequired,
    isMyPost : Proptypes.bool,
    likeCounts : Proptypes.number,
    commentCounts : Proptypes.number
}


export const PostGridContainer = styled.ul`
    width : 100%;
    padding : 25px;
    display : grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: min-content;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
`