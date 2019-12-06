import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Link,
  Typography,
  Card
} from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';

const schema = {
  login: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 50,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  cardLogin: {
    maxWidth: 600,
    width: '100%',
    margin: 'auto',
    marginTop: '50px'
  },
  cloudAlpha: {
    textAlign: 'center',
    marginTop: '65px',
    marginBottom: '30px'
  },
  iconCloud: {
    fontSize: 34,
    verticalAlign: 'bottom',
    color: '#3f51b5'
  },
  logoText: {
    margin: 'auto',
    textAlign: 'center'
  },
  alphaText: {
    fontSize: 36
  },
  imgLogo: {
    width: '140px'
  }
}));

const SignIn = props => {
  const { history, login } = props;
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const usr = {
    login: 'admin',
    password: 'alphatoursecret',
  };
  const handleSignIn = event => {
    if (formState.values.login === usr.login && formState.values.password === usr.password) {
      event.preventDefault();
      login();
      history.push('/');
    }
    event.preventDefault();
    
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <div className={classes.logoText}>
          <img
            className={classes.imgLogo}
            alt="Logo"
            src="/images/avatars/alphatour.png"
          />
        </div>
        <Card className={classes.cardLogin}>
          <form className={classes.form} onSubmit={handleSignIn}>
            <div className={classes.cloudAlpha}>
              <Typography className={classes.title} variant="h2">
                <CloudIcon className={classes.iconCloud} /> Альфа-Тур
              </Typography>
            </div>
            <TextField
              className={classes.textField}
              error={hasError('login')}
              fullWidth
              helperText={
                hasError('login') ? formState.errors.login[0] : null
              }
              label="Логин"
              name="login"
              onChange={handleChange}
              type="text"
              value={formState.values.login || ''}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              label="Пароль"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
              variant="outlined"
            />
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={!formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              ВОЙТИ
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
