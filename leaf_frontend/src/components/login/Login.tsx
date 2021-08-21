import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../copyright/Copyright';
import LoginPresenter, {ILoginPresenter} from "./LoginPresenter";

/**
 *  In line style
 */
const useStyles = (theme: any) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#059475',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    text: {
        color: '#059475',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#059475',
    },
});

export interface LoginProps {
    updateStateLogin: Function;
}

export interface LoginState {
    username: string;
    password: string;
}

export interface Ilogin {
    onSignIn(): any;
}

class Login extends React.Component<LoginProps, LoginState> implements Ilogin{

    presenter: ILoginPresenter;

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.presenter = new LoginPresenter(this);
    }

    /**
     * --- START View methods ---
     */
    handleSubmit(event: any): any {
        this.presenter.signIn(this.state.username, this.state.password);
        event.preventDefault();
    }

    handleUsername(event: any): any {
        this.setState({username: event.target.value});
    }

    handlePassword(event: any): any {
        this.setState({password: event.target.value});
    }
    /**
     * --- END View methods ---
     */

    /**
     * --- START Called by Presenter ---
     */
    onSignIn() {
        this.props.updateStateLogin(true);
    }
    /**
     * --- END Called by Presenter ---
     */

    render() {
        const {classes}: any = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            onChange={this.handleUsername}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            onChange={this.handlePassword}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link className={classes.text} href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link className={classes.text} href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

// @ts-ignore
export default withStyles(useStyles)(Login)