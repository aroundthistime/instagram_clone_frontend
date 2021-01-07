import {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import useInputCheckingValid from "../../Hooks/useInputCheckingValid";
import {  validateEmail} from "./AuthInputValidators";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CHECK_USERNAME, CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";


const VALID_INPUT_CLASSNAME = "valid";

export default () => {
    const {fetchMore} = useQuery(CHECK_USERNAME, {variables : {username : ""}});
    const validateUsername = async(username) => {
        if (username.length < 4){
            return false;
        }
        const {data} = await fetchMore({
            variables : {
                username
            },
            updateQuery(){

            }
        });
        return data.checkUsernameValid;
    }
    const [action ,setAction] = useState("login");
    const emailLogin = useInput("");
    // const passwordLogin = useInput("");
    const usernameJoin = useInputCheckingValid("", validateUsername);
    const emailJoin = useInputCheckingValid("", validateEmail);
    // const passwordJoin = useInputCheckingValid("", checkPasswordMinimumLength);
    const nameJoin = useInputCheckingValid("");
    const [requestSecret] = useMutation(LOG_IN, {
        variables : {email : emailLogin.value},
        update : (_, {data}) => {
            const {requestSecret} = data;
            if (!requestSecret){
                toast.error("Please check your email address")
            }
        }
    });
    const [createAccount] = useMutation(CREATE_ACCOUNT, {
        variables : {
            username : usernameJoin.value,
            name : nameJoin.value,
            email : emailJoin.value
        },
        update : (_, {data}) => {
            const {createAccount} = data;
            if (!createAccount){
                toast.error("The email is already being used");
            }
        }
    })
    const onSubmit = (event) => {
        event.preventDefault();
        if (action === "login"){
            if (validateEmail(emailLogin.value)){
                requestSecret();
            } else {
                toast.error("Please type a valid email address")
            }
        } else {
            const [email, name, username] = event.target.querySelectorAll("input");
            if (!email.classList.contains(VALID_INPUT_CLASSNAME)){
                toast.error("Please type a valid email address");
            } else if (!username.classList.contains(VALID_INPUT_CLASSNAME)){
                if (username.value.length < 4){
                    toast.error("Username should have at least 4 characters");
                } else{
                    toast.error("The username is being used");
                }
            } else {
                createAccount();
            }
        }
    }
    return (
        <AuthPresenter
            setAction={setAction}
            action={action}
            onSubmit={onSubmit}
            emailLogin={emailLogin}
            // passwordLogin={passwordLogin}
            usernameJoin={usernameJoin}
            emailJoin={emailJoin}
            // passwordJoin={passwordJoin}
            nameJoin={nameJoin}
        />
    )
}