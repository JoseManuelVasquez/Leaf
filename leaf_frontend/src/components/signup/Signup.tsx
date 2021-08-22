import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../copyright/Copyright';
import SignupPresenter, {ISignupPresenter} from "./SignupPresenter";

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

export interface SignupProps {
    updateStateSignup: Function;
    updateSnackbar: Function;
}

export interface SignupState {
    username: string;
    password: string;
}

export interface ISignup {
    onSignUp(): void;
    onError(): void;
}

class Signup extends React.Component<SignupProps, SignupState> implements ISignup{

    presenter: ISignupPresenter;

    constructor(props: SignupProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.presenter = new SignupPresenter(this);
    }

    /**
     * --- START View methods ---
     */
    handleSubmit(event: any): any {
        this.presenter.signUp(this.state.username, this.state.password);
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
    onSignUp(): void {
        this.props.updateSnackbar("User successfully created!", false);
        this.props.updateStateSignup(false);
    }

    onError(): void {
        this.props.updateSnackbar("Something happened!", true);
    }
    /**
     * --- END Called by Presenter ---
     */

    render() {
        const {classes}: any = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign Up
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
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
export default withStyles(useStyles)(Signup)