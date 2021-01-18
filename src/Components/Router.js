import PropTypes from "prop-types";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../Routes/Auth/index";
import Feed from "../Routes/Feed";
import Profile from "../Routes/Profile";
import Explore from "../Routes/Explore"
import Search from "../Routes/Search/index"

const LoggedInRoutes = () => (
    <Switch>
        <Route exact={true} path="/" component={Feed}></Route>
        <Route path="/explore" component={Explore}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/:username" component={Profile}></Route>
    </Switch>
)

const LoggedOutRoutes = () => <Switch><Route exact={true} path="/" component={Auth}></Route></Switch>

const AppRoutes = ({isLoggedIn}) => (
    <Switch>
        {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </Switch>
)

AppRoutes.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default AppRoutes;