import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "contexts/auth.context";
import { useContext } from "react";

import Login from "pages/Login";
import Registration from "pages/Registration";
import ToDo from "pages/ToDo";
import SingleToDo from "pages/ToDo/SingleToDo";

interface IPrivateRoute {
  [key: string]: any;
}

const PrivateRoute = ({ ...rest }: IPrivateRoute) => {
  const { authState } = useContext(AuthContext);

  if (authState.id == "") {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
};

const Routes = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <PrivateRoute exact path="/todo" component={ToDo} />
        <PrivateRoute exact path="/todo/:id" component={SingleToDo} />
        <Route
          path="*"
          exact={true}
          component={() => <h1>404 Not Found!</h1>}
        />
      </Switch>
    </AuthProvider>
  </Router>
);

export default Routes;
