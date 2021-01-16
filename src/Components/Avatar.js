import styled from "styled-components";
import PropTypes from "prop-types";

const DEFAULT_PROFILE = "https://instastatistics.com/images/default_avatar.jpg";

const IconImg = styled.img`
    border-radius : 50%;
    cursor : pointer;
`

const Avatar = ({src=DEFAULT_PROFILE, size}) => (
    <IconImg src={src} width={`${size}px`} height={`${size}px`}></IconImg>
)

Avatar.propTypes = {
    src : PropTypes.string.isRequired,
    width : PropTypes.number.isRequired
}

export default Avatar;