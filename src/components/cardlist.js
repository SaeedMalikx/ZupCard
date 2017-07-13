import React from 'react';
import './cardlist.css'
import Delete from 'material-ui/svg-icons/action/delete';
import Star from 'material-ui/svg-icons/toggle/star';
import Edit from 'material-ui/svg-icons/image/edit'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import {connect} from 'react-redux';

import { deletecard, setborder, setedit } from '../actions/userActions';


class CardList extends React.Component {
    constructor(props) {
     super(props);
 
     this.state = {
       border: "cardborder",
       Front: "",
       Back: "",
       open: false,
       cardid: ""
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

  openedit = (id, front, back) => {
    this.setState({open: true, Front: front, Back: back, cardid: id})
  }

  setfront = (front) => {
      this.setState({Front: front.target.value})
  }

  setbackside = (back) => {
      this.setState({Back: back.target.value})
  }
  saveedit = () => {
      const newcard = {
        front: this.state.Front,
        back: this.state.Back,
        id: this.state.cardid
      }
      this.props.setedit(newcard)
  }

  closeedit = () => {
    this.setState({open: false, Front: "", Back: "", cardid: ""})
  }
  render() {
    return (
      <div>
        <div className="cardcontainer">
            {this.props.cardlist.map((card, index) =>
                <div key={index}>
                      <ul className={this.props.fontcolor}>
                        <div className={this.props.cardsize}>
                          <div className="cardcon">
                              <div className={card.border}>
                                <div className={card.frontcolor}>{card.front}</div>
                                <div className={card.backcolor}>
                                    {card.back} 
                                    <Star className="markbutton" onClick={() => {this.setborder(card.id)}}></Star>
                                    <Edit className="editbutton" onClick={() => {this.openedit(card.id, card.front, card.back)}}></Edit>
                                    <Delete className="deletebutton" onClick={() => {this.deletecard(card.id)}}></Delete>
                                </div>     
                              </div>   
                          </div> 
                        </div>     
                    </ul>
                </div>
            )}
            <p className="white">{this.props.nocards}</p>
            <Dialog
              title="Dialog With Actions"
              modal={false}
              open={this.state.open}
              onRequestClose={this.closeedit}
            >
              <input type="text" placeholder="Front" onChange={this.setfront} value={this.state.Front}></input>
              <input type="text" placeholder="Back" onChange={this.setbackside} value={this.state.Back}></input>
              <RaisedButton label="Save" onTouchTap={this.saveedit} />
            </Dialog>
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
  setborder: bordervalue => dispatch(setborder(bordervalue)),
  setedit: newcard => dispatch(setedit(newcard))
})


export default connect(mapStateToProps, mapDispatchToProps)(CardList);