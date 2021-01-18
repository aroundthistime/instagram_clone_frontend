import {useEffect, useRef, useState} from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import { ADD_COMMENT } from "../Components/Post/PostQueries";

const valueValidator = (value) => {
    if (value !== ""){
        return true;
    }
    return false;
}

export default(postId) => {
    const [state, setState] = useState({
        value : "",
        newComments : [],
        submitLoading : false,
        placeholder : "Add a comment..."
    });
    const submitBtn = useRef();
    const onChange = async(event) => {
        const {
            target : {value}
        } = event;
        if (state.submitLoading){
            return
        }
        setState({
            value,
            newComments : state.newComments,
            submitLoading : state.submitLoading,
            placeholder : state.placeholder
        });
        if (submitBtn.current){
            if (valueValidator(value)){
                submitBtn.current.classList.remove("disabled");
            } else{
                submitBtn.current.classList.add("disabled");
            }
            
        }
    }
    const [addCommentMutation] =  useMutation(ADD_COMMENT, {
        variables : {
            postId,
            text : state.value,
        }
    });
    const submitComment = async(event) => {
        if (event){
            event.preventDefault()
        }
        setState({
            value : "",
            newComments : state.newComments,
            submitLoading : true,
            placeholder : ""
        })
        if (submitBtn.current){
            submitBtn.current.classList.add("disabled");
        }
        try{
            const {
                data : {
                    addComment : newComment
                }
            } = await addCommentMutation();
            state.newComments.push(newComment)
            setState({
                value : "",
                newComments : state.newComments,
                submitLoading : false,
                placeholder : state.placeholder
            })
        } catch{
            localStorage.setItem("error", "The post no longer exists");
            window.location.reload();
        }

    }

    const onKeyPress = (event) => {
        const { key } = event;
        if (key === "Enter" && (!submitBtn.current || !submitBtn.current.classList.contains("disabled"))){
            event.preventDefault();
            submitComment();
        }
    }
    useEffect(() => {
        if (submitBtn.current){
            submitBtn.current.addEventListener("click", submitComment);
        }
        return () => {
            if (submitBtn.current){
                submitBtn.current.removeEventListener("click", submitComment);
            }
        }
    })
    return {value : state.value, placeholder : state.placeholder,onChange, onKeyPress, submitBtn, newComments : state.newComments, submitLoading : state.submitLoading};
}