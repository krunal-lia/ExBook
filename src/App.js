import React, { Component } from 'react';
import ToolBar from './components/ToolBar/ToolBar';
import SubToolBar from './components/SubToolBar/SubToolBar'
import './App.css';
import AllBooks from './components/AllBooks/AllBooks';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Route, Switch, withRouter } from 'react-router-dom';
import firebase, { database } from './components/firebase/firebase.app';
import Spinner from './components/UI/Spinner/Spinner';
import Sell from './components/Sell/Sell';

class App extends Component {


  state = {
    isLoggedin: false,
    userName: "",
    loading: true,
    books: [
  
    ]
   // bookLoading: true
  }

  setUser = (userObject) => {
    this.setState({
      loading: false,
      isLoggedin: true,
      userName: userObject.name,
      userId: userObject.userId
    })
  }


  componentDidMount() {
      this.authListener();
      // database.ref(`books`).once("value", snapshot => {

      //   if(snapshot.val()) {
      //     this.setState({
      //       books: snapshot.val(),
      //       bookLoading: false
      //     })
      //   }
      // });
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
          this.setState({ user: null, loading: false });
          localStorage.removeItem('user');
        }
      });
  }

  render() {

    if(this.state.loading) return <Spinner/>;
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
              {/* <Route
              path="/books"
              component={AllBooks}></Route> */}
              <Route
               path="/signup"
              component={Signup}></Route>
              <Route
               path="/sell"
              component={this.state.isLoggedin ? Sell : Login}></Route>
              <Route path="/" 
              render={ (props) => this.state.bookLoading ? <Spinner/> : <AllBooks {...props}/>}></Route>
          </Switch>
          
      </div>
    );
  }
 
}

export default withRouter(App);
