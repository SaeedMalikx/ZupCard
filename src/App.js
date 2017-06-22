import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';


import Firebaselogin from './components/firebaselogin'



import Menuicon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


import CardList from './components/cardlist';
import NewCard from './components/newcard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuopen: false,
      loginopen: false,
      newcardopen: false,
      settingsopen: false

    };
  }

  openmenu = () => {
    this.setState({menuopen: true})
  }
  openlogin = () => {
    this.setState({loginopen: true})
  }
  opennewcard = () => {
    this.setState({newcardopen: true})
  }

  opensettings = () => {
    this.setState({settingsopen: true})
  }
  closelogin = () => {
    this.setState({loginopen: false, menuopen: false, newcardopen: false, settingsopen: false})
  }
  render() {

    return (
      <div className="App">
        <div className="navbar">
          <Menuicon onTouchTap={this.openmenu} />
          <Drawer open={this.state.menuopen} docked={false} onRequestChange={(menuopen) => this.setState({menuopen})}>
              <MenuItem >Categories</MenuItem>
          </Drawer>
          <span className="filler"/>
          <h3>Category</h3>
          <span className="filler"/>
          <RaisedButton label="New Card" onClick={this.opennewcard}  />
          <RaisedButton label="Login" onClick={this.openlogin}  />
        </div>

        <Dialog modal={false} open={this.state.loginopen} onRequestClose={this.closelogin} autoDetectWindowHeight={true}>
                <Firebaselogin closeloginform={this.closelogin}/>
        </Dialog>

        <Dialog modal={false} open={this.state.newcardopen} onRequestClose={this.closelogin} autoDetectWindowHeight={true}>
                <NewCard closeloginform={this.closelogin}/>
        </Dialog>

        <CardList/>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        userid: state.user.userid
    };
}

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(App);
