import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, logout, login, ...rest } = props;
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <Layout logout={logout}>
            <Component {...matchProps} login={login}/>
          </Layout>
        )}}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
