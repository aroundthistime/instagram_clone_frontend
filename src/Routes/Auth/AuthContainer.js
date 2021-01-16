import {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import useInputCheckingValid from "../../Hooks/useInputCheckingValid";
import {  validateEmail} from "./AuthInputValidators";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CHECK_USERNAME, CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN } from "./AuthQueries";
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
    const usernameJoin = useInputCheckingValid("", validateUsername);
    const emailJoin = useInputCheckingValid("", validateEmail);
    const nameJoin = useInputCheckingValid("");
    const secretKey = useInput("");
    const [requestSecret] = useMutation(LOG_IN, {
        variables : {email : emailLogin.value},
        update : (_, {data}) => {
            const {requestSecret} = data;
            if (requestSecret){
                toast.success("We have sent a secret key to your email, please check");
                setAction("confirm");
            } else{
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
            if (createAccount){
                toast.success("We have sent a secret key to your email, please check");
                setAction("confirm");
            } else {
                toast.error("The email is already being used");
            }
        }
    })
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables : {
            secret : secretKey.value,
            email : emailLogin.value
        }
    });
    const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
    const onSubmit = async(event) => {
        event.preventDefault();
        if (action === "login"){
            if (validateEmail(emailLogin.value)){
                try{
                    await requestSecret();
                } catch{
                    toast.error("Couldn't request secret key, try again")
                }
            } else {
                toast.error("Please type a valid email address")
            }
        } else if (action ==="signUp") {
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
        } else { //confirm
            if (secretKey.value !== ""){
                const {
                    data : {confirmSecret : token}
                } = await confirmSecretMutation();
                if (token !== "" && token !== undefined){
                    localLogInMutation({variables : {token}})
                } else{
                    toast.error("Please check your secret key")
                }
            }
            
        }
    }
    return (
        <AuthPresenter
            setAction={setAction}
            action={action}
            onSubmit={onSubmit}
            emailLogin={emailLogin}
            usernameJoin={usernameJoin}
            emailJoin={emailJoin}
            nameJoin={nameJoin}
            secretKey={secretKey}
            requestSecret={requestSecret}
        />
    )
}