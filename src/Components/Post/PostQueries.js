import { gql } from "apollo-boost";

export const ADD_COMMENT_QUERY = gql`
    mutation addComment($text : String!, $postId : String!){
        addComment(text : $text, postId : $postId){
            username
            text
        }
    }
`