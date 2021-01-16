import styled from "styled-components";
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
`;

const File = styled.img`
    max-width : 100%;
    height : 100%;
    position : absolute;
    top : 0;
    left : 0;
    object-fit : cover;
    opacity : ${props => props.showing ? 1 : 0}
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



export default ({
    id,
    location,
    caption,
    user,
    files,
    likeCounts,
    isLiked,
    toggleLike,
    comments,
    commentCounts,
    createdAt,
    newComment,
    currentItem,
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
            {files && files.map((file, index) => <File id={file.id} key={file.id} src={file.url} className="no-drag" showing={index === currentItem}/>)}
            {files.length > 1 && (
                <>
                    <Slider isLeft={true} refItem={left} />
                    <Slider isLeft={false} refItem={right} />
                </>
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