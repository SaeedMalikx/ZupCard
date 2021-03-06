import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';

import './firebaselogin.css'

import { signin, signup } from '../actions/userActions';

import SettingIcon from 'material-ui/svg-icons/action/settings';
import Addbox from 'material-ui/svg-icons/content/add-box';
import CardsIcon from 'material-ui/svg-icons/image/grid-on';
import Delete from 'material-ui/svg-icons/action/delete';
import Caticon from 'material-ui/svg-icons/action/bookmark';
import Star from 'material-ui/svg-icons/toggle/star';
import {grey50, red500, blue500, grey900, green500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';


class firebaselogin extends React.Component {
  constructor(props) {
     super(props);
 
     this.state = {
       email: "",
       password: "",
       democardborder: "cardborder"
     };
   }
  setuser = (user) => {
      this.setState({email: user.target.value})
  }

  setpass = (pass) => {
      this.setState({password: pass.target.value})
  }
  createuser = () => {
      const user = {
          email: this.state.email,
          password: this.state.password
      }
      this.props.signup(user)
  }

  signinuser = () => {
      const user = {
          email: this.state.email,
          password: this.state.password
      }
      this.props.signin(user)
  }

  demosetborder = () => {
    if (this.state.democardborder === "cardborder"){
    this.setState({democardborder: "cardborderred"})
    } else if (this.state.democardborder === "cardborderred"){
      this.setState({democardborder: "cardborder"})
    }
  }
  


  render() {
        return ( 
            <div className="logincenter">
                { this.props.isloggedin ? (
                <div>
                    <List>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar />}>
                            Signed In As {this.props.userid}
                        </ListItem>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={red500} backgroundColor={grey900} icon={<CardsIcon />} />}>
                            View Your Cards
                        </ListItem>
                        <ListItem style={style.small}disabled={true} leftAvatar={<Avatar color={blue500} backgroundColor={grey900} icon={<Addbox />} />}>
                            Add a New Card(Customizable Front/Back Color)
                        </ListItem>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={green500} backgroundColor={grey900} icon={<Caticon />} />}>
                            Change Category(Set to Default on Login)
                        </ListItem>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={grey50} backgroundColor={grey900} icon={<SettingIcon />} />}>
                            Settings(Change Card Size and Font Color or Signout)
                        </ListItem>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={red500} backgroundColor={grey900} icon={<Star />} />}>
                            Mark As Important(Sets a Red Border Around The Card)
                        </ListItem>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={red500} backgroundColor={grey900} icon={<Delete />} />}>
                            Delete the Current Card
                        </ListItem>
                    </List>  
                        <Link to="/cards"><button className="button">View Cards</button></Link>       
                </div>
                ) : (<div>
                    <div>  
                        <div className="democardcontainer"> 
                            <ul className="white">
                                <div className="medium">
                                <div className="cardcon">
                                    <div className={this.state.democardborder}>
                                        <div className="front bluelagoon">Create Study Flashcards and access them on any device</div>
                                        <div className="back cottoncandy">
                                            Star to mark as important, Customizable colors and size
                                            <Star className="markbutton" onClick={this.demosetborder}></Star>
                                            <Delete className="deletebutton" ></Delete>
                                        </div>     
                                    </div>   
                                </div> 
                                </div>     
                            </ul>
                        </div>
                    </div>
                    <form >
                        <h3>Email</h3>
                        <input type="text" placeholder="Email" onChange={this.setuser}></input>

                        <h3>Password</h3>
                        <input type="password" placeholder="Password" onChange={this.setpass}></input>

                        <Link to="/"><button className="button" onClick={this.signinuser} >Sign in</button></Link>
                        <h3>Enter Email/Password Above and SignUp Instantly and Login</h3>
                        <Link to="/"><button className="buttonsignup" onClick={this.createuser} >Sign Up</button></Link>
                        
                    </form>
                </div> )}
            </div>
            
        )
    }
}



const mapStateToProps = (state) => {
    return {
        isloggedin: state.user.isloggedin,
        userid: state.user.userid,
    };
}

const mapDispatchToProps = dispatch => ({
    signin: user => dispatch(signin(user)),
    signup: user => dispatch(signup(user))
});

const style = {
  small: {
    color: "white"
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(firebaselogin);

