import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import {gql} from "apollo-boost"
import { HeartEmpty, HomeEmpty, PlaneEmpty, } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import Avatar from "./Avatar";


const Header = styled.header`
    width : 100%;
    border : 0;
    position : fixed;
    top : 0;
    left : 0;
    background-color : white;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
    z-index : 2;
`;

const HeaderWrapper = styled.div`
    width : 100%;
    max-width : ${props => props.theme.maxWidth};
    display : flex;
    justify-content : center;
`

const HeaderColumn = styled.div`
    width : 30%;
    text-align : center;
    &::nth-child(2){
        width : 40%;
    }
`
const HeaderLogo = styled.h2`
    color : ${props => props.theme.blackColor};
    font-size : 25px;
    font-family: 'Kaushan Script', cursive;
    text-align : left;
`

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 30px;
    }
`


// const getCurrentLocation = () => {

// }


const MY_PROFILE = gql`
    {
        getMe {
            username
            avatar
        }
    }
`


export default withRouter(({history}) => {
    // let currentLocation;
    // if (window.location.href === "/"){
    //     currentLocation = "home";
    // } else if (window.location.href"/direct")
    const {data} = useQuery(MY_PROFILE);
    const search = useInput("");
    const onSearchSubmit = (event) => {
        event.preventDefault();
        history.push(`/search?term=${search.value}`)
    }
    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <HeaderLogo>
                            Instagram
                        </HeaderLogo>
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput {...search} placeholder="Search"></SearchInput>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/">
                        <HomeEmpty></HomeEmpty>
                    </HeaderLink>
                    <HeaderLink to="/direct">
                        <PlaneEmpty></PlaneEmpty>
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty></HeartEmpty>
                    </HeaderLink>
                    {(data && data.getMe)
                    ? (
                        <HeaderLink to={data.getMe.username}>
                            <Avatar src={data.getMe.avatar} size={24}/>
                        </HeaderLink>
                        
                    ):(
                        <HeaderLink to="/#">
                            <Avatar size={24}/>
                        </HeaderLink>
                    )}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    )
})