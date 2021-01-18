import { gql } from "apollo-boost";

export const SEARCH_USER = gql`
    query searchUser($term : String!){
        searchUser(term : $term){
            id
            avatar
            username
            name
            isFollowing
        }
    }
`

export const SEARCH_BY_LOCATION = gql`
    query searchByLocation($term : String!){
        searchByLocation(term : $term){
            id
            files{
                url
            }
        }
    }
`

export const SEARCH_BY_TAG = gql`
    query searchByTag($term : String!){
        searchByTag(term : $term){
            id
            files{
                url
            }
        }
    }
`