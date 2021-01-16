import { useState } from "react";
import PropTypes from "prop-types"
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { ADD_COMMENT_QUERY } from "./PostQueries";
import { useSlide } from "../../Hooks/useSlide";

const PostContainer = ({
    id,
    location="",
    caption,
    user,
    files,
    likeCounts,
    isLiked,
    comments,
    commentCounts,
    createdAt
}) => {
    const [isLikedState, setIsLiked] = useState(isLiked);
    const [likeCountsState, setLikeCounts] = useState(likeCounts);
    const {currentItem, left, right} = useSlide(files.length - 1);
    const comment = useInput("");
    const toggleLike = (event) => {
        if (isLikedState){
            setLikeCounts(likeCountsState + 1)
        } else{
            setLikeCounts(likeCountsState - 1);
        }
        setIsLiked(!isLikedState);
    }
    // const [addComment] = useMutation(ADD_COMMENT_QUERY, {
    //     variables : {
    //         text : comment.value,
    //         postId : id
    //     },
    //     update : (_. {data}) => {
    //         const {addComment} = data;
    //     }
    // });
    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(addComment);
    // }
    return (<PostPresenter
    id={id}
    location={location}
    caption={caption}
    user={user}
    files={files}
    likeCounts={likeCountsState}
    setLikeCounts={setLikeCounts}
    isLiked={isLikedState}
    setIsLiked={setIsLiked}
    toggleLike={toggleLike}
    comments={comments}
    commentCounts={commentCounts}
    createdAt={createdAt}
    newComment={comment}
    currentItem={currentItem}
    left={left}
    right={right}
    />)}

PostContainer.propTypes = {
    id : PropTypes.string.isRequired,
    location : PropTypes.string,
    caption : PropTypes.string.isRequired,
    user : PropTypes.shape({
        id : PropTypes.string.isRequired,
        avatar : PropTypes.string.isRequired,
        username : PropTypes.string.isRequired
    }).isRequired,
    files : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.string.isRequired,
        url : PropTypes.string.isRequired
    })).isRequired,
    likeCounts : PropTypes.number.isRequired,
    isLiked : PropTypes.bool.isRequired,
    comments : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.string.isRequired,
        text : PropTypes.string.isRequired,
        user : PropTypes.shape({
            id : PropTypes.string.isRequired,
            username : PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    commentCounts : PropTypes.number.isRequired,
    createdAt :  PropTypes.string,
}

export default PostContainer;