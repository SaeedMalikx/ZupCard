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
          <MenuItem value={"front yellow"} primaryText="yellow" onClick={this.setcardcolor} />
          <MenuItem value={"front blue"} primaryText="blue" onClick={this.setcardcolor}/>
          <MenuItem value={"front orange"} primaryText="orange" />
          <MenuItem value={"front purple"} primaryText="purple" />
          <MenuItem value={"front green"} primaryText="green" />
        </SelectField>
        <SelectField
          floatingLabelText="BackColor"
          value={this.state.backvalue}
          onChange={this.handleChangeback}
        >
          <MenuItem value={"back yellow"} primaryText="yellow" onClick={this.setcardcolor}/>
          <MenuItem value={"back blue"} primaryText="blue" onClick={this.setcardcolor}/>
          <MenuItem value={"back orange"} primaryText="orange" onClick={this.setcardcolor}/>
          <MenuItem value={"back purple"} primaryText="purple" />
          <MenuItem value={"back green"} primaryText="green" />
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