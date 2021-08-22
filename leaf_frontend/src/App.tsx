import React from 'react';
import './App.css';
import Login from "./components/login/Login";
import Receipt from './components/receipt/Receipt';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {withStyles} from "@material-ui/core/styles";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = (theme: any) => ({
  bar: {
    backgroundColor: '#059475',
  },
});

export interface AppState {
  isLogged: boolean;
  success: boolean;
  successMessage: string;
  error: boolean;
  errorMessage: string;
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: false,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: ''
    };

    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
  }

  handleLogin = (isLogged: boolean) => {
    this.setState({ isLogged: isLogged });
  };

  handleSnackbar = (message: string, isError: boolean) => {
    if (isError) {
      this.setState({
        errorMessage: message,
        error: true
      })
    } else {
      this.setState({
        successMessage: message,
        success: true
      })
    }
  };

  handleCloseSuccess(event: any) {
    this.setState({success: false});
  }

  handleCloseError(event: any) {
    this.setState({error: false});
  }

  render() {
    const {classes}: any = this.props;
    return (
        <div className="App">
          <AppBar position="static">
            <Toolbar className={classes.bar}>
              <Typography variant="h6" noWrap>
                Leaf
              </Typography>
            </Toolbar>
          </AppBar>

          {!this.state.isLogged &&
          <Login updateSnackbar={this.handleSnackbar} updateStateLogin={this.handleLogin}/>}
          {this.state.isLogged &&
          <Receipt updateSnackbar={this.handleSnackbar}/>}

          <Snackbar open={this.state.success} autoHideDuration={10000} onClose={this.handleCloseSuccess}>
            <MuiAlert onClose={this.handleCloseSuccess} severity="success">
              {this.state.successMessage}
            </MuiAlert>
          </Snackbar>
          <Snackbar open={this.state.error} autoHideDuration={10000} onClose={this.handleCloseError}>
            <MuiAlert onClose={this.handleCloseError} severity="error">
              {this.state.errorMessage}
            </MuiAlert>
          </Snackbar>
        </div>
    );
  }
}

// @ts-ignore
export default withStyles(useStyles)(App)
