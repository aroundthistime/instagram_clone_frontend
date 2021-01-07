import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import AppRouter from "./Router";
import Footer from "./Footer";
import "../fonts.css"


const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const { data : {isLoggedIn} } = useQuery(QUERY);
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
      <Footer></Footer>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}></ToastContainer>
    </>
  );
}

export default App;
