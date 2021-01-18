import { useState } from "react"
import { useMutation } from "react-apollo-hooks"
import styled from "styled-components"
import Avatar from "../../../Components/Avatar"
import { FOLLOW, UNFOLLOW } from "../../../FollowQueries"

const User = styled.li`
    display : flex;
    align-items : center;
`

const UserInfo = styled.div`
    display : flex;
    margin-left : 15px;
    flex-direction : column;
    justify-content : center;
    color : black;
    font-size : 15px;
    opacity : 0.9;
    margin-right : 15px;
    margin-right : 50px;
`

const Name = styled.p`
    margin-top : 6px;
    opacity : 0.7;
`

const FollowBtn = styled.button`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 65px;
    padding : 4px;
    border: none;
    border-radius : 3px;
    cursor : pointer;
    font-weight : 600;
    background-color : ${props => props.theme.blueColor};
    color : white;
    background : none;
    color :  ${props => props.theme.blueColor};
    outline : none;
`

export default ({id, username, name, avatar, isFollowing}) => {
    const [isFollowingState, setFollowingState] = useState(isFollowing);
    const [isLoading, setIsLoading] = useState(false);
    const [follow] = useMutation(FOLLOW, {
        variables : {
            id
        }
    });
    const [unfollow] = useMutation(UNFOLLOW, {
        variables : {
            id
        }
    })
    const toggleFollowing = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        if (isFollowingState){
            const result = await follow();
            if (result){
                setFollowingState(false);
            }
        } else{
            const result = await unfollow();
            if (result){
                setFollowingState(true);
            }
        }
        setIsLoading(false);
    }
    return (
    <User>
        <Avatar src={avatar} size={60}></Avatar>
        <UserInfo>
            <p>{username}</p>
            <Name>{name}</Name>
        </UserInfo>
        {isLoading && (
            <FollowBtn onClick={(event) => event.preventDefault()}>
                <i class="fas fa-spinner"></i>
            </FollowBtn>
        )}
        {!isLoading && isFollowingState && (
            <FollowBtn className="unfollow" onClick={toggleFollowing}>Unfollow</FollowBtn>
        )}
        {!isLoading && !isFollowingState && (
            <FollowBtn className="follow" onClick={toggleFollowing}>Follow</FollowBtn>
        )}
    </User>
)}