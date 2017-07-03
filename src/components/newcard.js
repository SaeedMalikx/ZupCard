import React from 'react';

import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import { addcard } from '../actions/userActions';

class Newcard extends React.Component {
    constructor(props) {
     super(props);
 
     this.state = {
       Front: "",
       Back: "",
       frontcolor: "front bluelagoon",
       backcolor: "back bluelagoon",
       userid: this.props.useruid
     }
   }

  resetstate = () => {
      this.setState({Front: "", Back: ""})
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
      this.resetstate()
      this.props.addcard(newcard)
      this.resetstate()
  }

  render() {
    return (
      <div>
        <div>
            <input type="text" placeholder="Front" onChange={this.setfront} value={this.state.Front}></input>
            <SelectField
            floatingLabelText="Front Color"
            value={this.state.frontcolor}
            onChange={this.handleChange}
            >
                <MenuItem value={"front brightyellow"} primaryText="BrightYellow"  />
                <MenuItem value={"front skyblue"} primaryText="Sky Blue" />
                <MenuItem value={"front orange"} primaryText="Orange"  />
                <MenuItem value={"front coolpurple"} primaryText="Cool Purple" />
                <MenuItem value={"front lightgreen"} primaryText="Light Green"  />
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
            <input type="text" placeholder="Back" onChange={this.setbackside} value={this.state.Back}></input>
            <SelectField
                floatingLabelText="Back Color"
                value={this.state.backcolor}
                onChange={this.handleChangeback}
            >
                <MenuItem value={"back brightyellow"} primaryText="BrightYellow" />
                <MenuItem value={"back skyblue"} primaryText="Sky Blue" />
                <MenuItem value={"back orange"} primaryText="Orange" />
                <MenuItem value={"back coolpurple"} primaryText="Cool Purple" />
                <MenuItem value={"back lightgreen"} primaryText="Light Green" />
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
            <button className="button" onClick={this.addcardlocal} >Add Card</button>
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