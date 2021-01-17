import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types"
import TextareaAutosize from "react-autosize-textarea";
import { formatDate } from "../../utils";
import Avatar from "../Avatar";
import { HeartEmpty, HeartFull, SpeechBubble } from "../Icons";
import Username from "../Username";

const Box = styled.div`
    ${props => props.theme.whiteBox}
`;

const Post = styled(Box)`
    width : 100%;
    max-width : 600px;
    margin-bottom : 25px;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
`

const PostHeader = styled.div`
    padding : 15px;
    background-color : white;
    display : flex;
    align-items : center;
`

const HeaderColumn = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    &:nth-child(1){
        margin-right : 11px;
    }
`

const LocationText = styled.p`
    opacity : 0.5;
    font-size : 13px;
    cursor : pointer;
`

const Files = styled.div`
    position : relative;
    padding-top : 100%;
    overflow : hidden;
    width : 100%;
    height : 100%;
`;

const slideRightToCenter = keyframes`
    from{
        transform : translateX(100%);
    }
    to{
        transform : none;
    }
`

const slideCenterToLeft = keyframes`
    from{
        transform : translateX(-100%);
    }
    to{
        transform : translateX(-200%);
    }

`

const slideLeftToCenter = keyframes`
    from{
        transform : translateX(-100%);
    }
    to{
        transform : none;
    }
`

const slideCenterToRight = keyframes`
    from{
        transform : translateX(-100%);
    }
    to{
        transform : none;
    }
`


const slideStyles = (isCurrent, isPrev, direction, firstLoaded) => {
    if (isCurrent){
        if (!firstLoaded){
            if (direction === "left"){
                return css`animation : ${slideLeftToCenter} 0.3s ease-out;`
            } else{
                return css`animation : ${slideRightToCenter} 0.3s ease-out;`
            }    
        } else{
            return css`animation : none;`
        }
    } else if (isPrev){
        if (direction === "left"){
            return css`animation : ${slideCenterToRight} 0.3s ease-out;`
        } else {
            return css`animation : ${slideCenterToLeft} 0.3s ease-out;`
        }
    } else{
        return css`animation : none;`
    }
}

const File = styled.img`
    position : absolute;
    top : 0;
    left : 100%;
    
    &.current{
        left : 0;
    }
    width : 100%;
    height : 100%;
    object-fit : cover;
    ${props => slideStyles(props.isCurrent, props.isPrev, props.direction, props.firstLoaded)}
`

const SliderContainer = styled.button`
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
    width : 25px;
    height : 25px;
    opacity : 0.5;
    background-color : white;
    color : gray;
    border-radius : 50%;
    border : none;
    top : 50%;
    cursor : pointer; 
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;    &.left{
        left : 20px;
    }
    &.right{
        right : 20px;
    }
    &.disabled{
        display : none;
    }
    &:focus{
        outline : none;
        border : none;
    }
`
const Slider = ({isLeft, refItem}) => 
    <SliderContainer className={isLeft ? "left disabled" : "right"} ref={refItem}>
        {isLeft ?
            (<i className="fas fa-chevron-left"></i>) :
            (<i className="fas fa-chevron-right"></i>)
        }
    </SliderContainer>

const heartPopupAnimation = keyframes`
    0%{
        transform : none;
    }
    10%{
        transform : scale(1.8);
    }
    11%{
        transform : scale(1.7);
    }
    90%{
        transform : scale(1.7);
    }
    100%{
        transform : scale(0.1);
    }
`

const HeartPopup = styled.div`
    position : absolute;
    top : 50%;
    left : 50%;
    margin-top : -25px;
    margin-left : -25px;
    opacity : 0.8;
    animation : ${heartPopupAnimation} 1.5s linear;
`

const PostInfos = styled.div`
    padding : 10px 15px;
    max-width : 100%;
`
const Button = styled.span`
    cursor : pointer;
`

const Buttons = styled.div`
    display : flex;
    margin-bottom : 10px;
    ${Button} {
        &:first-child{
            margin-right : 20px;
        }
    }
`

const PostContent = styled.div`
    display : flex;
    p{
        margin-right : 5px;
    }
    margin-bottom : 15px;
`
const PostComment = styled.div`
    display : flex;
    p{
        margin-right : 5px;
    }
    margin-bottom : 5px;
`

const ContentText = styled.div`
    font-size : 14px;
    font-family: 'Quicksand', sans-serif;
    max-width : 100%;
    word-break:break-all;
