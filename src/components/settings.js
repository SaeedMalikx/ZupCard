import React from 'react';
import './settings.css'

import {connect} from 'react-redux';

import { setcardcolor, getcardcolor } from '../actions/userActions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Settings extends React.Component {
  constructor(props) {
     super(props);
 
     this.state = {
       frontvalue: "front yellow",
       backvalue: "back yellow"
     };
   }

  handleChange = (event, index, value) => this.setState({frontvalue: value});

  handleChangeback = (event, index, value) => this.setState({backvalue: value});

  


  setcardcolor = () => {
      const colorvalue = {
          frontvalue: this.state.frontvalue,
          backvalue: this.state.backvalue
      }
      this.props.setcardcolor(colorvalue)
      this.props.getcardcolor()
    
  }
  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="FrontColor"
          value={this.state.frontvalue}
          onChange={this.handleChange}
        >
          <MenuItem value={"front yellow"} primaryText="Yellow" onClick={this.setcardcolor} />
          <MenuItem value={"front blue"} primaryText="Blue" onClick={this.setcardcolor}/>
          <MenuItem value={"front orange"} primaryText="Orange" onClick={this.setcardcolor} />
          <MenuItem value={"front purple"} primaryText="Purple" onClick={this.setcardcolor}/>
          <MenuItem value={"front green"} primaryText="Green" onClick={this.setcardcolor} />
          <MenuItem value={"front darkred"} primaryText="Dark Red" onClick={this.setcardcolor} />
          <MenuItem value={"front bluelagoon"} primaryText="Blue Lagoon" onClick={this.setcardcolor} />
          <MenuItem value={"front honeydew"} primaryText="Honey Dew" onClick={this.setcardcolor} />
          <MenuItem value={"front rosepink"} primaryText="Rose Pink" onClick={this.setcardcolor} />
          <MenuItem value={"front cottoncandy"} primaryText="Cottoncandy" onClick={this.setcardcolor} />
          <MenuItem value={"front grey"} primaryText="Light Grey" onClick={this.setcardcolor} />
          <MenuItem value={"front steelblue"} primaryText="Steel Blue" onClick={this.setcardcolor} />
          <MenuItem value={"front sherbat"} primaryText="Sherbet" onClick={this.setcardcolor} />
          <MenuItem value={"front chocolate"} primaryText="Chocolate" onClick={this.setcardcolor} />
        </SelectField>
        <SelectField
          floatingLabelText="BackColor"
          value={this.state.backvalue}
          onChange={this.handleChangeback}
        >
          <MenuItem value={"back yellow"} primaryText="Yellow" onClick={this.setcardcolor}/>
          <MenuItem value={"back blue"} primaryText="Blue" onClick={this.setcardcolor}/>
          <MenuItem value={"back orange"} primaryText="Orange" onClick={this.setcardcolor}/>
          <MenuItem value={"back purple"} primaryText="Purple" onClick={this.setcardcolor}/>
          <MenuItem value={"back green"} primaryText="Green" onClick={this.setcardcolor}/>
          <MenuItem value={"back darkred"} primaryText="Darkred" onClick={this.setcardcolor} />
          <MenuItem value={"back bluelagoon"} primaryText="Blue Lagoon" onClick={this.setcardcolor} />
          <MenuItem value={"back honeydew"} primaryText="Honey Dew" onClick={this.setcardcolor} />
          <MenuItem value={"back rosepink"} primaryText="Rose Pink" onClick={this.setcardcolor} />
          <MenuItem value={"back cottoncandy"} primaryText="Cottoncandy" onClick={this.setcardcolor} />
          <MenuItem value={"back grey"} primaryText="Light Grey" onClick={this.setcardcolor} />
          <MenuItem value={"back steelblue"} primaryText="Steel Blue" onClick={this.setcardcolor} />
          <MenuItem value={"back sherbat"} primaryText="Sherbet" onClick={this.setcardcolor} />
          <MenuItem value={"back chocolate"} primaryText="Chocolate" onClick={this.setcardcolor} />
        </SelectField>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        frontcolor: state.user.frontcardcolor,
        backcolor: state.user.backcardcolor

    }
}

const mapDispatchToProps = dispatch => ({
    setcardcolor: colorvalue => dispatch(setcardcolor(colorvalue)),
    getcardcolor: () => dispatch(getcardcolor())
})


export default connect(mapStateToProps, mapDispatchToProps)(Settings);