import React from 'react';
import './settings.css'

import {connect} from 'react-redux';



class Settings extends React.Component {

  
  render() {
    return (
      <div>
       Settings
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Settings);