import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStore } from '../../store';
import API from '../../api/api';
import Copyright from '../Copyright';

class SignUp extends React.Component {
  constructor(props) {
    const defaults = {
      email: '', firstName: '', lastName: '', password: '', password2: ''
    };

    super(props);
    this.state = { user: defaults, formErrors: { } };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, formErrors } = this.state;
    const { history, store } = this.props;

    Object.keys(user).forEach((field) => this.validateField(field));
    const hasErrors = Object.values(formErrors).filter((e) => e).length;

    if (!user || hasErrors) return;
    API.post('auth/register', user)
      .then(({ data }) => {
        this.setState({ error: null });
        store.set('user', data.user);
        localStorage.setItem('token', data.token);
        history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleChange(event) {
    const { user } = this.state;
    const name = event.target.id;
    const { value } = event.target;
    user[name] = value;
    this.setState({ user }, () => { this.validateField(name, value); });
  }

  validateField(fieldName) {
    const { formErrors, user } = this.state;
    const value = user[fieldName];
    let valid;

    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = valid ? '' : 'Email is invalid';
        break;
      case 'firstName':
      case 'lastName':
        valid = !!value;
        formErrors[fieldName] = valid ? '' : 'Please fill this field';
        break;
      case 'password':
        valid = value.length >= 6;
        formErrors.password = valid ? '' : 'Password is too short';
        break;
      case 'password2':
        valid = value === user.password;
        formErrors.password2 = valid ? '' : 'Password doesn\'t match';
        break;
      default:
        break;
    }
    this.setState({ formErrors });
  }

  // eslint-disable-next-line class-methods-use-this
  errorClass(error) {
    return (error ? 'is-invalid' : '');
  }

  render() {
    const { user, formErrors, error } = this.state;
    console.log(user);
    console.log(formErrors);
    console.log(error);
    const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              { error && (
                <div className="alert alert-danger">
                  Some error occurred
                </div>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={this.handleChange}
                    value={user.firstName}
                    error={formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={this.handleChange}
                    value={user.lastName}
                    error={formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                    value={user.email}
                    error={formErrors.email}
                    helperText={formErrors.email}
                  />

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={this.handleChange}
                    value={user.password}
                    error={formErrors.password}
                    helperText={formErrors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="comfirm password"
                    label="Comfirm Password"
                    type="password"
                    id="password2"
                    autoComplete="new-password"
                    onChange={this.handleChange}
                    value={user.password2}
                    error={formErrors.password2}
                    helperText={formErrors.password2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign_in" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}

SignUp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
export default withStore(SignUp);
