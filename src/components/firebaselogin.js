import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';

import './firebaselogin.css'

import { signin, signup } from '../actions/userActions';


class firebaselogin extends React.Component {
  constructor(props) {
     super(props);
 
     this.state = {
       email: "",
       password: ""
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
  


  render() {

        return (
            <div className="logincenter">
                <TextField
                    hintText="Email"
                    style={{width: '100%'}}
                    onChange={this.setuser}
                /><br />
                <TextField
                    hintText="Password"
                    style={{width: '100%'}}
                    onChange={this.setpass}
                /><br />
                <RaisedButton 
                    label="Signin" 
                    primary={true} 
                    onClick={this.signinuser} 
                    style={{width: '100%'}}
                />
                <h2>or Enter Email/Password Above and  Instantly Sign Up </h2>
                <RaisedButton 
                    label="Signup" 
                    secondary={true} 
                    onClick={this.createuser} 
                    style={{width: '100%'}}
                /><br/>
            </div>            
        )
    }
}



const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = dispatch => ({
    signin: user => dispatch(signin(user)),
    signup: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(firebaselogin);