import React from 'react';
import './cardlist.css'
import Delete from 'material-ui/svg-icons/action/delete';
import Star from 'material-ui/svg-icons/toggle/star';

import {connect} from 'react-redux';

import { deletecard, setborder } from '../actions/userActions';


class CardList extends React.Component {
    constructor(props) {
     super(props);
 
     this.state = {
       border: "cardborder"
     }
   } 

  

  deletecard = (id) => {
    this.props.deletecard(id)
  }  

  setborder = (id) => {
    if (this.state.border === "cardborder"){
    this.setState({border: "cardborderred"}, this.markimportant(id))
    } else if (this.state.border === "cardborderred"){
      this.setState({border: "cardborder"}, this.markimportant(id))
    }
  }
  
  markimportant = (id) => {
    const bordervalue = {
      newborder: this.state.border,
      cardid: id
    }
    this.props.setborder(bordervalue)
  }
  render() {
    return (
      <div>
        <div className="cardcontainer">
            {this.props.cardlist.map((card, index) =>
                <div key={index} className="borderred">
                      <ul className={this.props.fontcolor}>
                        <div className={this.props.cardsize}>
                          <div className="cardcon">
                            <div className={card.border}>
                              <div className={card.frontcolor}>{card.front}</div>
                              <div className={card.backcolor}>
                                  {card.back} 
                                  <Star className="markbutton" onClick={() => {this.setborder(card.id)}}></Star>
                                  <Delete className="deletebutton" onClick={() => {this.deletecard(card.id)}}></Delete>
                              </div>     
                            </div>   
                          </div> 
                        </div>     
                    </ul>
                </div>
            )}
            <p className="white">{this.props.nocards}</p>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        cardlist: state.user.cardlist,
        nocards: state.user.nocards,
        cardsize: state.user.size,
        fontcolor: state.user.fontcolor
    }
}

const mapDispatchToProps = dispatch => ({
  deletecard: id => dispatch(deletecard(id)),
  setborder: bordervalue => dispatch(setborder(bordervalue))
})


export default connect(mapStateToProps, mapDispatchToProps)(CardList);