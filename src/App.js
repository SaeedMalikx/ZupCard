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
import CardsIcon from 'material-ui/svg-icons/image/grid-on';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
              <Link to="/"><ActionHome style={style.small} color={grey50} /></Link>
              <span className="filler"/>
              <h2>ZAPCARD </h2>
              <span className="filler"/>
              <Link to="/cards"><CardsIcon color={red500} style={style.small} /></Link>
              <Addbox style={style.small} onClick={this.opennewcard} color={blue500} />
              <SettingIcon style={style.small} color={grey50} onClick={this.opensettings}/>
          </div>

          <Dialog modal={false} open={this.state.opensettings} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                <Settings/>
          </Dialog>


          <Dialog modal={false} open={this.state.newcardopen} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                  <NewCard closeloginform={this.closecard}/>
          </Dialog>

          
          <div className="addbutton">
            <FloatingActionButton onClick={this.opennewcard} >
              <ContentAdd />
            </FloatingActionButton>
          </div>
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
  cardrefresh: () => dispatch(cardrefresh())
});


const style = {
  small: {
    width: 35,
    height: 35,
    padding: 10,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
