import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId : String!, $liked : Boolean!){
        toggleLike(postId : $postId, liked : $liked)
    }
`

export const PRESS_LIKE = gql`
    mutation pressLike($postId : String!){
        pressLike(postId : $postId)
    }
`

export const ADD_COMMENT = gql`
    mutation addComment($text : String!, $postId : String!){
        addComment(text : $text, postId : $postId){
            user{
                username
            }
            text
            id
        }
    }
`