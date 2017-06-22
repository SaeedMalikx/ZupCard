import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Menuicon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuopen: false
    };
  }
  componentWillMount = () => {
    console.log(this.props.user)
  }

  openmenu = () => {
    this.setState({menuopen: true})
  }
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <Menuicon onTouchTap={this.openmenu} />
          <Drawer open={this.state.menuopen} docked={false} onRequestChange={(menuopen) => this.setState({menuopen})}>
              <MenuItem >Categories</MenuItem>
          </Drawer>
          <span className="filler"/>
          <h3>Category</h3>
          <span className="filler"/>

        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        movies: state.movies
    };
}

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(App);
