import styled from  "styled-components";
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import useTimer from "../../Hooks/useTimer";

const Wrapper = styled.div`
    min-height : 80vh;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox}
`;

const Form = styled(Box)`
    padding : 20px 40px;
    width : 300px;
    form{
        display : flex;
        flex-direction : column;
        jutify-content : center;
        input {
            width : 100%;
            margin : 3.5px 0px;
        }
        button{
            margin-top : 20px;
            &:hover{
                cursor : pointer;
            }
        }
    }

`
const FormHeader = styled.h1`
    color : ${props => props.theme.blackColor};
    font-size : 40px;
    font-family: 'Kaushan Script', cursive;
    margin-bottom : 28px;
    text-align : center;
`
const InputBar = styled.div`
    position : relative;
`
const ValidIcon = styled.i`
    position : absolute;
    right : -30px;
    top : 11px;
    font-size : 20px;
    i.fa-check-circle{
        color : ${props => props.theme.greenColor}
    }
    i.fa-times-circle{
        color : ${props => props.theme.redColor}
    }
    i.fa-question-circle, i.fa-undo{
        color : ${props => props.theme.lightGrayColor}
    }
    i.fa-undo:hover{
        cursor : pointer;
        color : ${props => props.theme.darkGrayColor}
    }
`

const InputValid = () => {
    return (
        <ValidIcon>
            <i className="far"></i>
        </ValidIcon>
    )
}

const ResendSecret = ({onClick}) => {
    return (
        <ValidIcon  onClick={onClick}>
            <i className="fas fa-undo resend-secret"></i>
        </ValidIcon>
    )
}

const TimeLimit = styled.div`
    position : absolute;
    right : 10px;
    top : 15px;
    font-size : 12px;
    color : ${props => props.theme.redColor}
`

const StateChanger = styled(Box)`
    display : flex;
    justify-content : center;
    align-items : center;
    padding : 17px 0px;
    width : 300px;
    margin-top : 10px;
    font-size : 13px;
`

const Link = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`


export default ({
    action,
    setAction,
    onSubmit,
    emailLogin,
    usernameJoin,
    emailJoin,
    nameJoin,
    secretKey,
    requestSecret
}) => {
    const {element : timer, resetTime} = useTimer(300);
    const resendSecret = async(event) => {
        await requestSecret();
        resetTime();
    }
    return (
    <Wrapper>
        <Form>
            <FormHeader className="no-drag">
                Instagram
            </FormHeader>
            {action === "login" && (
                <form onSubmit={onSubmit}>
                    <Input placeholder="email" value="" required={true} {...emailLogin} type="email"></Input>            
                    <Button text="Login"/>
                </form>
            )}
            {action === "signUp" && (
                    <form onSubmit={onSubmit}>
                        <InputBar>
                            <Input placeholder="email" value="" required={true} {...emailJoin} type="email"></Input>
                            <InputValid></InputValid>
                        </InputBar>
                        <InputBar>
                            <Input placeholder="name" value="" required={true} {...nameJoin}></Input>
                            <InputValid></InputValid>
                        </InputBar>
                        <InputBar>
                            <Input placeholder="username" value="" required={true} {...usernameJoin} maxlength="20"></Input>
                            <InputValid></InputValid>
                        </InputBar>
                        <Button text="Sign up"/>
                    </form>
                )
            }
            {action === "confirm" && (
                <form onSubmit={onSubmit}>
                    <InputBar>
                        <Input placeholder="Paste your secret key" value="" required={true} {...secretKey}></Input>
                        <TimeLimit ref={timer}></TimeLimit>
                        <ResendSecret onClick={resendSecret}></ResendSecret>
                    </InputBar>
                    <Button text="Confirm"/>
                </form>
            )}       
        </Form>
        {action !== "confirm" && (
            <StateChanger>
                {action === "login"
                    ? (
                        <>
                            Don't have an account?&nbsp;&nbsp;
                            <Link onClick={() => setAction("signUp")}>Sign up</Link>
                        </>
                    ) : (
                        <>
                            Do you have an account?&nbsp;&nbsp;
                            <Link onClick={() => setAction("login")}>Login</Link>
                        </>
                    )
                }
            </StateChanger>
        )}
    </Wrapper>
    )}
// )