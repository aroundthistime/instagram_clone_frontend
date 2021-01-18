import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import {ToastContainer, toast} from "react-toastify";
import { HashRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Routes from "./Router";
import Footer from "./Footer";
import "../fonts.css"
import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const { data : {isLoggedIn} } = useQuery(QUERY);
  if (localStorage.getItem("error")){
    const errorMessage = localStorage.getItem("error");
    toast.error(errorMessage);
    localStorage.removeItem("error");
  }
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Router>
        {isLoggedIn && <Header></Header>}
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn}></Routes>
          <Footer></Footer>
        </Wrapper> 
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}></ToastContainer>
    </>
  );
}

export default App;
