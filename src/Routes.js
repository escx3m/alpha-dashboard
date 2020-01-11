import React, { createContext } from 'react';
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';
import Api from './api';

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
  FinanceBuh as FinanceBuhView,
  Report as ReportView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  Sms as SmsView
} from './views';

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');

const api = new Api({ token, refreshToken });
export const ApiContext = createContext({});

const fakeAuth = {
  isAuthenticated: token ? true : false,
  async authenticate(loginRequest, cb) {
    await api.login(loginRequest);
    fakeAuth.isAuthenticated = true;
    cb();
  },
  async signout(cb) {
    await api.logout();
    fakeAuth.isAuthenticated = false;
    cb();
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
  let login = (login, password) => {
    const loginRequest = {
      login,
      password
    };
    fakeAuth.authenticate(loginRequest, () => {
      history.replace(from);
    });
  };
  const logout = () => {
    fakeAuth.signout(() => {
      history.push('/');
    });
  };
  return (
    <ApiContext.Provider value={{ api }}>
      <Switch>
        <PrivateRoute path="/dashboard">
          <RouteWithLayout
            component={DashboardView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/dashboard"
          />
        </PrivateRoute>
        <Route path="/sign-in">
          <RouteWithLayout
            component={SignInView}
            exact
            layout={MainLayout}
            login={login}
            logout={logout}
            path="/sign-in"
          />
        </Route>
        <PrivateRoute path="/users">
          <RouteWithLayout
            component={UserListView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/users"
          />
        </PrivateRoute>
        <PrivateRoute path="/monitoringcar">
          <RouteWithLayout
            component={MonitoringCarView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/monitoringcar"
          />
        </PrivateRoute>
        <PrivateRoute path="/sms">
          <RouteWithLayout
            component={SmsView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/sms"
          />
        </PrivateRoute>

        <PrivateRoute path="/financebuh">
          <RouteWithLayout
            component={FinanceBuhView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/financebuh"
          />
        </PrivateRoute>
        <PrivateRoute path="/report">
          <RouteWithLayout
            component={ReportView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/report"
          />
        </PrivateRoute>
        <PrivateRoute path="/account">
          <RouteWithLayout
            component={AccountView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/account"
          />
        </PrivateRoute>
        <PrivateRoute path="/settings">
          <RouteWithLayout
            component={SettingsView}
            exact
            layout={MainLayout}
            logout={logout}
            path="/settings"
          />
        </PrivateRoute>
        <Redirect to="/dashboard" />
      </Switch>
    </ApiContext.Provider>
  );
};

export default Routes;
