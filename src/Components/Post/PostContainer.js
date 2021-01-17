import { useState } from "react";
import PropTypes from "prop-types"
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { ADD_COMMENT, PRESS_LIKE, TOGGLE_LIKE } from "./PostQueries";
import { useSlide } from "../../Hooks/useSlide";

let likeClickedCount = 0;

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
    const [justPressedLike, setJustPressedLike] = useState(false);
    const comment = useInput("");
    const {
        slideObj : {currentItem, direction},
        left,
        right
    } = useSlide(files.length - 1);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables : {
            postId : id,
            liked : likeClickedCount % 2 ? isLiked : !isLiked
        }
    });
    const [pressLikeMutation] = useMutation(PRESS_LIKE, {
        variables : {
            postId : id,
        }
    })
    const addCommentMutation = useMutation(ADD_COMMENT, {
        variables : {
            postId : id,
            text : comment.value,
        }
    })
    const pressLike = async(event) => {
        if (justPressedLike){
            return;
        }
        setJustPressedLike(true);
        setTimeout(() => {
            setJustPressedLike(false);
        }, 1500)
        if (isLiked){
            if (likeClickedCount % 2 !== 0){
                likeClickedCount += 1
            }
        } else{
            if (likeClickedCount % 2 === 0){
                likeClickedCount += 1
            }
        }
        pressLikeMutation();
        setIsLiked(true);
    }
    const toggleLike = async(event) => {
        // if (isLikedState){
        //     setLikeCounts(likeCountsState - 1)
        // } else{
        //     setLikeCounts(likeCountsState + 1);
        // }
        likeClickedCount += 1;
        toggleLikeMutation();
        setIsLiked(!isLikedState);
        console.log(isLiked, likeClickedCount, likeClickedCount % 2 ? !isLiked : isLiked)
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
    justPressedLike={justPressedLike}
    pressLike={pressLike}
    comments={comments}
    commentCounts={commentCounts}
    createdAt={createdAt}
    newComment={comment}
    currentItem={currentItem}
    direction={direction}
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