import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import firebase from 'firebase';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom'


import Firebaselogin from './components/firebaselogin'


import { cardrefresh, getfontcolor } from './actions/userActions';

import SettingIcon from 'material-ui/svg-icons/action/settings';
import Addbox from 'material-ui/svg-icons/content/add-box';
import CardsIcon from 'material-ui/svg-icons/image/grid-on';
import Dialog from 'material-ui/Dialog';
import {grey50, red500, blue500} from 'material-ui/styles/colors';


import CardList from './components/cardlist';
import NewCard from './components/newcard';
import Settings from './components/settings';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newcardopen: false,
      opensettings: false

    };
  }
  componentDidMount(){
    this.props.cardrefresh()
    this.props.getfontcolor()
  }

  opensettings = () => {
    this.setState({opensettings: true})
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
    this.setState({opensettings: false, newcardopen: false})
  }


  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
              <span className="filler"/>
              <NavLink activeClassName="selected" to="/"><span className="title">ZAPCARD </span></NavLink>
              <span className="filler"/>
              <Link to="/cards"><CardsIcon color={red500} style={style.small} /></Link>
              <Addbox style={style.small} onClick={this.opennewcard} color={blue500} />
              <SettingIcon style={style.small} color={grey50} onClick={this.opensettings}/>
              <span onClick={this.signout}>signout</span>
          </div>

          <Dialog modal={false} open={this.state.opensettings} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                <Settings/>
          </Dialog>


          <Dialog modal={false} open={this.state.newcardopen} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                  <NewCard closeloginform={this.closecard}/>
          </Dialog>
          
          <Route exact path={"/"} component={() => <Firebaselogin/>}/>
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
  cardrefresh: () => dispatch(cardrefresh()),
  getfontcolor: () => dispatch(getfontcolor())
});


const style = {
  small: {
    width: 35,
    height: 35,
    padding: 10,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
