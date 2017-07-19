import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';


import {addcategory, deletecategory, changecat } from '../actions/userActions';

import Caticon from 'material-ui/svg-icons/action/bookmark';
import CardsIcon from 'material-ui/svg-icons/image/grid-on';
import { red500,grey900, green500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class Category extends React.Component {
  constructor(props) {
     super(props);
 
     this.state = {
       currentcat: "",
       showcat: true,
       showcatdelete: false,
       selectedcat: null,
       catname: "",
       showSnackOne: false,
       showSnackTwo: false
     };
    }
 
  setcat = (cat) => {
      this.setState({currentcat: cat.target.value, showSnackTwo: false})
  }

  addcategory = () => {
      if (this.state.currentcat.length > 2){
        let cat = this.state.currentcat
        this.props.addcategory(cat)
        this.setState({currentcat: ""})
      } else {
          this.setState({showSnackTwo: true})
      }
  }

  deletecategory = () => {
    if (this.state.catname === "Default") {
        this.setState({showSnackOne: true})
    } else {
    const catdel = {
          catid: this.state.selectedcat,
          catname: this.state.catname
      }
    this.props.deletecategory(catdel)
    }
  }
  changeCatDefault = () => {
      this.setState({ showcat: false, catname: "Default"})
      let cat = "Default"
      this.props.changecat(cat)
  }
  changecat = (cat, catid) => {
    this.setState({selectedcat: catid, showcat: false, catname: cat})
    this.props.changecat(cat)
  }

  showcatdelete = () => {
      this.setState({showcatdelete: true})
  }
  closeshowcatdelete = () => {
      this.setState({showcatdelete: false, showSnackOne: false})
  }
  
  render() {
        return ( 
            <div className="logincenter">
                {this.state.showcat ? (
                    <div>   
                            <button className="buttonblue" onClick={this.changeCatDefault}>Default</button>
                            {this.props.cardcatlist.map((cat, index) =>
                                <button className="buttonblue" key={index} onClick={() => {this.changecat(cat.category, cat.catid)}}>{cat.category}</button>
                            )}
                        <input type="text" placeholder="New Category Name" onChange={this.setcat} maxlength="15" value={this.state.currentcat}></input>
                        <button className="button" onClick={this.addcategory}>Add Category</button>
                    </div>
                ):(
                    <div>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={green500} backgroundColor={grey900} icon={<Caticon />} />}>
                            {this.state.catname}
                        </ListItem>
                        <ListItem style={style.small} disabled={true} leftAvatar={<Avatar color={red500} backgroundColor={grey900} icon={<CardsIcon />} />}>
                            {this.props.cardcount} Cards
                        </ListItem>
                        <Link to="/cards"><button className="button">View Cards</button></Link>
                        <button onClick={this.showcatdelete}className="buttonback">Delete category?</button>
                    </div>
                )}
                <Dialog modal={false} open={this.state.showcatdelete} onRequestClose={this.closeshowcatdelete} 
                    actions={[<RaisedButton label="Delete" secondary={true} onClick={this.deletecategory} />,
                                <RaisedButton label="Cancel" primary={true} onClick={this.closeshowcatdelete} />]}
                    >
                   Delete the current Category: {this.state.catname}
                </Dialog>      

                <Snackbar
                    open={this.state.showSnackOne}
                    message="You Cannot Delete Default"
                    autoHideDuration={1000}
                />
                <Snackbar
                    open={this.state.showSnackTwo}
                    message="Must Contain Atleast 3 Letters"
                    autoHideDuration={1000}
                />
            </div>
            
        )
    }
}



const mapStateToProps = (state) => {
    return {
        cardcatlist: state.user.catlist,
        cardcount: state.user.cardcount
    };
}

const mapDispatchToProps = dispatch => ({
  addcategory: (cat) => dispatch(addcategory(cat)),
  deletecategory: (catdel) => dispatch(deletecategory(catdel)),
  changecat: (cat) => dispatch(changecat(cat))
});
const style = {
  small: {
    color: "white"
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);