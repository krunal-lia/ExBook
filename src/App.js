import React, { Component } from 'react';
import ToolBar from './components/ToolBar/ToolBar';
import SubToolBar from './components/SubToolBar/SubToolBar'
import './App.css';
import BookStack from './components/BookStack/BookStack';

class App extends Component {


  state = {
    isLoggedin: false,
    userName: "Krunal",
  }

  render() {
    return (
      <div className="App">
          <ToolBar 
          userName={this.state.userName}
          isLoggedin={this.state.isLoggedin} />
          <SubToolBar></SubToolBar>
          <BookStack books={[4,5,6]} heading="latest"/>
          <BookStack books={[1,2,3]}heading="retro"/>
          <BookStack books={[3,6,4]} heading="best deals"/>
          <BookStack books={[2,5,1]} heading="latest"/>
      </div>
    );
  }
 
}

export default App;
