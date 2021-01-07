import {gql} from "apollo-boost";

export const LOG_IN = gql`
    mutation requestSecret($email : String!){
        requestSecret(email : $email)
    }
`

export const CHECK_USERNAME = gql`
    query checkUsernameValid($username : String!){
        checkUsernameValid(username : $username)
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount($username : String!, $email : String!, $name : String!){
        createAccount(username : $username, email : $email , name : $name)
    }
`