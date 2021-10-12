import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "pages/Login";
import Registration from "pages/Registration";
import ToDo from "pages/ToDo";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/todo" component={ToDo} />
      </Switch>
    </Router>
  );
};

export default Routes;
