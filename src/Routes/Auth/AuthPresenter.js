import styled from  "styled-components";
import Input from "../../Components/Input"
import Button from "../../Components/Button"

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
    i.fa-question-circle{
        color : ${props => props.theme.lightGrayColor}
    }
`

const InputValid = () => {
    return (
        <ValidIcon className="far">
            <i className="far"></i>
        </ValidIcon>
    )
}

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
    // passwordLogin,
    usernameJoin,
    emailJoin,
    // passwordJoin,
    nameJoin
}) => (
    <Wrapper>
        <Form>
            <FormHeader className="no-drag">
                Instagram
            </FormHeader>
            {action === "login"
                ? (
                    <form onSubmit={onSubmit}>
                        <Input placeholder="email" value="" required={true} {...emailLogin} type="email"></Input>            
                        {/* <Input placeholder="password" value="" required={true} {...passwordLogin} type="password"></Input> */}
                        <Button text="Login"/>
                    </form>
                ) : (
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
                        {/* <InputBar>
                            <Input placeholder="password" value="" required={true} {...passwordJoin} type="password" minlength="10"></Input>
                            <InputValid></InputValid>
                        </InputBar> */}
                        <Button text="Sign up"/>
                    </form>
                )
            }       
        </Form>
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
    </Wrapper>
)