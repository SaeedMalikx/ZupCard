import React from 'react';
import './cardlist.css'

import {connect} from 'react-redux';


class CardList extends React.Component {


  render() {
    return (
      <div>
        <div className="cardcontainer">
            
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);