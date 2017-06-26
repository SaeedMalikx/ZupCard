import React from 'react';

import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import { addcard } from '../actions/userActions';

class Newcard extends React.Component {
    constructor(props) {
     super(props);
 
     this.state = {
       Front: "",
       Back: "",
       frontcolor: "front yellow",
       backcolor: "back yellow",
       userid: this.props.useruid
     }
   }

   
  setfront = (front) => {
      this.setState({Front: front.target.value})
  }

  setbackside = (back) => {
      this.setState({Back: back.target.value})
  }

  handleChange = (event, index, value) => this.setState({frontcolor: value});

  handleChangeback = (event, index, value) => this.setState({backcolor: value});

  addcardlocal = () => {
      const newcard = {
        front: this.state.Front,
        back: this.state.Back,
        userid: this.state.userid,
        frontcolor: this.state.frontcolor,
        backcolor: this.state.backcolor
      }
      this.props.addcard(newcard)
  }

  render() {
    return (
      <div>
        <div>
            <TextField hintText="FRONT" fullWidth={true} onChange={this.setfront} />
            <p>Front Color</p>
            <SelectField
            floatingLabelText="FrontColor"
            value={this.state.frontcolor}
            onChange={this.handleChange}
            >
                <MenuItem value={"front yellow"} primaryText="Yellow"  />
                <MenuItem value={"front blue"} primaryText="Blue" />
                <MenuItem value={"front orange"} primaryText="Orange"  />
                <MenuItem value={"front purple"} primaryText="Purple" />
                <MenuItem value={"front green"} primaryText="Green"  />
                <MenuItem value={"front darkred"} primaryText="Dark Red"  />
                <MenuItem value={"front bluelagoon"} primaryText="Blue Lagoon"  />
                <MenuItem value={"front honeydew"} primaryText="Honey Dew"  />
                <MenuItem value={"front rosepink"} primaryText="Rose Pink"  />
                <MenuItem value={"front cottoncandy"} primaryText="Cottoncandy"  />
                <MenuItem value={"front grey"} primaryText="Light Grey"  />
                <MenuItem value={"front steelblue"} primaryText="Steel Blue"  />
                <MenuItem value={"front sherbat"} primaryText="Sherbet"  />
                <MenuItem value={"front chocolate"} primaryText="Chocolate"  />
            </SelectField>
            <TextField hintText="BACK" fullWidth={true} onChange={this.setbackside}/>
            <SelectField
                floatingLabelText="BackColor"
                value={this.state.backcolor}
                onChange={this.handleChangeback}
            >
                <MenuItem value={"back yellow"} primaryText="Yellow" />
                <MenuItem value={"back blue"} primaryText="Blue" />
                <MenuItem value={"back orange"} primaryText="Orange" />
                <MenuItem value={"back purple"} primaryText="Purple" />
                <MenuItem value={"back green"} primaryText="Green" />
                <MenuItem value={"back darkred"} primaryText="Darkred"  />
                <MenuItem value={"back bluelagoon"} primaryText="Blue Lagoon"  />
                <MenuItem value={"back honeydew"} primaryText="Honey Dew"  />
                <MenuItem value={"back rosepink"} primaryText="Rose Pink"  />
                <MenuItem value={"back cottoncandy"} primaryText="Cottoncandy"  />
                <MenuItem value={"back grey"} primaryText="Light Grey"  />
                <MenuItem value={"back steelblue"} primaryText="Steel Blue"  />
                <MenuItem value={"back sherbat"} primaryText="Sherbet"  />
                <MenuItem value={"back chocolate"} primaryText="Chocolate"  />
            </SelectField>
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