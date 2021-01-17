import styled from "styled-components";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    min-height : 70vh;
`
const FEED_QUERY = gql`
    {
        getFeed{
            id
            location
            caption
            user{
                avatar
                id
                username
            }
            files{
                id
                url
            }
            likeCounts
            isLiked
            commentCounts
            comments{
                id
                text
                user{
                    id
                    username
                }
            }
            createdAt
        }
    }
`


export default () => {
    const {data, loading} = useQuery(FEED_QUERY);
    return (
        <Wrapper>
            {loading && <Loader />}
            {!loading && data && data.getFeed &&
                data.getFeed.map(post => <Post
                    key={post.id}
                    id={post.id}
                    location={post.location}
                    caption={post.caption}
                    user={post.user}
                    files={post.files}
                    likeCounts={post.likeCounts}
                    isLiked={post.isLiked}
                    comments={post.comments}
                    commentCounts={post.commentCounts}
                    createdAt={post.createdAt}
                    ></Post>)
            }
        </Wrapper>
    )
}