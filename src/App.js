import React, { Component } from 'react';
import ToolBar from './components/ToolBar/ToolBar';
import SubToolBar from './components/SubToolBar/SubToolBar'
import './App.css';
import AllBooks from './components/AllBooks/AllBooks';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Route, Switch, withRouter } from 'react-router-dom';
import firebase from './components/firebase/firebase.app';

class App extends Component {


  state = {
    isLoggedin: false,
    userName: "",
  }

  setUser = (userObject) => {
    this.setState({
      isLoggedin: true,
      userName: userObject.name,
      userId: userObject.userId
    })
  }


  componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user);
          if (user) {
            this.setState({ user });
            let  userObj = {
                name: user.displayName,
                userId: user.uid
            }
            this.setUser(userObj);
            localStorage.setItem('user', user.uid);
            this.props.history.push("/");
          } else {
            this.setState({ user: null });
            localStorage.removeItem('user');
          }
        });
    }

  render() {
    return (
      <div className="App">
          <ToolBar 
          isLoggedin={this.state.isLoggedin}
          userName={this.state.userName}
          isLoggedin={this.state.isLoggedin} />
          <SubToolBar></SubToolBar>

          <Switch>
              <Route
              path="/login"
              component={Login}></Route>
              <Route
               path="/signup"
              component={Signup}></Route>
              <Route path="/" component={AllBooks}></Route>
          </Switch>
          
      </div>
    );
  }
 
}

export default withRouter(App);
