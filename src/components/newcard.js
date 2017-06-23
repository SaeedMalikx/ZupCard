import React from 'react';

import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import { addcard } from '../actions/userActions';

class Newcard extends React.Component {
    constructor(props) {
     super(props);
 
     this.state = {
       Front: "",
       Back: "",
       userid: this.props.useruid
     }
   }

   
  setfront = (front) => {
      this.setState({Front: front.target.value})
  }

  setbackside = (back) => {
      this.setState({Back: back.target.value})
  }

  addcardlocal = () => {
      const newcard = {
        front: this.state.Front,
        back: this.state.Back,
        userid: this.state.userid
      }
      this.props.addcard(newcard)
  }

  render() {
    return (
      <div>
        <div>
            <TextField hintText="FRONT" fullWidth={true} onChange={this.setfront} />
            <TextField hintText="BACK" fullWidth={true} onChange={this.setbackside}/>
            <RaisedButton label="Add Card" primary={true} fullWidth={true} onClick={this.addcardlocal} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        useruid: state.user.userid
    };
}

const mapDispatchToProps = dispatch => ({
    addcard: newcard => dispatch(addcard(newcard)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Newcard);