import { Link, withRouter } from "react-router-dom"
import queryString from "query-string";
import styled from "styled-components";
import { SEARCH_BY_LOCATION, SEARCH_BY_TAG, SEARCH_USER } from "./SearchQueries";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import { useState } from "react";
import UserSearchResult from "./SearchResults/UserSearchResult";
import { PostGridContainer, PostItem } from "../../Components/PostGrid/PostGrid";

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    position : relative;
    align-items : center;
    min-height : 70vh;
`
const SearchTerm = styled.h2`
    width : 100%;
    height : 60px;
    padding-bottom : 10px;
    display : flex;
    align-items : center;
    font-size : 25px;
    padding-left : 10px;
`

const SearchTabs = styled.ul`
    display : flex;
    height : 50px;
    width : 100%;
    margin-top : 10px;
    // border-bottom : 2px solid #ede6e6;
`

const SearchTab = styled.li`
    background-color : #f5f0f0;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    padding-bottom : 5px;
    &.selected{
        padding-bottom : 0px;
        border-bottom : 5px solid #e0dcdc;
    }
    &:first-child{
        border-top-left-radius : 15px;
    }
    &:last-child{
        border-top-right-radius : 15px;
    }
    // &:not(last-child){
    //     margin-right : 1px;
    // }
`
const SearchResultUser = styled.ul`
    width : 100%;
    padding : 25px;
    display : grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-auto-rows: min-content;
    grid-column-gap: 60px;
    grid-row-gap: 30px;
`



const NoResult = styled.div`
    display : flex;
    align-items : center;
    jutify-content : center;
    background-color : white;
    font-size : 20px;
    height : 20vh;
`

const SELECTED_CLASS = "selected";

export default withRouter(({history, location : {search}}) => {
    const searchTerm = queryString.parse(search)["term"];
    let searchModeDefault = queryString.parse(search)["mode"];
    if (searchModeDefault !== "location" && searchModeDefault !== "tag"){
        searchModeDefault = 'user';
    }
    const [searchMode, setSearchMode] = useState(searchModeDefault);
    if (searchTerm === undefined){
        history.push("/");
        return <></>
    }
    let query;
    if (searchMode === "location"){
        query = SEARCH_BY_LOCATION;
    } else if (searchMode === "tag"){
        query = SEARCH_BY_TAG;
    } else{
        query = SEARCH_USER;
    }
    const userTabClick = (event) => {
        setSearchMode("user")
    }
    const locationTabClick = (event) => {
        setSearchMode("location")
    }
    const tagTabClick = (event) => {
        setSearchMode("tag")
    }
    const {data, loading} = useQuery(query, {
        variables : {
            term : searchTerm
        }
    });
    return (
        <Wrapper>
            <SearchTerm>
                Searched By {searchTerm}
            </SearchTerm>
            <SearchTabs>
                {searchMode === "user" ? (
                    <SearchTab onClick={userTabClick} className={`${SELECTED_CLASS} no-drag`}>User</SearchTab>
                ) : (
                    <SearchTab onClick={userTabClick} className="no-drag">User</SearchTab>
                )}
                {searchMode === "location" ? (
                    <SearchTab onClick={locationTabClick} className={`${SELECTED_CLASS} no-drag`}>Location</SearchTab>
                ) : (
                    <SearchTab onClick={locationTabClick} className="no-drag">Location</SearchTab>
                )}
                {searchMode === "tag" ? (
                    <SearchTab onClick={tagTabClick} className={`${SELECTED_CLASS} no-drag`}>Hashtag</SearchTab>
                ) : (
                    <SearchTab onClick={tagTabClick} className="no-drag">Hashtag</SearchTab>
                )}
            </SearchTabs>
            {loading && <Loader />}
            {!loading && searchMode === "user" && (
                <SearchResultUser>
                    {data
                        && data.searchUser
                        && data.searchUser.map((user, index) => (
                            <Link to={`/${user.username}`} key={index}>
                                <UserSearchResult
                                    id={user.id}
                                    username={user.username}
                                    name={user.name}
                                    avatar={user.avatar}
                                    isFollowing={user.isFollowing}
                                />
                            </Link>
                    ))}
                </SearchResultUser>
            )}
            {!loading && searchMode !== "user" && (
                <PostGridContainer>
                    {searchMode === "location"
                        && data
                        && data.searchByLocation
                        && data.searchByLocation.map((post, index) => {
                            const thumbnail = post.files[0].url
                            return (<PostItem
                                key={index}
                                thumbnail={thumbnail}
                                isMyPost={post.user.isMe}
                                likesCount={post.likesCount}
                                commentsCount={post.commentsCount}
                            />)
                    })}
                    {searchMode === "tag"
                        && data
                        && data.searchByTag
                        && data.searchByTag.map((post, index) => {
                            const thumbnail = post.files[0].url
                            return (<PostItem
                                key={index}
                                thumbnail={thumbnail}
                                isMyPost={post.user.isMe}
                                likesCount={post.likesCount}
                                commentsCount={post.commentsCount}
                            />)
                        })
                    }
                </PostGridContainer>
            )}
            {!loading && data && (
                (!data.searchByTag || data.searchByTag.length === 0)
                && (!data.searchByLocation || data.searchByLocation.length === 0)
                && (!data.searchUser || data.searchUser.length === 0)
            ) && (<NoResult>No results</NoResult>)}
        </Wrapper>
    )
})