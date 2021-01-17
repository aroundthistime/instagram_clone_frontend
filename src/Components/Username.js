import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";


const UsernameText = styled.p`
    font-weight : 600;
    font-size : 14px;
    margin-bottom : 5px;
    cursor : pointer;
    color : black;
`
const Username = ({username}) => (
    <Link to={`/${username}`}>
        <UsernameText className="no-drag">{username}</UsernameText>
    </Link>
)


export default Username;