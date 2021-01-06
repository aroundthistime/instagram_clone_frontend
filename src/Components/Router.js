import PropTypes from "prop-types";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => <><Route exact={true} path="/" component={Feed}></Route></>

const LoggedOutRoutes = () => <><Route exact={true} path="/" component={Auth}></Route></>

const AppRouter = ({isLoggedIn}) => (
    <Router>
        <Switch>
            {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
        </Switch>
    </Router>
)

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default AppRouter;