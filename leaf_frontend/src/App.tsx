import React from 'react';
import './App.css';
import Login from "./components/login/Login";
import Receipt from './components/receipt/Receipt';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {withStyles} from "@material-ui/core/styles";

const useStyles = (theme: any) => ({
  bar: {
    backgroundColor: '#059475',
  },
});

export interface AppState {
  isLogged: boolean;
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: false
    };
  }

  handleLogin = (isLogged: boolean) => {
    this.setState({ isLogged: isLogged })
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
          <Login updateStateLogin={this.handleLogin}/>}
          {this.state.isLogged &&
          <Receipt/>}
        </div>
    );
  }
}

// @ts-ignore
export default withStyles(useStyles)(App)
