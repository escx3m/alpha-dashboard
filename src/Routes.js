import React from 'react';
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';
import {
  Switch,
  Redirect,
  Route,
  useHistory,
  useLocation
} from 'react-router-dom';
import {
  Dashboard as DashboardView,
  MonitoringCar as MonitoringCarView,
  UserList as UserListView,
  Finance as FinanceView,
  FinanceBuh as FinanceBuhView,
  Report as ReportView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  Sms as SmsView,
} from './views';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };
  const logout = () => {
    fakeAuth.signout(() => {
      history.push("/");
    });

  };
  return (
    <Switch>
      <PrivateRoute path="/dashboard">
        <RouteWithLayout
          component={DashboardView}
          exact
          logout={logout}
          layout={MainLayout}
          path="/dashboard"
        />
      </PrivateRoute>
      <Route path="/sign-in">
        <RouteWithLayout
          login={login}
          logout={logout}
          component={SignInView}
          exact
          layout={MainLayout}
          path="/sign-in"
        />
      </Route>
      <PrivateRoute path="/users">
        <RouteWithLayout
          component={UserListView}
          logout={logout}
          exact
          layout={MainLayout}
          path="/users"
        />
      </PrivateRoute>
      <PrivateRoute path="/monitoringcar">
        <RouteWithLayout
          component={MonitoringCarView}
          logout={logout}
          exact
          layout={MainLayout}
          path="/monitoringcar"
        />
      </PrivateRoute>
      <PrivateRoute path="/sms">
        <RouteWithLayout
          component={SmsView}
          logout={logout}
          exact
          layout={MainLayout}
          path="/sms"
        />
      </PrivateRoute>
      <PrivateRoute path="/finance">
        <RouteWithLayout
          logout={logout}
          component={FinanceView}
          exact
          layout={MainLayout}
          path="/finance"
        />
      </PrivateRoute>
      <PrivateRoute path="/financebuh">
        <RouteWithLayout
          logout={logout}
          component={FinanceBuhView}
          exact
          layout={MainLayout}
          path="/financebuh"
        />
        </PrivateRoute>
      <PrivateRoute path="/report">
        <RouteWithLayout
          logout={logout}
          component={ReportView}
          exact
          layout={MainLayout}
          path="/report"
        />
      </PrivateRoute>
      <PrivateRoute path="/account">
        <RouteWithLayout
          logout={logout}
          component={AccountView}
          exact
          layout={MainLayout}
          path="/account"
        />
      </PrivateRoute>
      <PrivateRoute path="/settings">
        <RouteWithLayout
          logout={logout}
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
      </PrivateRoute>
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default Routes;
