import React from 'react';
import './cardlist.css'

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
                        <li>
                        <div className='front'>{card.front}</div>
                        <div className='back'>
                            {card.back} 
                            <button onClick={() => {this.deletecard(card.id)}}>X</button>
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
        nocards: state.user.nocards
    }
}

const mapDispatchToProps = dispatch => ({
  deletecard: id => dispatch(deletecard(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(CardList);