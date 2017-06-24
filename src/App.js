import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import firebase from 'firebase';
import { BrowserRouter, Route, Link } from 'react-router-dom'


import Firebaselogin from './components/firebaselogin'


import { cardrefresh } from './actions/userActions';

import ActionHome from 'material-ui/svg-icons/action/home';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import Accountbox from 'material-ui/svg-icons/action/account-box';
import Addbox from 'material-ui/svg-icons/content/add-box';
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
      newcardopen: false,
      loginopen: false

    };
  }
  componentDidMount(){
    this.props.cardrefresh()
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

  closecard = () => {
    this.setState({loginopen: false, newcardopen: false})
  }


  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
            <Link to="/"><ActionHome  /></Link>
            <span className="filler"/>
            <h3>ZAPCARD </h3>
            <span className="filler"/>
            <Link to="/cards">Cards</Link>
            <Addbox onClick={this.opennewcard}  />
            <Accountbox onClick={this.openlogin}/>
            <Link to="/settings"><SettingIcon  /></Link>
          </div>

          <Dialog modal={false} open={this.state.loginopen} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                <h3>Current User: {this.props.userid} </h3>
                <RaisedButton label="signout" onClick={this.signout} fullWidth={true} secondary={true}/>
          </Dialog>


          <Dialog modal={false} open={this.state.newcardopen} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                  <NewCard closeloginform={this.closecard}/>
          </Dialog>


          <Route exact path={"/"} component={() => <Firebaselogin/>}/>
          <Route exact path={"/settings"} component={() => <Firebaselogin/>}/>
          <Route exact path={"/cards"} component={() => <CardList/>}/>
        </div>
      </BrowserRouter>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        userid: state.user.userid,
    };
}

const mapDispatchToProps = dispatch => ({
  cardrefresh: () => dispatch(cardrefresh())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
