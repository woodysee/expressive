//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import Navbar from '../Navbar/Navbar';
import CreateRoom from './CreateRoom/CreateRoom';

//Importing React Components
import { signOut } from '../../actions/userActions';
import { getUserRooms, joinRoom } from '../../actions/roomActions';



import './Dashboard.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

/**
 * Dash
 */
export class Dashboard extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.getUserRooms(this.props.user.uid)
  }

  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  joinRoom = (e) => {
    e.preventDefault();
    console.log("joining room");
    const roomId = document.getElementById('room-id');
    console.log(roomId);
    this.props.joinRoom(roomId);
  }

  roomDisplay = () => {
    const roomArray = [];
    Object.keys(this.props.ownedRooms).forEach((key) => {
      roomArray.push({
        key: key,
        name: this.props.ownedRooms[key].name
      })
    })

    const rooms = roomArray.map((e) => {
      return (
        <div className="col-md-4 col-xs-12 dashboard-roombox" key={e.key}>
          <div className="dashboard-roombox-name"> {e.name} </div>
          <div className="dashboard-roombox-user"> <b>Room ID:</b> {e.key} </div>
          <Link to={"/room/" + e.key} onClick={this.joinRoom}> Join Room! </Link>
        </div>
      )
    })

    return rooms;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="container-fluid" id="dashboard-rooms-group">

          <Navbar pageTitle="Dashboard"/>

          <div className="row" id="dashboard-title">
            <h2>Your Rooms</h2>
          </div>

          <div className="row" id="dashboard-create-btn-group">
            {/* Submit Button */}
            <Col className="dashboard-create-btn-Col">
              <a className="dashboard-create-btn-a"
                  data-toggle="modal"
                  data-target="#myModal">
                <span className="text">
                  Create a new room
                </span>
                <span className="line -right"></span>
                <span className="line -top"></span>
                <span className="line -left"></span>
                <span className="line -bottom"></span>
              </a>
            </Col>{/* /.dashboard-create-btn-Col (Submit Button) */}
          </div>{ /* /#dashboard-create-btn-group */ }

          <div className="row dashList">
            {this.roomDisplay()}
          </div>
        </div>{ /* /#dashboard-rooms-group */ }
        <CreateRoom/>
      </div>
    )
  }
  // render() {
  //
  //   return (
  //     <div className="container-fluid">
  //       <Navbar pageTitle="Dashboard"/>
  //       <div className="row">
  //         <div className="col-sm-6 col-sm-offset-3">
  //           <div className="dashboard" id="Dashboard">
  //             <CreateRoom />
  //             <div>{this.roomDisplay()}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps', state);
  return {
    user: state.user,
    ownedRooms: state.ownedRooms
  }
}

const mapDispatchToProps = (dispatch) => {
  //console.log('ownProps.user.uid', ownProps.user.uid);
  //getUserRooms(dispatch, ownProps.user.uid);
  return {
    signOut: () => {
      dispatch(signOut())
    },
    getUserRooms: (id) => {
      dispatch(getUserRooms(id))
    },
    joinRoom: (roomId) => {
      dispatch(joinRoom(roomId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
