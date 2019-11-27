import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import MoneyIcon from '@material-ui/icons/Money';
import GroupIcon from '@material-ui/icons/Group';
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, logout, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Рабочий стол',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Отчеты',
      href: '/report', 
      icon: <InsertChartIcon />
    },
    {
      title: 'Финансы',
      href: '/finance',
      icon: <MoneyIcon />
    },
    {
      title: 'Финансы бухгалтер',
      href: '/financebuh',
      icon: <MoneyIcon />
    },
    {
      title: 'Машинный мониторинг',
      href: '/monitoringcar',
      icon: <DeviceHubIcon />
    },
    {
      title: 'Персонал',
      href: '/users',
      icon: <GroupIcon />
    },
    {
      title: 'Аккаунт',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Настройки',
      href: '/settings',
      icon: <SettingsIcon />
    },
    {
      title: 'Выйти',
      href: '/sign-in',
      onClick: logout,
      icon: <LockOpenIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
