import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import firebase from 'firebase';


import Firebaselogin from './components/firebaselogin'

import { cardrefresh } from './actions/userActions';

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
  componentDidMount(){
    this.props.cardrefresh()
  }

  openmenu = () => {
    this.setState({menuopen: true})
  }
  openlogin = () => {
    this.setState({loginopen: true})
  }
  opennewcard = () => {
    const user = firebase.auth().currentUser;
    if (user !=null){
    this.setState({newcardopen: true})
    }
  }
  signout = () => {
    firebase.auth().signOut();
 
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
          <RaisedButton label="signout" onClick={this.signout}  />
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
        userid: state.user.userid,
        cardlist: state.user
    };
}

const mapDispatchToProps = dispatch => ({
  cardrefresh: () => dispatch(cardrefresh())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
