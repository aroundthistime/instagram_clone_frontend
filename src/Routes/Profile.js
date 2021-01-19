import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Loader from "../Components/Loader";
import { PostGridContainer, PostItem } from "../Components/PostGrid/PostGrid";

const GET_USER = gql`
    query getUser($username : String!){
        getUser(username : $username){
            id
            username
            name
            avatar
            status
            isFollowing
            isMe
            followingsCount
            followersCount
            postsCount
            posts {
                id
                files{
                    url
                }
                commentsCount
                likesCount
            }
        }
    }
`

const Wrapper = styled.div`
    width : 100%;
    min-height : 70vh;
    position : relative;
`

const UserHeader = styled.div`
    display : flex;
    align-items : center;
    border-bottom : 1px solid #e6e6e6;
    padding  : 10px 70px 35px 70px;
`

const UserInfos = styled.section`
    margin-left : 100px;
`

const UsernameText = styled.h2`
    font-size : 28px;
    font-family: 'Quicksand', sans-serif;
    margin-bottom : 25px;
    margin-right : 25px;
`
const EditProfileBtn = styled.button`
    width : 90px;
    height : 30px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #FAFAFA;
    outline : none;
    border : 2px solid #e6e6e6;
    border-radius : 5px;
    font-weight : 600;
    cursor : pointer;
`


const UserCount = styled.li`
    font-family: 'Quicksand', sans-serif;
    &:not(last-child){
        margin-right : 35px;
    }
    .count-number{
        font-weight : 600;
    }
`

const Name = styled.p`
    margin-top : 25px;
    font-weight : 600;
`

const UserStatus = styled.p`
    font-family: 'Quicksand', sans-serif;
    margin-top : 5px;
`

const NoResult = styled.div`
    font-size : 20px;
    display : flex;
    width : 100%;
    height : 70vh;
    justify-content : center;
    align-items : center;
`


export default withRouter(({match : {params : {username}}}) => {
    const {data, loading} = useQuery(GET_USER, {
        variables : {
            username
        }
    })
    const user = data && data.getUser ? data.getUser : null;
    
    return (
        <Wrapper>
            {loading && (<Loader></Loader>)}
            {!loading && user && (
                <>
                    <UserHeader>
                        <Avatar src={user.avatar} size={150}/>
                        <UserInfos>
                            <div style={{display : "flex"}}>
                                <UsernameText>{username}</UsernameText>
                                {user.isMe && <EditProfileBtn>Edit Profile</EditProfileBtn>}
                            </div>
                            <ul style={{display : "flex"}}>
                                <UserCount>
                                    <span className="count-number">{user.postsCount}</span> post
                                </UserCount>
                                <UserCount>
                                    <span className="count-number">{user.followersCount}</span> followers
                                </UserCount>
                                <UserCount>
                                    <span className="count-number">{user.followingsCount}</span> following
                                </UserCount>
                            </ul>
                            <Name>{user.name}</Name>
                            {user.status && (
                                <UserStatus>{user.status}</UserStatus>
                            )}
                        </UserInfos>
                    </UserHeader>
                    {user.posts.length > 0 ? (
                        <PostGridContainer>
                            {user.posts.slice(0).reverse().map((post, index) => {
                                const thumbnail = post.files[0].url;
                                return <PostItem
                                    thumbnail={thumbnail}
                                    isMyPost={true}
                                    commentsCount={post.commentsCount}
                                    likesCount={post.likesCount}
                                    key={index}
                                />
                            })}
                        </PostGridContainer>
                    ) : (
                        <p>1</p>
                    )}
                </>
            )}
            {!loading && !user && (
                <NoResult>Couldn't find user : {username}</NoResult>
            )}
        </Wrapper> 
    )
})