`

const CommentCountsText = styled.p`
    font-size : 14px;
    opacity : 0.5;
    margin-bottom : 10px;
    cursor : pointer;
`

const PostTimestamp = styled.p`
    font-size : 12px;
    opacity : 0.65;
    font-family: 'Quicksand', sans-serif;
    margin-bottom : 10px;
`

const NewComment = styled.div`
    display : flex;
    align-items : center;
    border-top : ${props => props.theme.boxBorder};
`

const InputContainer = styled(TextareaAutosize)`
    border : none;
    padding : 20px 15px;
    width : 250%;
    outline : none;
    font-size : 15px;
    resize: none;
    &::placeholder{
        opacity : 0.6;
    }
    &:focus{
        outline : none;
    }
`;

const InputBtn = styled.button`
    border : none;
    outline : none;
    cursor : pointer;
    height : 20px;
    font-weight : 600;
    color : ${props => props.theme.blueColor};
    background : none;
    &.disabled{
        opacity : 0.4;
    }
`

const CommentInput = ({
    placeholder,
    required=true,
    value,
    onChange,
    type="text",
    maxlength=524288,
    className
}) => (
    <InputContainer
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        type={type}    
        maxLength={maxlength}
        className={className}
    />
)

CommentInput.propTypes = {
    placeholder : PropTypes.string.isRequired,
    required : PropTypes.bool.isRequired,
    value : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    type : PropTypes.string,
    classname : PropTypes.string
}

const checkIsPrev = (index, current, direction) => {
    if (direction === "right"){
        return index === current - 1
    } else if (direction === "left"){
        return index === current + 1
    } else{
        return false;
    }
}

const getFileClassName= (isCurrent, isPrev) => {
    if (isCurrent) {
        return "no-drag current"
    } else if (isPrev){
        return "no-drag prev"
    } else{
        return "no-drag"
    }
}

export default ({
    id,
    location,
    caption,
    user,
    files,
    likeCounts,
    isLiked,
    toggleLike,
    pressLike,
    justPressedLike,
    comments,
    commentCounts,
    createdAt,
    newComment,
    currentItem,
    direction,
    left,
    right
}) => (
    <Post>
        <PostHeader>
            <HeaderColumn>
                <Avatar src={user.avatar} size={30}/>
            </HeaderColumn>
            <HeaderColumn>
                <Username username={user.username}></Username>
                <LocationText>{location}</LocationText>
            </HeaderColumn>
        </PostHeader>
        <Files>
            {files && files.map((file, index) => {
                const isCurrent = currentItem === index;
                const isPrev = checkIsPrev(index, currentItem, direction)
                return (
                        <File
                            id={file.id}
                            key={file.id} 
                            src={file.url}
                            isCurrent={isCurrent}
                            isPrev={isPrev}
                            className={getFileClassName(isCurrent, isPrev)}
                            direction={direction}
                            firstLoaded={!direction}
                            onDoubleClick={pressLike}
                />)
            })}
            {files.length > 1 && (
                <>
                    <Slider isLeft={true} refItem={left} />
                    <Slider isLeft={false} refItem={right} />
                </>
            )}
            {isLiked && justPressedLike && (
                <HeartPopup>
                    <HeartFull size={50} fill={"white"}/>
                </HeartPopup>
            )}
        </Files>
        <PostInfos>
            <Buttons>
                <Button onClick={toggleLike}>
                    {isLiked ? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button>
                    <SpeechBubble></SpeechBubble>
                </Button>
            </Buttons>
            <PostContent>
                <Username username={user.username}></Username>
                <ContentText>{caption}</ContentText>
            </PostContent>
            {comments.length > 1 && (
            <CommentCountsText>{`View all ${commentCounts} comments`}</CommentCountsText>
            )}
            {comments.length > 0 && (
                <PostComment>
                    <Username username={comments[comments.length - 1].user.username}></Username>
                    <ContentText>{comments[comments.length - 1].text}</ContentText>
                </PostComment>
            )}
            <PostTimestamp>{formatDate(createdAt)}</PostTimestamp>
        </PostInfos>
        <form>
            <NewComment>
                <CommentInput {...newComment} placeholder="Add a comment..." required={true}></CommentInput>
                <InputBtn className="disabled">POST</InputBtn>
            </NewComment>
        </form>
        
        
    </Post>
)