import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import GlobalStyles from "../Styles/GlobalStyles";
import AppRouter from "./Router";

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
    </>
  );
}

export default App;
