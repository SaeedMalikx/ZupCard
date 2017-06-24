import React from 'react';
import './cardlist.css'
import Delete from 'material-ui/svg-icons/action/delete';

import {connect} from 'react-redux';

import { deletecard } from '../actions/userActions';


class CardList extends React.Component {

  

  deletecard = (id) => {
    this.props.deletecard(id)
  }  
  
  render() {
    return (
      <div>
        <div className="cardcontainer">
            {this.props.cardlist.map((card, index) =>
                <div key={index}>
                      <ul >
                        <li className={this.props.cardsize}>
                        <div className={this.props.frontcolor}>{card.front}</div>
                        <div className={this.props.backcolor}>
                            {card.back} 
                            <Delete className="deletebutton" onClick={() => {this.deletecard(card.id)}}>X</Delete>
                        </div>        
                        </li>      
                    </ul>
                </div>
            )}
            <p>{this.props.nocards}</p>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        cardlist: state.user.cardlist,
        nocards: state.user.nocards,
        frontcolor: state.user.frontcardcolor,
        backcolor: state.user.backcardcolor,
        cardsize: state.user.size
    }
}

const mapDispatchToProps = dispatch => ({
  deletecard: id => dispatch(deletecard(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(CardList);